import {
  debugLog,
} from './misc';

export function getBoard() {
  const match = window.location.href.match(/(?<=boards\.4chan(?:nel)?\.org\/)[a-z0-9]+(?=\/)/);
  return match ? match[0] : null;
}

export function getBoardInfo() {
  let characterLimit = 2000;
  let maxFileSize = 4194304;
  let maxLines = 101;
  let hasUserIDs = false;
  const hasBoardFlags = (!!document.getElementsByClassName('flagSelector').length);

  function handleMessage(event) {
    const detail = event.detail;
    if (detail) {
      debugLog('Received board info: ', detail);
      if (detail.comlen) characterLimit = detail.comlen;
      if (detail.maxFilesize) maxFileSize = detail.maxFilesize;
      if (detail.maxLines) maxLines = (detail.maxLines + 1);
      if (detail.user_ids) hasUserIDs = detail.user_ids;
    }
  }

  window.addEventListener('mrBoardInfoEvent', handleMessage, {
    once: true,
  });

  const script = document.createElement('script');

  script.textContent = `
    window.dispatchEvent(new CustomEvent('mrBoardInfoEvent', {
      detail: {
        comlen: window.comlen,
        maxFilesize: window.maxFilesize,
        maxLines: window.maxLines,
        user_ids: window.user_ids,
      }
    }));
  `;

  document.head.appendChild(script);
  script.remove();

  const wordFilters = [
    /hi reddit/gi,
    /hello reddit/gi,
    /back to reddit/gi,
    /CUCK/g,
    /\btbh\b/g, // "tbH" and "Tbh" isn't wordfiltered
    /\bTBH\b/g,
    /\bsmh\b/g, // "smH" and "Smh" isn't wordfiltered
    /\bSMH\b/g,
    /\bfam\b/g, // "faM" isn't wordfiltered
    /\bFam\b/g,
    /\bFAM\b/g,
    /\bfams\b/g, // "famS" isn't wordfiltered
    /\bFams\b/g,
    /\bFAMS\b/g,
    /\bsoy/gi, // "soy" must be last
  ];

  const board = getBoard();

  switch (board) {
    case 'ck':
    case 'int':
      wordFilters.pop(); // pop "soy"
      break;
    case 'biz':
      wordFilters.push(/monkeypox/gi);
      break;
    case 'g':
      wordFilters.push(/irwin/gi, /norfolk/gi);
      break;
    case 'mlp':
      wordFilters.push(/barbien\x69gger/gi);
      break;
    case 'v':
      wordFilters.push(
        /pcuck/gi,
        /pcfat/gi,
        /sony\w+[^s]/gi, // sonypony, sonyponies, son\x79gger
        /nint\w+[^s]/gi, // nintendrone, nintenyearold, nintoddler
        /valvedrone/g, // "valvedronE" isn't wordfiltered
        /Valvedrone/g,
        /VALVEDRONE/g,
      );
      break;
  }

  return {
    characterLimit,
    maxFileSize,
    maxLines,
    hasUserIDs,
    hasBoardFlags,
    wordFilters,
  };
}
