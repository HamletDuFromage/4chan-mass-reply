import {
  debugLog,
} from './misc';

const pastasUrl = 'https://raw.githubusercontent.com/HamletDuFromage/4chan-mass-reply/master/copypastas.json';

function modifyHeaders(item) {
  debugLog('Stripping 4chan_pass cookie and spoofing user-agent');
  item.requestHeaders.forEach((header) => {
    switch (header.name.toLowerCase()) {
      case 'cookie': {
        // eslint-disable-next-line no-param-reassign
        header.value = header.value.replace(/;*\s*4chan_pass=[\w-_]+(;*\s*)/, '$1');
        break;
      }
      // TODO: this doesn't bypass the "Post successful!" spam limit
      case 'user-agent': {
        let newValue = '';
        // randomly increase every integer in user-agent
        // don't decrease cause that could get you blocked
        for (let c = 0; c < header.value.length; c++) {
          const curChar = header.value.charAt(c);
          const curNum = parseInt(curChar, 10);
          if (Number.isNaN(curNum)) {
            newValue += curChar;
          } else {
            newValue += String(curNum + Math.floor(Math.random() * (10 - curNum)));
          }
        }
        // eslint-disable-next-line no-param-reassign
        header.value = newValue;
        break;
      }
    }
  });
  return {
    requestHeaders: item.requestHeaders,
  };
}

function toggleBanEvasionBypass(enabled) {
  if (enabled) {
    const filter = {
      urls: [
        '*://sys.4channel.org/*/post',
        '*://sys.4chan.org/*/post',
      ],
    };

    try {
      // extraHeaders isn't supported on firefox and throws an error
      const extraInfo = ['blocking', 'requestHeaders', 'extraHeaders'];
      browser.webRequest.onBeforeSendHeaders.addListener(modifyHeaders, filter, extraInfo);
    } catch (e) {
      const extraInfo = ['blocking', 'requestHeaders'];
      browser.webRequest.onBeforeSendHeaders.addListener(modifyHeaders, filter, extraInfo);
    }
  } else {
    browser.webRequest.onBeforeSendHeaders.removeListener(modifyHeaders);
  }
}

function fetchPastas(url) {
  fetch(url).then((resp) => {
    if (!resp.ok) {
      throw new Error(`HTTP code${resp.status}`);
    }
    resp.text().then((txt) => {
      browser.storage.local.set({
        pastas: txt,
      });
    });
  }).catch((error) => {
    debugLog(`Error fetching pastas: ${error}`);
  });
}

const init = () => {
  browser.storage.local.get({
    bypassBanEvasion: true,
    pastasUrl,
  }).then((item) => {
    toggleBanEvasionBypass(item.bypassBanEvasion);
    fetchPastas(item.pastasUrl.trim());
  }, (error) => {
    debugLog(`Error getting local storage: ${error}`);
  });

  browser.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') {
      return;
    }
    if (Object.prototype.hasOwnProperty.call(changes, 'bypassBanEvasion')) {
      toggleBanEvasionBypass(changes.bypassBanEvasion.newValue);
    } else if (Object.prototype.hasOwnProperty.call(changes, 'pastasUrl')) {
      fetchPastas(changes.pastasUrl.newValue);
    }
  });
};

init();
