"use strict";

let db = null;

export function initDB() {
	return new Promise((resolve) => {
		if (!window.indexedDB) {
			return reject("window.indexedDB is undefined");
		}
		
		const dbVersion = 1;
		const request = window.indexedDB.open("mrextension", dbVersion);

		request.onsuccess = (evt) => {
			db = evt.target.result;
			return resolve();
		}

		request.onupgradeneeded = (evt) => {
			evt.target.result.createObjectStore("file");
		}

		request.onerror = (evt) => {
			return reject("Error opening indexedDB");
		}
	});
}

export function saveFile(file) {
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(["file"], "readwrite");
		const request = transaction.objectStore("file").put(file, "data");
		request.onsuccess = (evt) => {
			return resolve();
		}
		request.onerror = (evt) => {
			return reject("Couldn\'t save file.");
		}
	});
}

export function loadFile() {
	return new Promise((resolve, reject) => {
		const transaction = db.transaction(["file"], "readonly");
		const request = transaction.objectStore("file").get("data");
		request.onsuccess = (evt) => {
			if (evt.target.result) {
				return resolve(evt.target.result);
			}
			return reject("No previous file stored.");
		};
		request.onerror = (evt) => {
			return reject("Couldn\'t load previous file.");
		}
	});
}