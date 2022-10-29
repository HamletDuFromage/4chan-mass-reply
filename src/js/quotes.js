import {
  getBoard,
  getBoardInfo,
} from './board';

import {
  getNumberWithOrdinal,
} from './misc';

const kymRegex = /^(?=(?:.*\d.*){1})[a-z0-9]{3}\.[a-zA-Z]+$/;

function createQuotesString(strArray, quoteFormat, bottom, characterLimit, maxLines) {
  let res = '';
  quoteFormat = quoteFormat || 'single';
  const strLength = strArray[0].length;
  const spacing = (quoteFormat === 'tower') ? 3 : 1; // to account for spaces and linebreaks
  const quotesNumber = Math.min(
    strArray.length,
    Math.floor(characterLimit / (strLength + spacing)),
  );
  const offset = bottom * (strArray.length - quotesNumber);
  switch (quoteFormat) {
    case 'lines': {
      const cols = Math.floor(quotesNumber / maxLines);
      if (cols < 1) {
        for (let i = 0; i < quotesNumber; i++) {
          res += `${strArray[i]}\n`;
        }
      } else {
        const r = Math.floor((quotesNumber - maxLines) / cols) + 1;
        for (let i = 0 + offset; i < maxLines - r + offset; i++) {
          res += `${strArray[i]}\n`;
        }
        for (let i = maxLines - r + offset; i < quotesNumber + offset; i++) {
          res += strArray[i] + (
            ((i - maxLines - r + offset) % (cols + 1) === 0 || i === quotesNumber + offset - 1)
              ? '\n'
              : ' '
          );
        }
      }
      break;
    }
    case 'tower': {
      const cols = (quotesNumber / 3 < maxLines - 1) // at least three width
        ? 3 : Math.ceil(quotesNumber / maxLines - 1);
      let cnt = 0;
      for (let i = 0 + offset; i < quotesNumber + offset; i++) {
        if (cnt && cnt % cols === cols - 1) {
          res += `${strArray[i]}\n`;
        } else {
          res += `${strArray[i]} | `;
        }
        cnt++;
      }
      if (cnt % 3) res = `${res.slice(0, -2)}\n`;
      break;
    }
    default: {
      for (let i = 0 + offset; i < quotesNumber + offset; i++) {
        res += `${strArray[i]} `;
      }
      res += '\n';
      break;
    }
  }
  return res;
}

function getUIDStats(posts) {
  const postids = [];
  for (let i = 0; i < posts.length; i++) {
    const idelems = posts[i].getElementsByClassName('posteruid');
    if (idelems.length) {
      const uid = idelems[0].classList[1].slice(3);
      if (postids[uid]) {
        postids[uid][0].push(posts[i].id.slice(2));
        postids[uid][1] += 1;
      } else {
        postids[uid] = [
          [posts[i].id.slice(2)], 1,
        ];
      }
    }
  }
  return postids;
}

export function createQuotes(action, quoteFormat, quoteBottom) {
  const board = getBoard();
  if (!board) return '';

  let str = '';

  const is4chanX = (document.querySelector("html[class~='fourchan-x'") !== null);

  const limits = getBoardInfo(board);
  const maxLines = limits.maxLines;
  const characterLimit = limits.characterLimit;

  let posts = [];
  if (/\/catalog$/.test(window.location.href)) {
    posts = document.getElementsByClassName('thread');
  } else {
    posts = document.querySelectorAll("div[class~='postContainer']:not([data-clone])");
  }

  if (action === 'regular') {
    const ids = Array.from(posts).map((e) => `>>${e.id.match(/(?<=\D+)\d+/)}`);
    str += createQuotesString(ids, quoteFormat, quoteBottom, characterLimit, maxLines);
  } else if (action === 'dubs') {
    const dubs = [];
    for (let i = 0; i < posts.length; i++) {
      if (/(\d)\1\b/.test(posts[i].id)) {
        dubs.push(`>>${posts[i].id.match(/(?<=\D+)\d+/)}`);
      }
    }
    if (!dubs.length) return 'No posts with digits found';
    str += createQuotesString(dubs, quoteFormat, quoteBottom, characterLimit, maxLines);
  } else if (action === 'memeflags') {
    const memeflags = [];
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].getElementsByClassName('bfl').length) {
        memeflags.push(`>>${posts[i].id.slice(2)}`);
      }
    }
    if (!memeflags.length) return 'No memeflags found';
    str += createQuotesString(memeflags, quoteFormat, quoteBottom, characterLimit, maxLines);
  } else if (action === '1pbtid') {
    const onepbtid = [];
    const postids = getUIDStats(posts);
    const uids = Object.keys(postids);
    for (let c = 0; c < uids.length; c++) {
      const uidstat = postids[uids[c]];
      if (uidstat[1] === 1) {
        onepbtid.push(`>>${uidstat[0][0]}`);
      }
    }
    if (!onepbtid.length) return 'No 1pbtids found';
    str += createQuotesString(onepbtid, quoteFormat, quoteBottom, characterLimit, maxLines);
  } else if (action === 'rankings') {
    const ranking = [];
    const postids = getUIDStats(posts);
    const uids = Object.keys(postids);
    for (let c = 0; c < uids.length; c++) {
      const uidstat = postids[uids[c]];
      ranking.push([uids[c], uidstat[0], uidstat[1]]);
    }
    ranking.sort((e1, e2) => e2[2] - e1[2]);
    for (let v = 0; v < ranking.length; v++) {
      if ((v + 1) * 4 + 1 > maxLines) {
        break;
      }
      const uidStat = ranking[v];
      const numOrdinal = getNumberWithOrdinal(v + 1);
      let addStr = '\n';
      addStr += `${numOrdinal} place:\n${uidStat[0]} with ${uidStat[2]} posts:\n`;
      addStr += createQuotesString(uidStat[1].map((e) => `>>${e}`), 'single', quoteBottom, characterLimit, maxLines);
      if (str.length + addStr.length > characterLimit) {
        break;
      }
      str += addStr;
    }
    if (!str.length) return "Couldn't rank users";
    return str;
  } else if (action === 'kym') {
    const kym = [];
    let filename = null;
    let filenameDOM = null;
    for (let i = 0; i < posts.length; i++) {
      if (is4chanX) {
        filenameDOM = posts[i].querySelector("div[class~='fileText'] > span[class~='file-info'] > a[target]");
      } else {
        filenameDOM = posts[i].querySelector("[class~='fileText'] > a");
      }
      if (filenameDOM !== null) {
        filename = filenameDOM.textContent;
        if (kymRegex.test(filename)) {
          kym.push(`>${filename}`);
        }
      }
    }
    if (!kym.length) return 'No KYM filenames found';
    str += createQuotesString(kym, quoteFormat, quoteBottom, characterLimit, maxLines);
  }

  return str;
}
