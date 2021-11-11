'use strict';

import createQuotes from './createQuotes';

const fourchanx = document.querySelector('html[class~="fourchan-x"') === null ? false : true;

const store = {};

function spotKym(element) {
    let filenameDOMs = null;
    if (fourchanx) {
        filenameDOMs = element.querySelectorAll('div[class~="fileText"] > span[class~="file-info"] > a[target]');
    }
    else {
        filenameDOMs = element.querySelectorAll('div[class~="fileText"] > a[target]');
    }
    for (const filenameDOM of filenameDOMs) {
        if (/^\b\w{3}\./.test(filenameDOM.textContent)) {
            filenameDOM.style.backgroundColor = "#FDFF47";
        }
    }
}

function hideQr(element) {
    if (fourchanx) {
        element.querySelector('body[id="qr"]').style.visibility = "hidden";
    }
}

function isFileInput(e) {
    const result = (typeof e.type !== 'undefined'
        && e.nodeType === 1
        && e.tagName === 'INPUT'
        && /file(?:s)?/i.test(e.type)
    );
    if (result) {
      console.log('Found file input field', e);
    }
    return result;
}

function isCommentArea(e) {
    const result = (typeof e.type !== 'undefined'
        && e.nodeType === 1
        && e.tagName === 'TEXTAREA'
        && (e.getAttribute('name') === 'com' || e.getAttribute('data-name') === 'com')
    );
    if (result) {
      console.log('Found comment textarea', e);
    }
    return result;
}

function createFileList(a) {
    a = [].slice.call(Array.isArray(a) ? a : arguments)
    let b = a.length;
    let c = b;
    let d = true;
    while (b-- && d) d = a[b] instanceof File
    if (!d) throw new TypeError('expected argument to FileList is File or array of File objects')
    for (b = (new ClipboardEvent('')).clipboardData || new DataTransfer; c--;) b.items.add(a[c])
    return b.files
}

function getFilename() {
    const curtime = new Date().getTime();
    return curtime - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000);
}

function anonymizeFile() {
    const element = this;
    if (!store.anonymize || element.files.length === 0) {
        return;
    }
    let mimetype = element.files[0].type;
    let filename = getFilename() + '.' + element.files[0].name.split('.')[1];
    //change name and write element first immediately because fast responding sites
    //would not catch after hash change
    let file = new File([element.files[0]], filename, { type: mimetype });
    element.files = createFileList(file);
    console.log("Change filename to " + filename);
    //change hash of images
    if (mimetype == 'image/png' || mimetype == 'image/jpeg' || mimetype == 'image/webp') {
        if (mimetype === 'image/webp') mimetype = 'image/jpeg';
        const ext = (mimetype === 'image/png') ? 'png' : 'jpg';
        filename = filename.split('.')[0] + '.' + ext;

        const reader = new FileReader();
        reader.addEventListener("load", function () {
            const imgs = new Image();
            imgs.src = reader.result;
            imgs.onload = function () {
                const cvs = document.createElement('canvas');
                cvs.width = imgs.naturalWidth;
                cvs.height = imgs.naturalHeight;
                const canvas = cvs.getContext("2d");
                console.log("Change Imagehash");
                canvas.drawImage(imgs, 0, 0);
                canvas.fillStyle = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ",255)";
                canvas.fillRect(Math.floor(Math.random() * cvs.width), Math.floor(Math.random() * cvs.height), 1, 1);
                const newImageData = cvs.toBlob(function (blob) {
                    file = new File([blob], filename, { type: mimetype });
                    element.files = createFileList(file);
                }, mimetype, 0.9);
            }
        }, false)
        reader.readAsDataURL(element.files[0]);
    }
}

function commentChanged() {
    const element = this;
    if (store.bypassfilter) {
        let comment = element.value.replaceAll('soy', 'ꜱoy');
        comment = comment.replaceAll('SOY', 'SÖY');
        element.value = comment;
    }
}

function gotFileInput(e) {
    e.addEventListener('change', commentChanged);
}

function createButton(parentNode, label, title, listener) {
    const btn = document.createElement('span');
    btn.classList.add('mrBtn');
    btn.innerHTML = label;
    btn.id = title.toLowerCase().replaceAll(' ', '-') + '-btn';
    btn.title = title;
    parentNode.appendChild(btn);
    btn.addEventListener('click', listener);
}

function addQuotesText(e, action) {
    if (e.value && e.value.slice(-1) !== '\n') e.value += '\n';
    const str = createQuotes(action, store.format, store.bttm);
    e.value += str.replaceAll('<br>', '\n');
    e.scrollTop = e.scrollHeight;
    e.focus();
}

function gotTextArea(e) {
    e.classList.add('comtxt');
    e.addEventListener('change', commentChanged);
    // build UI after comment textarea
    const ui = document.createElement('span');
    const br = document.createElement('br');
    ui.appendChild(br);
    createButton(ui, '🗑', 'Clear Text', () => {
        e.value = ''
        e.focus();
    });
    createButton(ui, '📋', 'Paste from Clipboard', () => {
        navigator.clipboard.readText().then((txt) => {
            if (e.value && e.value.slice(-1) !== '\n') e.value += '\n';
            e.value += txt;
            e.scrollTop = e.scrollHeight;
            e.focus();
        });
    });
    createButton(ui, '⚔','Mass Reply', () => {
        addQuotesText(e, 'regular');
    });
    createButton(ui, '🚜', 'SNEED', () => {
        if (e.value && e.value.slice(-1) !== '\n') e.value += '\n';
        e.value += 'SNEED';
        e.scrollTop = e.scrollHeight;
        e.focus();
    });
    createButton(ui, '☝', 'Check em', () => {
        addQuotesText(e, 'dubs');
    });
    if (window.location.href.includes('pol')) {
        createButton(ui, '🏴', 'Quote Memeflags', () => {
            addQuotesText(e, 'memeflags');
        });
    }
    if (['/bant/', '/biz', '/pol/', '/qst/', '/soc/'].some((e) => window.location.href.includes(e))) {
        createButton(ui, '❶', 'Quote 1pbtIDs', () => {
            addQuotesText(e, '1pbtid');
        });
        createButton(ui, '🏆', 'Rankings', () => {
            addQuotesText(e, 'rankings');
        });
    }
    createButton(ui, '💩', 'KYM', () => {
        addQuotesText(e, 'kym');
    });
    createButton(ui, '😮', 'Soyquote', () => {
        e.value = e.value.replace(/>>(\w+)/g, (match, repl, offset, value) => {
            let str = (offset && value.charAt(offset - 1) !== '\n') ? '\n' : '';
            str += '>' + document.getElementById('m' + repl).innerText
                .replaceAll('\n', '\n>');
            if (offset + match.length + 1 < value.length) str += '\n';
            return str;
        });
        e.scrollTop = e.scrollHeight;
        e.focus();
    });
    e.parentNode.parentNode.insertBefore(ui, e.parentNode.nextSibling);
}

function mutationChange(mutations) {
    spotKym(document);
    mutations.forEach((mutation) => {
        const nodes = mutation.addedNodes;
        for (let n = 0; n < nodes.length; n++) {
            const node = nodes[n];
            if (isFileInput(node)) {
                //if element itself is input=file
                node.addEventListener('change', anonymizeFile);
            }
            else if (isCommentArea(node)) {
                //if element itself is comment textarea
                gotTextArea(node);
            }
            else if (node.nodeType === 1) {
                //search child nodes for input=file and comment texarea
                let nodesl = node.getElementsByTagName("input");
                for (let i = 0; i < nodesl.length; i++) {
                    if (isFileInput(nodesl[i])) {
                        nodesl[i].addEventListener('change', anonymizeFile);
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

const storeValues = ['anonymize', 'bypassfilter', 'format', 'bttm'];

browser.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') {
      return;
    }
    for (let i = 0; i < storeValues.length; i++) {
        const key = storeValues[i];
        if (changes.hasOwnProperty(key)) {
            store[key] = changes[key].newValue;
        }
    }
});

browser.storage.local.get(storeValues).then((item) => {
    for (let i = 0; i < storeValues.length; i++) {
        const key = storeValues[i];
        store[key] = item.hasOwnProperty(key) ? item[key] : false;
    }

    spotKym(document);

    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        if (isFileInput(inputs[i])) {
            inputs[i].addEventListener('change', anonymizeFile);
        }
    }
    inputs = document.getElementsByTagName('textarea');
    for (let i = 0; i < inputs.length; i++) {
        if (isCommentArea(inputs[i])) {
            gotTextArea(inputs[i]);
        }
    }

    let observer = new MutationObserver((mutations) => { mutationChange(mutations); });
    observer.observe(document, { childList: true, subtree: true });
}, (error) => { console.log(`Error: ${error}`); });
