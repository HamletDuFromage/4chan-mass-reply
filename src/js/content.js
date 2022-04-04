"use strict";

import {
	createQuotes
} from "./quotes";

import {
	initDB,
	saveFile,
	loadFile
} from "./store";

import {
	anonFilename,
	anonHash,
	fileConvert,
	fileCompress
} from "./file";

import {
	getBoard,
	getBoardInfo
} from "./board";

import {
	debugLog
} from "./misc";

const fourchanx = (document.querySelector("html[class~='fourchan-x'") !== null);

/*
 * default values, make sure its the same as in popup.js
 */
const store = {
	anonymizeFile:		false,
	bypassBanEvasion:	true,
	bypassFilter:		true,
	reuseFile:			false,
	postFormButtons:	true,
	quoteBottom:		false,
	quoteFormat:		"single",
};

function spotKym(element) {
	let filenameDOMs = null;
	if (fourchanx) {
		filenameDOMs = element.querySelectorAll("div[class~='fileText'] > span[class~='file-info'] > a[target]");
	} else {
		filenameDOMs = element.querySelectorAll("div[class~='fileText'] > a[target]");
	}
	for (const filenameDOM of filenameDOMs) {
		if (/^(?=(?:.*\d.*){1})[a-z0-9]{3}\.[a-zA-Z]+/.test(filenameDOM.textContent)) {
			filenameDOM.style.backgroundColor = "#FDFF47";
		}
	}
}

function hideQr(element) {
	if (fourchanx) {
		element.querySelector("body[id='qr']").style.visibility = "hidden";
	}
}

function isFileInput(e) {
	const result = (typeof e.type !== "undefined" &&
		e.nodeType === 1 &&
		e.tagName === "INPUT" &&
		/file(?:s)?/i.test(e.type)
	);
	if (result) {
		debugLog("Found file input: ", e);
	}
	return result;
}

function isCommentArea(e) {
	const result = (typeof e.type !== "undefined" &&
		e.nodeType === 1 &&
		e.tagName === "TEXTAREA" &&
		(e.getAttribute("name") === "com" || e.getAttribute("data-name") === "com")
	);
	if (result) {
		debugLog("Found comment textarea: ", e);
	}
	return result;
}

function createFileList(a) {
	a = [].slice.call(Array.isArray(a) ? a : arguments)
	let b = a.length;
	let c = b;
	let d = true;
	while (b-- && d) d = a[b] instanceof File
	if (!d) throw new TypeError("expected argument to FileList is File or array of File objects")
	for (b = (new ClipboardEvent("")).clipboardData || new DataTransfer; c--;) b.items.add(a[c])
	return b.files
}

function fileChanged(evt) {
	const element = evt.target;
	if (element.files.length === 0) {
		return;
	}
	const board = getBoard();
	if (!board) {
		return;
	}
	let file = element.files[0];
	fileConvert(file).then((convertedFile) => {
		element.files = createFileList(convertedFile);
		const maxImageSize = getBoardInfo(board).maxImageFilesize;
		fileCompress(convertedFile, maxImageSize).then((compressedFile) => {
			element.files = createFileList(compressedFile);
			if (store.reuseFile) {
				saveFile(compressedFile).catch(debugLog);
			}
			if (!store.anonymizeFile) {
				return;
			}
			// change name and write element first immediately because fast responding sites
			// would not catch after hash change
			compressedFile = anonFilename(compressedFile);
			element.files = createFileList(compressedFile);
			anonHash(compressedFile).then((anonFile) => {
				element.files = createFileList(anonFile);
			});
		});		
	});
}

function commentChanged(evt) {
    const element = evt.target;
    if (store.bypassFilter) {
        let comment = element.value.replaceAll('soy', 'ꜱoy');
        comment = comment.replaceAll('Soy', 'Ṣoy');
        comment = comment.replaceAll('SOY', 'ṢOY');
        element.value = comment;
    }
}

function gotFileInput(e) {
	e.addEventListener("change", fileChanged);
	if (store.reuseFile) {
		loadFile().then((file) => {
			debugLog(`Attaching the previous file \"${file.name}\"`);
			if (store.anonymizeFile) {
				anonHash(anonFilename(file)).then((anonFile) => {
					e.files = createFileList(anonFile);
				});
			} else {
				e.files = createFileList(file);
			}
		}).catch(debugLog);
	}
}

function createButton(parentNode, label, title, listener) {
	const btn = document.createElement("span");
	btn.classList.add("mrBtn");
	btn.textContent = label;
	btn.id = title.toLowerCase().replaceAll(" ", "-") + "-btn";
	btn.title = title;
	parentNode.appendChild(btn);
	btn.addEventListener("click", listener);
}

function addQuotesText(e, action) {
	if (e.value && e.value.slice(-1) !== "\n") e.value += "\n";
	const str = createQuotes(action, store.quoteFormat, store.quoteBottom);
	e.value += str;
	e.scrollTop = e.scrollHeight;
	e.focus();
}

function gotTextArea(e) {
	e.classList.add("comtxt");
	e.addEventListener("change", commentChanged);
	if (store.postFormButtons) {
		// build UI after comment textarea
		const ui = document.createElement("span");
		
		createButton(ui, "🗑️", "Clear Text", () => {
			e.value = ""
			e.focus();
		});
		
		createButton(ui, "📋", "Paste from Clipboard", () => {
			navigator.clipboard.readText().then((txt) => {
				if (e.value && e.value.slice(-1) !== "\n") e.value += "\n";
				e.value += txt;
				e.scrollTop = e.scrollHeight;
				e.focus();
			});
		});
		
		createButton(ui, "⚔️", "Mass Reply", () => {
			addQuotesText(e, "regular");
		});
		
		createButton(ui, "☝️", "Check \'em", () => {
			addQuotesText(e, "dubs");
		});
		
		if (window.location.href.includes("/thread/")) {
			createButton(ui, "🚜", "Sneed", () => {
				if (e.value && e.value.slice(-1) !== "\n") e.value += "\n";
				e.value += "sneed";
				e.scrollTop = e.scrollHeight;
				e.focus();
			});
			
			if (window.location.href.includes("/pol/")) {
				createButton(ui, "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Quote Memeflags", () => {
					addQuotesText(e, "memeflags");
				});
			}
			
			const board = getBoard();
			if (board && getBoardInfo(board).hasUserIDs) {
				createButton(ui, "1️⃣", "Quote 1pbtIDs", () => {
					addQuotesText(e, "1pbtid");
				});
				createButton(ui, "🏆", "Rankings", () => {
					addQuotesText(e, "rankings");
				});
			}
			
			createButton(ui, "💩", "KYM", () => {
				addQuotesText(e, "kym");
			});
			
			createButton(ui, "😮", "Soyquote", () => {
				e.value = e.value.replace(/>>(\w+)/g, (match, repl, offset, value) => {
					let str = (offset && value.charAt(offset - 1) !== "\n") ? "\n" : "";
					str += ">" + document.getElementById("m" + repl).innerText
						.replaceAll("\n", "\n>");
					if (offset + match.length + 1 < value.length) str += "\n";
					return str;
				});
				e.scrollTop = e.scrollHeight;
				e.focus();
			});
		}
		e.parentNode.parentNode.insertBefore(ui, e.parentNode.nextSibling);
	}
}

function mutationChange(mutations) {
	spotKym(document);
	mutations.forEach((mutation) => {
		const nodes = mutation.addedNodes;
		for (let n = 0; n < nodes.length; n++) {
			const node = nodes[n];
			if (isFileInput(node)) {
				// if element itself is input=file
				gotFileInput(node);
			} else if (isCommentArea(node)) {
				// if element itself is comment textarea
				gotTextArea(node);
			} else if (node.nodeType === 1) {
				// search child nodes for input=file and comment texarea
				let nodesl = node.getElementsByTagName("input");
				for (let i = 0; i < nodesl.length; i++) {
					if (isFileInput(nodesl[i])) {
						gotFileInput(nodesl[i]);
					}
				}
				nodesl = node.getElementsByTagName("textarea");
				for (let i = 0; i < nodesl.length; i++) {
					if (isCommentArea(nodesl[i])) {
						gotTextArea(nodesl[i]);
					}
				}
			}
		}
	});
};

browser.runtime.onMessage.addListener((message) => {
	const str = createQuotes(message.command, store.quoteFormat, store.quoteBottom);
	return Promise.resolve({ response: str });
});

browser.storage.onChanged.addListener((changes, area) => {
	if (area !== "local") {
		return;
	}

	const storeValues = Object.keys(store);
	for (let i = 0; i < storeValues.length; i++) {
		const key = storeValues[i];
		if (changes.hasOwnProperty(key)) {
			store[key] = changes[key].newValue;
		}
	}
});

browser.storage.local.get(store).then((item) => {
	const storeValues = Object.keys(store);
	for (let i = 0; i < storeValues.length; i++) {
		const key = storeValues[i];
		store[key] = item.hasOwnProperty(key) ? item[key] : false;
	}

	spotKym(document);

	initDB().catch(debugLog).then(() => {
		let inputs = document.getElementsByTagName("input");
		for (let i = 0; i < inputs.length; i++) {
			if (isFileInput(inputs[i])) {
				gotFileInput(inputs[i]);
			}
		}
		inputs = document.getElementsByTagName("textarea");
		for (let i = 0; i < inputs.length; i++) {
			if (isCommentArea(inputs[i])) {
				gotTextArea(inputs[i]);
			}
		}
	});

	let observer = new MutationObserver((mutations) => {
		mutationChange(mutations);
	});
	observer.observe(document, {
		childList: true,
		subtree: true
	});
}, (error) => {
	debugLog(`Error getting local storage: ${error}`);
});