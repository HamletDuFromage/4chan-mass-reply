import {
  debugLog,
} from './misc';

import {
  settings,
} from './settings';

browser.storage.local.get(settings).then((localStorage) => {
  const keys = Object.keys(localStorage);
  for (let i = 0; i < keys.length; ++i) {
    // init popup settings to local storage values
    const key = keys[i];

    const element = document.getElementById(key);
    if (!element) {
      debugLog(`"${key}" setting not found on the popup`);
      continue;
    }

    if (element.type === 'checkbox') {
      element.checked = localStorage[key];
    } else {
      element.value = localStorage[key];
    }

    // set local storage values on popup settings change
    element.onchange = (event) => {
      const value = (event.target.type === 'checkbox' ? event.target.checked : event.target.value);
      browser.storage.local.set({
        [event.target.id]: value,
      }).then(() => {
        debugLog(`Local storage: "${event.target.id}" set to "${value}"`);
      }, (error) => {
        debugLog(`Error setting local storage: ${error}`);
      });
    };
  }
});
