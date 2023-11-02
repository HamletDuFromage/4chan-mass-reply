export function getBoard() {
  const match = window.location.href.match(/(?<=boards.4chan(?:nel)?.org\/)[a-z0-9]+(?=\/)/);
  return match ? match[0] : null;
}

export function getBoardInfo(board) {
  // blue boards
  let maxLines = 101;

  // red boards
  if (window.location.hostname === 'boards.4chan.org') {
    if (board === 'b' || board === 'bant') {
      maxLines = 51;
    } else {
      maxLines = 71;
    }
  }

  let characterLimit = 2000;
  let maxImageFilesize = 4194304;
  let hasUserIDs = false;
  let hasBoardFlags = false;

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

  switch (board) {
    case 'ck':
    case 'int':
      wordFilters.pop(); // pop "soy"
      break;
    case 'b':
      maxImageFilesize = 2097152;
      break;
    case 'bant':
      maxImageFilesize = 2097152;
      hasUserIDs = true;
      break;
    case 'biz':
      hasUserIDs = true;
      wordFilters.push(/monkeypox/gi);
      break;
    case 'g':
      wordFilters.push(/irwin/gi, /norfolk/gi);
      break;
    case 'gd':
      maxImageFilesize = 8388608;
      break;
    case 'hc':
      maxImageFilesize = 8388608;
      break;
    case 'hm':
      maxImageFilesize = 8388608;
      break;
    case 'hr':
      maxImageFilesize = 8388608;
      break;
    case 'jp':
      characterLimit = 5000;
      break;
    case 'lit':
      characterLimit = 3000;
      break;
    case 'mlp':
      wordFilters.push(/barbien\x69gger/gi);
      characterLimit = 3000;
      hasBoardFlags = true;
      break;
    case 'out':
      maxImageFilesize = 5242880;
      break;
    case 'p':
      maxImageFilesize = 5242880;
      break;
    case 'po':
      maxImageFilesize = 8388608;
      break;
    case 'pol':
      hasUserIDs = true;
      hasBoardFlags = true;
      break;
    case 'qst':
      characterLimit = 3000;
      maxImageFilesize = 8388608;
      hasUserIDs = true;
      break;
    case 'r':
      maxImageFilesize = 8388608;
      break;
    case 'r9k':
      maxImageFilesize = 2097152;
      break;
    case 's':
      maxImageFilesize = 8388608;
      break;
    case 's4s':
      maxImageFilesize = 2097152;
      break;
    case 'soc':
      maxImageFilesize = 5242880;
      hasUserIDs = true;
      break;
    case 'tg':
      maxImageFilesize = 8388608;
      break;
    case 'trv':
      maxImageFilesize = 8388608;
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
    case 'vt':
      characterLimit = 5000;
      break;
    case 'w':
      maxImageFilesize = 6291456;
      break;
    case 'wg':
      maxImageFilesize = 6291456;
      break;
    case 'wsg':
      maxImageFilesize = 6291456;
      break;
    case 'wsr':
      maxImageFilesize = 8388608;
      break;
  }
  return {
    maxLines,
    characterLimit,
    maxImageFilesize,
    hasUserIDs,
    hasBoardFlags,
    wordFilters,
  };
}
