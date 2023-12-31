import {
  debugLog,
} from './misc';

function modifyHeaders(item) {
  debugLog('Stripping 4chan_pass cookie and spoofing user-agent');
  item.requestHeaders.forEach((header) => {
    switch (header.name.toLowerCase()) {
      case 'cookie': {
        // eslint-disable-next-line no-param-reassign
        header.value = header.value.replace(/;*\s*4chan_pass=[\w-_]+(;*\s*)/, '$1');
        break;
      }
      case 'user-agent': {
        // TODO: this might not bypass the "Post successful!" rate limit (useless)
        header.value = header.value.replace(/\d+\.\d+/g, (match /* , offset, string */) => {
          const fl = parseFloat(match);
          return (fl > 50 && fl < 200) ? (fl + Math.random() * 20 - 10).toFixed(1) : match;
        });
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

const init = () => {
  browser.storage.local.get({
    bypassBanEvasion: false,
  }).then((item) => {
    toggleBanEvasionBypass(item.bypassBanEvasion);
  }, (error) => {
    debugLog(`Error getting local storage: ${error}`);
  });

  browser.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') {
      return;
    }
    if (Object.prototype.hasOwnProperty.call(changes, 'bypassBanEvasion')) {
      toggleBanEvasionBypass(changes.bypassBanEvasion.newValue);
    }
  });
};

init();
