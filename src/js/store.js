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
    request.onsuccess = () => resolve();
    request.onerror = () => reject(new Error("Couldn't save file."));
  });
}

export function loadFile() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['file'], 'readonly');
    const request = transaction.objectStore('file').get('data');
    request.onsuccess = (evt) => {
      if (evt.target.result) {
        resolve(evt.target.result);
        return;
      }
      reject(new Error('No previous file stored.'));
    };
    request.onerror = () => reject(new Error("Couldn't load previous file."));
  });
}
