import {
  debugLog,
} from './misc';

// listen to checkbox events
const init = () => {
  /*
   * default values, make sure its the same as in content.js
  */
  browser.storage.local.get({
    fakeFilename: 'off',
    watermark: 'off',
    anonymizeFileHash: false,
    bypassBanEvasion: false,
    bypassWordfilter: true,
    slideCaptcha: true,
    optionsCheckboxes: false,
    rememberFile: false,
    quoteBottom: false,
    quoteFormat: 'single',
  }).then((localstore) => {
    const keys = Object.keys(localstore);
    for (let i = 0; i < keys.length; ++i) {
      const id = keys[i];
      const elem = document.getElementById(id);

      if (elem.type === 'checkbox') {
        elem.checked = localstore[id];
      } else {
        elem.value = localstore[id];
      }

      elem.onchange = (evt) => {
        const value = (evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value);
        browser.storage.local.set({
          [evt.target.id]: value,
        }).then(
          debugLog(`Local storage: "${evt.target.id}" set to "${value}"`),
          (error) => {
            debugLog(`Error setting local storage: ${error}`);
          },
        );
      };
    }
  });
};

init();
