import {
  debugLog,
} from './misc';

let database = null;

function initDB() {
  return new Promise((resolve, reject) => {
    if (database) resolve();

    if (!window.indexedDB) {
      const errMsg = 'Error opening indexedDB: window.indexedDB is undefined';
      debugLog(errMsg);
      reject(new Error(errMsg));
      return;
    }

    const dbVersion = 1;
    const request = window.indexedDB.open('mrextension', dbVersion);

    request.onsuccess = () => {
      database = request.result;
      resolve();
    };

    request.onupgradeneeded = () => {
      request.result.createObjectStore('file');
    };

    request.onerror = () => {
      const errMsg = `Error opening indexedDB: ${request.error}`;
      debugLog(errMsg);
      reject(new Error(errMsg));
    };
  });
}

export function saveFile(file, quality) {
  return new Promise((resolve, reject) => {
    initDB().then(() => {
      const transaction = database.transaction(['file'], 'readwrite');
      const objectStore = transaction.objectStore('file');
      const request = objectStore.put({ file, quality }, 'file');

      request.onsuccess = () => {
        debugLog(`Remembered file "${file.name}" with quality "${quality ? quality.toFixed(2) : undefined}"`);
        resolve();
      };

      request.onerror = () => {
        const errMsg = `Error remembering file: ${request.error}`;
        debugLog(errMsg);
        reject(new Error(errMsg));
      };
    });
  });
}

export function loadFile() {
  return new Promise((resolve, reject) => {
    initDB().then(() => {
      const transaction = database.transaction(['file'], 'readonly');
      const objectStore = transaction.objectStore('file');
      const request = objectStore.get('file');

      request.onsuccess = () => {
        if (!request.result) {
          const errMsg = 'No file remembered';
          debugLog(errMsg);
          reject(new Error(errMsg));
          return;
        }

        const { file, quality } = request.result;
        debugLog(`Loaded remembered file "${file.name}" with quality "${quality ? quality.toFixed(2) : undefined}"`);
        resolve({ file, quality });
      };

      request.onerror = () => {
        const errMsg = `Error loading remembered file: ${request.error}`;
        debugLog(errMsg);
        reject(new Error(errMsg));
      };
    });
  });
}
