import {
  debugLog,
} from './misc';

let db = null;

export function initDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('window.indexedDB is undefined'));
      return;
    }

    const dbVersion = 1;
    const request = window.indexedDB.open('mrextension', dbVersion);

    request.onsuccess = (evt) => {
      db = evt.target.result;
      resolve();
    };

    request.onupgradeneeded = (evt) => {
      evt.target.result.createObjectStore('file');
    };

    request.onerror = () => reject(new Error('Error opening indexedDB'));
  });
}

export function saveFile(file) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['file'], 'readwrite');
    const request = transaction.objectStore('file').put(file, 'data');
    request.onsuccess = () => {
      debugLog(`Remembering file "${file.name}"`);
      resolve();
    };
    request.onerror = () => reject(new Error("Couldn't remember file."));
  });
}

export function loadFile() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['file'], 'readonly');
    const request = transaction.objectStore('file').get('data');
    request.onsuccess = (evt) => {
      if (evt.target.result) {
        const file = evt.target.result;
        debugLog(`Loading remembered file "${file.name}"`);
        resolve(file);
        return;
      }
      reject(new Error('No file remembered.'));
    };
    request.onerror = () => reject(new Error("Couldn't load remembered file."));
  });
}
