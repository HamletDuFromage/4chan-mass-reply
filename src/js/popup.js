import {
  debugLog,
} from './misc';

// listen to checkbox events
const init = () => {
  /*
   * default values, make sure its the same as in content.js
  */
  browser.storage.local.get({
    anonymizeFileName: false,
    anonymizeFileHash: false,
    redditifyImage: false,
    bypassBanEvasion: false,
    bypassFilter: true,
    slideCaptcha: true,
    reuseFile: false,
    quoteBottom: false,
    quoteFormat: 'single',
  }).then((localstore) => {
    const keys = Object.keys(localstore);
    for (let i = 0; i < keys.length; i++) {
      const button = keys[i];
      document.getElementById(button).onclick = (evt) => {
        browser.storage.local.set({
          [evt.target.name]: evt.target.checked,
        }).then(
          debugLog('Storage updated'),
          (error) => {
            debugLog(`Error setting local storage: ${error}`);
          },
        );
      };
      document.getElementById(button).checked = localstore[button];
    }
  });
};

init();

// load and store mass-reply format
document.getElementById('quoteFormat').addEventListener('change', (evt) => {
  const value = evt.target.value;
  browser.storage.local.set({
    quoteFormat: value,
  }).then(
    debugLog('Storage updated'),
    (error) => {
      debugLog(`Error setting local storage: ${error}`);
    },
  );
});

browser.storage.local.get({
  quoteFormat: 'single',
}).then((item) => {
  document.getElementById('quoteFormat').value = item.quoteFormat;
});
