"use strict";

import {
	debugLog
} from "./misc";

const pastasUrl = "https://raw.githubusercontent.com/HamletDuFromage/4chan-mass-reply/master/copypastas.json";

browser.contextMenus.create({
	id: "rm-cookies",
	title: "Delete 4chan cookies",
	documentUrlPatterns: ["*://*.4chan.org/*", "*://*.4channel.org/*"]
});

function randomString(length) {
	let result = "";
	let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function modifyHeaders(item) {
	debugLog("Stripping 4chan_pass cookie and spoofing user-agent");
	for (let header of item.requestHeaders) {
		switch (header.name.toLowerCase()) {
			case "cookie": {
				header.value = header.value.replace(/;*\s*4chan_pass=[\w-_]+(;*\s*)/, "$1");
				break;
			}
			case "user-agent": {
				let newValue = "";
				// randomly increase every integer in user-agent
				// don't decrease cause that could get you blocked
				for (let c = 0; c < header.value.length; c++) {
					const curChar = header.value.charAt(c);
					const curNum = parseInt(curChar);
					if (Number.isNaN(curNum)) {
						newValue += curChar;
					} else {
						newValue += String(curNum + Math.floor(Math.random() * (10 - curNum)));
					}
				}
				header.value = newValue;
				break;
			}
		}
	}
	return {
		requestHeaders: item.requestHeaders
	};
}

function toggleBanEvasionBypass(enabled) {
	if (enabled) {
		const filter = {
			urls: [
				"*://sys.4channel.org/*/post",
				"*://sys.4chan.org/*/post"
			]
		};

		try {
			// extraHeaders isn't supported on firefox and throws an error
			const extraInfo = ["blocking", "requestHeaders", "extraHeaders"];
			browser.webRequest.onBeforeSendHeaders.addListener(modifyHeaders, filter, extraInfo);
		} catch (e) {
			const extraInfo = ["blocking", "requestHeaders"];
			browser.webRequest.onBeforeSendHeaders.addListener(modifyHeaders, filter, extraInfo);
		}
	} else {
		browser.webRequest.onBeforeSendHeaders.removeListener(modifyHeaders);
	}
}

function fetchPastas(url) {
	fetch(url).then((resp) => {
		if (!resp.ok) {
			throw new Error("HTTP code" + resp.status);
		}
		resp.text().then((txt) => {
			browser.storage.local.set({
				pastas: txt
			});
		});
	}).catch((error) => {
		debugLog(`Error fetching pastas: ${error}`);
	});
}

(function() {
	browser.storage.local.get({
		bypassBanEvasion: true,
		pastasUrl: pastasUrl,
	}).then((item) => {
		toggleBanEvasionBypass(item.bypassBanEvasion);
		fetchPastas(item.pastasUrl.trim());
	}, (error) => {
		debugLog(`Error getting local storage: ${error}`);
	});

	browser.storage.onChanged.addListener((changes, area) => {
		if (changes.hasOwnProperty("bypassBanEvasion")) {
			toggleBanEvasionBypass(changes.bypassBanEvasion.newValue);
		}
		if (changes.hasOwnProperty("pastasUrl")) {
			fetchPastas(changes.pastasUrl.newValue);
		}
	});

	browser.contextMenus.onClicked.addListener((info) => {
		if (info.menuItemId == "rm-cookies") {
			debugLog("Deleting 4chan cookies");
			for (const url of ["https://4channel.org", "https://4chan.org"]) {
				browser.cookies.getAll({
					url: url
				}).then(function(cookies) {
					return Promise.all(cookies.map(function(cookie) {
						return browser.cookies.remove({
							url: url,
							name: cookie.name
						});
					}));
				});
			}
		}
	});
})();