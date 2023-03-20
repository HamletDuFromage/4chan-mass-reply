import {
  createQuotes,
} from './quotes';

import {
  initDB,
  saveFile,
  loadFile,
} from './store';

import {
  anonFilename,
  anonHash,
  fileConvert,
  fileCompress,
} from './file';

import {
  getBoard,
  getBoardInfo,
} from './board';

import {
  debugLog,
} from './misc';

import {
  slideCaptcha,
} from './captcha';

const is4chanX = (document.querySelector("html[class~='fourchan-x'") !== null);
const isMobile = (document.getElementById('boardNavMobile') !== null && window.getComputedStyle(document.getElementById('boardNavMobile'), null).display !== 'none');

/*
 * default values, make sure its the same as in popup.js
 */
const store = {
  anonymizeFile: false,
  bypassBanEvasion: false,
  bypassFilter: true,
  slideCaptcha: true,
  reuseFile: false,
  postFormButtons: true,
  quoteBottom: false,
  quoteFormat: 'single',
};

const kymRegex = /^(?=(?:.*\d.*){1})[a-z0-9]{3}\.[a-zA-Z]+$/;

function spotKym(element) {
  let filenameDOMs = null;
  if (is4chanX) {
    filenameDOMs = element.querySelectorAll("div[class~='fileText'] > span[class~='file-info'] > a[target]");
  } else {
    filenameDOMs = element.querySelectorAll("div[class~='fileText'] > a[target]");
  }
  for (let i = 0; i < filenameDOMs.length; ++i) {
    if (kymRegex.test(filenameDOMs[i].textContent)) {
      if (isMobile) {
        const fileDiv = filenameDOMs[i].parentElement.parentElement;
        if (fileDiv) {
          const fileInfo = fileDiv.getElementsByClassName('mFileInfo');
          if (fileInfo && fileInfo[0]) {
            fileInfo[0].style.backgroundColor = '#FDFF47';
          }
        }
      } else {
        filenameDOMs[i].style.backgroundColor = '#FDFF47';
      }
    }
  }
}

function isFileInput(e) {
  const result = (
    typeof e.type !== 'undefined'
        && e.nodeType === 1
        && e.tagName === 'INPUT'
        && /file(?:s)?/i.test(e.type)
  );
  if (result) {
    debugLog('Found file input: ', e);
  }
  return result;
}

function isCommentArea(e) {
  const result = (typeof e.type !== 'undefined'
        && e.nodeType === 1
        && e.tagName === 'TEXTAREA'
        && (e.getAttribute('name') === 'com' || e.getAttribute('data-name') === 'com')
  );
  if (result) {
    debugLog('Found comment textarea: ', e);
  }
  return result;
}

function createFileList(a) {
  // eslint-disable-next-line prefer-rest-params
  a = [].slice.call(Array.isArray(a) ? a : arguments);
  let b = a.length;
  let c = b;
  let d = true;
  while (b-- && d) d = a[b] instanceof File;
  if (!d) throw new TypeError('expected argument to FileList is File or array of File objects');
  for (b = (new ClipboardEvent('')).clipboardData || new DataTransfer(); c--;) b.items.add(a[c]);
  return b.files;
}

function fileChanged(evt) {
  const element = evt.target;
  if (element.files.length === 0) {
    return;
  }
  const board = getBoard();
  if (!board) {
    return;
  }
  const file = element.files[0];
  fileConvert(file).then((convertedFile) => {
    element.files = createFileList(convertedFile);
    const maxImageSize = getBoardInfo(board).maxImageFilesize;
    fileCompress(convertedFile, maxImageSize).then((compressedFile) => {
      element.files = createFileList(compressedFile);
      if (store.reuseFile) {
        saveFile(compressedFile).catch(debugLog);
      }
      if (!store.anonymizeFile) {
        return;
      }
      // change name and write element first immediately because fast responding sites
      // would not catch after hash change
      compressedFile = anonFilename(compressedFile);
      element.files = createFileList(compressedFile);
      anonHash(compressedFile).then((anonFile) => {
        element.files = createFileList(anonFile);
      });
    });
  });
}

function bypassWordFilters(text) {
  const board = getBoard();
  const wordFilters = getBoardInfo(board).wordFilters;

  let newText = text;

  for (let i = 0; i < wordFilters.length; ++i) {
    const pattern = wordFilters[i];
    newText = newText.replace(pattern, (match /* , offset, string */) => {
      // check if we have a homoglyph
      // r9k doesn't allow non ascii
      if (board !== 'r9k') {
        const replacements = {
          C: 'Ϲ',
          F: 'Ϝ',
          H: 'Η',
          K: 'Κ',
          M: 'M',
          N: 'Ν',
          O: 'ⵔ',
          S: 'Տ',
          Y: 'Ү',
          a: 'ä',
          c: 'ϲ',
          h: 'հ',
          k: 'ƙ',
          n: 'ᥒ',
          o: '𐐬',
          p: 'ρ',
          s: '𐑈',
        };

        for (let j = match.length - 1; j >= 0; --j) {
          const letter = match[j];
          if (replacements[letter] !== undefined) {
            return match.slice(0, j) + replacements[letter] + match.slice(j + 1);
          }
        }
      }

      // check if the filter is a phrase and can be bypassed by
      // inserting addition space before last word
      if (match.split(' ').length > 1) {
        const lastSpaceIndex = match.lastIndexOf(' ');
        const addedWhitespace = `${match.slice(0, lastSpaceIndex)} ${match.slice(lastSpaceIndex)}`;
        pattern.lastIndex = 0;
        if (!pattern.test(addedWhitespace)) {
          return addedWhitespace;
        }
      }

      // check if the filter can be bypassed by changing the case of the last letter
      if (!pattern.ignoreCase) {
        let lastLetter = match.slice(-1);

        if (lastLetter >= 'a' && lastLetter <= 'z') lastLetter = lastLetter.toUpperCase();
        else if (lastLetter >= 'A' && lastLetter <= 'Z') lastLetter = lastLetter.toLowerCase();

        const caseChanged = match.slice(0, -1) + lastLetter;

        pattern.lastIndex = 0;
        if (!pattern.test(caseChanged)) {
          return caseChanged;
        }
      }

      // check if the filter can be bypassed by an underscore prefix
      const prefixed = `_${match}`;
      pattern.lastIndex = 0;
      if (!pattern.test(prefixed)) {
        return prefixed;
      }

      return match;
    });
  }
  return newText;
}

function commentChanged(evt) {
  const element = evt.target;
  if (store.bypassFilter) {
    element.value = bypassWordFilters(element.value);
  }
}

function gotFileInput(e) {
  e.addEventListener('change', fileChanged);
  if (store.reuseFile) {
    loadFile().then((file) => {
      debugLog(`Attaching the previous file "${file.name}"`);
      if (store.anonymizeFile) {
        anonHash(anonFilename(file)).then((anonFile) => {
          e.files = createFileList(anonFile);
        });
      } else {
        e.files = createFileList(file);
      }
    }).catch(debugLog);
  }
}

function createButton(parentNode, label, title, listener) {
  const btn = document.createElement('span');
  btn.classList.add('mrBtn');
  btn.textContent = label;
  btn.id = `${title.toLowerCase().replaceAll(' ', '-')}-btn`;
  btn.title = title;
  parentNode.appendChild(btn);
  btn.addEventListener('click', listener);
}

function addQuotesText(e, action) {
  if (e.value && e.value.slice(-1) !== '\n') e.value += '\n';
  const str = createQuotes(action, store.quoteFormat, store.quoteBottom);
  e.value += str;
  e.scrollTop = e.scrollHeight;
  e.focus();
}

function gotTextArea(e) {
  e.classList.add('comtxt');
  e.addEventListener('change', commentChanged);
  if (store.postFormButtons) {
    // build UI after comment textarea
    const ui = document.createElement('span');

    createButton(ui, '🗑️', 'Clear Text', () => {
      e.value = '';
      e.focus();
    });

    createButton(ui, '📋', 'Paste from Clipboard', () => {
      navigator.clipboard.readText().then((txt) => {
        if (e.value && e.value.slice(-1) !== '\n') e.value += '\n';
        e.value += txt;
        e.scrollTop = e.scrollHeight;
        e.focus();
      });
    });

    createButton(ui, '🚜', 'Sneed', () => {
      if (e.value && e.value.slice(-1) !== '\n') e.value += '\n';
      e.value += 'sneed';
      e.scrollTop = e.scrollHeight;
      e.focus();
    });

    createButton(ui, '😮', 'Soyquote', () => {
      e.value = e.value.replace(/>>(\d+)\s*/g, (match, repl, offset, value) => {
        let str = (offset && value.charAt(offset - 1) !== '\n') ? '\n' : '';
        str += `>${document.getElementById(`m${repl}`).innerText
          .replaceAll('\n', '\n>')}`;
        if (offset + match.length + 1 < value.length) str += '\n';
        return str;
      });
      e.scrollTop = e.scrollHeight;
      e.focus();
    });

    createButton(ui, '🖼️', 'Soyquote Filename', () => {
      e.value = e.value.replace(/>>(\d+)\s*/g, (match, repl) => {
        const fileText = document.getElementById(`fT${repl}`);
        if (!fileText) return '';

        if (is4chanX) {
          const fileTextA = fileText.children[0].children[0];
          const fnfull = fileTextA.getElementsByClassName('fnfull')[0];
          return `>${(fnfull || fileTextA).textContent}\n`;
        }
        const fileName = fileText.children[0];
        return `>${fileName.title ? fileName.title : fileName.textContent}\n`;
      });
      e.scrollTop = e.scrollHeight;
      e.focus();
    });

    createButton(ui, '⚔️', 'Mass Reply', () => {
      addQuotesText(e, 'regular');
    });

    createButton(ui, '☝️', "Check 'em", () => {
      addQuotesText(e, 'dubs');
    });

    if (window.location.href.includes('/thread/')) {
      const board = getBoard();
      const boardInfo = getBoardInfo(board);

      if (boardInfo.hasUserIDs) {
        // this emoji doesn't work on win 7
        createButton(ui, '1️⃣', 'Quote 1pbtIDs', () => {
          addQuotesText(e, '1pbtid');
        });
        createButton(ui, '🏆', 'Rankings', () => {
          addQuotesText(e, 'rankings');
        });
      }

      if (boardInfo.hasBoardFlags) {
        createButton(ui, '🏁', 'Quote Memeflags', () => {
          addQuotesText(e, 'memeflags');
        });
      }
      createButton(ui, '💩', 'KYM', () => {
        addQuotesText(e, 'kym');
      });
    }
    e.parentNode.parentNode.insertBefore(ui, e.parentNode.nextSibling);
  }
}

function mutationChange(mutations) {
  mutations.forEach((mutation) => {
    if (mutation.target
        && mutation.target.className.indexOf('postInfo') !== -1
        && mutation.target.parentElement) {
      spotKym(mutation.target.parentElement);
      return;
    }

    /*
     * Detect Captcha loaded
     * (its ok to check via ElementById comparsion , because only one Captcha
     *  can be loaded on the site at once)
     */
    if (store.slideCaptcha) {
      if (mutation.target
        && mutation.target.id === 't-load'
        && mutation.removedNodes
        && mutation.removedNodes[0].data === 'Loading'
      ) {
        const tfg = document.getElementById('t-fg');
        const tbg = document.getElementById('t-bg');
        const tslider = document.getElementById('t-slider');
        const tresp = document.getElementById('t-resp');
        slideCaptcha(tfg, tbg, tslider, tresp);
        return;
      }
    }
    /*
     * Detect and hook into other stuff we need, like reply box or floating
     * QuickReplyBox. There can be multiple of those open together,
     * so we get each when it appears and don't go for IDs
     */
    const nodes = mutation.addedNodes;
    for (let n = 0; n < nodes.length; n++) {
      const node = nodes[n];
      if (isFileInput(node)) {
        // if element itself is input=file
        gotFileInput(node);
      } else if (isCommentArea(node)) {
        // if element itself is comment textarea
        gotTextArea(node);
      } else if (node.nodeType === 1) {
        // search child nodes for input=file and comment texarea
        let nodesl = node.getElementsByTagName('input');
        for (let i = 0; i < nodesl.length; i++) {
          if (isFileInput(nodesl[i])) {
            gotFileInput(nodesl[i]);
          }
        }
        nodesl = node.getElementsByTagName('textarea');
        for (let i = 0; i < nodesl.length; i++) {
          if (isCommentArea(nodesl[i])) {
            gotTextArea(nodesl[i]);
          }
        }
      }
    }
  });
}

browser.runtime.onMessage.addListener((message) => {
  const str = createQuotes(message.command, store.quoteFormat, store.quoteBottom);
  return Promise.resolve({ response: str });
});

browser.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') {
    return;
  }

  const storeValues = Object.keys(store);
  for (let i = 0; i < storeValues.length; i++) {
    const key = storeValues[i];
    if (Object.prototype.hasOwnProperty.call(changes, key)) {
      store[key] = changes[key].newValue;
    }
  }
});

browser.storage.local.get(store).then((item) => {
  const storeValues = Object.keys(store);
  for (let i = 0; i < storeValues.length; i++) {
    const key = storeValues[i];
    store[key] = Object.prototype.hasOwnProperty.call(item, key) ? item[key] : false;
  }

  spotKym(document);

  initDB().catch(debugLog).then(() => {
    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      if (isFileInput(inputs[i])) {
        gotFileInput(inputs[i]);
      }
    }
    inputs = document.getElementsByTagName('textarea');
    for (let i = 0; i < inputs.length; i++) {
      if (isCommentArea(inputs[i])) {
        gotTextArea(inputs[i]);
      }
    }
  });

  const observer = new MutationObserver((mutations) => {
    mutationChange(mutations);
  });
  observer.observe(document, {
    childList: true,
    subtree: true,
  });
}, (error) => {
  debugLog(`Error getting local storage: ${error}`);
});
