import {
  debugLog,
} from './misc';

const pastasUrl = 'https://raw.githubusercontent.com/HamletDuFromage/4chan-mass-reply/master/copypastas.json';

let pastas = [];

// listen to copy button
document.getElementById('copy').addEventListener('click', () => {
  browser.tabs.query({
    active: true,
    currentWindow: true,
  })
    .then(() => {
      const newClip = document.getElementById('pastaTextarea').value;
      if (newClip !== '') {
        debugLog('Copying to clipboard');
        navigator.clipboard.writeText(newClip);
      }
    });
});

// listen to checkbox events
const init = () => {
  /*
   * default values, make sure its the same as in content.js
  */
  browser.storage.local.get({
    anonymizeFile: false,
    bypassBanEvasion: true,
    bypassFilter: true,
    slideCaptcha: true,
    reuseFile: false,
    postFormButtons: true,
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

// load selected pasta into textarea
document.getElementById('pastasDropdown').addEventListener('change', (evt) => {
  const value = evt.target.value;
  for (let i = 0; i < pastas.length; i++) {
    const name = pastas[i].name;
    if (name === value) {
      document.getElementById('pastaTextarea').value = pastas[i].content;
      return;
    }
  }
});

// populate pastas into select
function parsePastas(pastasJson) {
  pastas = [];
  pastas = JSON.parse(pastasJson);
  if (!pastas.length) return;
  const select = document.getElementById('pastasDropdown');
  const selected = select.value;
  while (select.firstChild) {
    select.removeChild(select.firstChild);
  }
  for (let i = 0; i < pastas.length; i++) {
    const opt = document.createElement('option');
    const name = pastas[i].name;
    opt.textContent = name;
    opt.value = name;
    select.appendChild(opt);
    if (name === selected) {
      select.value = name;
    }
  }
}

browser.storage.local.get({
  pastasUrl,
  pastas: null,
  selectedPasta: 'Contribute',
}).then((item) => {
  if (item.pastas) {
    parsePastas(item.pastas);
  }
  document.getElementById('pastasUrl').value = item.pastasUrl;
}, (error) => {
  debugLog(`Error getting local storage: ${error}`);
});

browser.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') {
    return;
  }
  if (changes.pastas) {
    parsePastas(changes.pastas.newValue);
  }
});

function sendMessage(messageType) {
  browser.tabs.query({
    currentWindow: true,
    active: true,
  }).then((tabs) => {
    browser.tabs.sendMessage(tabs[0].id, {
      command: messageType,
    }).then((response) => {
      document.getElementById('pastaTextarea').value = response.response;
    });
  });
}

// buttons to get mass quotes
['regular', 'dubs'].forEach((messageType) => {
  document.getElementById(messageType).onclick = () => {
    sendMessage(messageType);
  };
});

document.getElementById('cookies').onclick = () => {
  debugLog('Deleting 4chan cookies');
  ['https://4channel.org', 'https://4chan.org'].forEach((url) => {
    browser.cookies.getAll({
      url,
    }).then((cookies) => Promise.all(cookies.map((cookie) => browser.cookies.remove({
      url,
      name: cookie.name,
    }))));
  });
};

// button to show pastasUrl input
document.getElementById('showPastasUrl').onclick = (evt) => {
  const el = document.getElementById('formPastasUrlContainer');
  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden');
    evt.target.classList.add('selected');
  } else {
    el.classList.add('hidden');
    evt.target.classList.remove('selected');
  }
};

// ok button to save entered pastasUrl
document.getElementById('setPastasUrl').onclick = () => {
  let url = document.getElementById('pastasUrl').value;
  if (!url.trim()) {
    url = pastasUrl;
    document.getElementById('pastasUrl').value = pastasUrl;
  }
  browser.storage.local.set({
    pastasUrl: url,
  });
};
