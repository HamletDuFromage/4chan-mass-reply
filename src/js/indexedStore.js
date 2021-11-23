'use strict';

var db = null;

export function initDB() {
    return new Promise((resolve) => {
        if (!window.indexedDB) {
            return resolve(false);
        }
        const dbVersion = 1;
        const request = window.indexedDB.open('mrextension', dbVersion);

        request.onsuccess = function (evt) {
            console.log('Opened indexedDB');
            db = evt.target.result;
            return resolve(true);
        }

        request.onupgradeneeded = function (evt) {
            console.log('create object store');
            const os = evt.target.result.createObjectStore('file');
        }

        request.onerror = function (evt) {
            console.log("Error creating/accessing IndexedDB database");
            return resolve(false);
        }
    });
}

export function saveFile(file) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['file'], "readwrite");
        const request = transaction.objectStore('file').put(file, 'data');
        request.onsuccess = (evt) => {
            return resolve();
        }
        request.onerror = (evt) => {
            return reject('Could not save file.');
        }
    });
}

export function loadFile() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['file'], "readonly");
        const request = transaction.objectStore('file').get('data');
        request.onsuccess = (evt) => {
            if (evt.target.result) {
              return resolve(evt.target.result);
            }
            return reject('No previously used file stored.');
        };
        request.onerror = (evt) => {
            return reject('Could not load previously used file.');
        }
    });
}
