import {
  isKYMfilename,
  getFilenameElements,
} from './misc';

function createQuotesString(links, format, quoteBottom, characterLimit, maxLines) {
  if (links.length < 1) {
    return '';
  }

  let result = '';

  switch (format) {
    case 'max': {
      const quoteCount = Math.min(
        links.length,
        Math.floor(characterLimit / (links[0].length + 1)),
      );

      const offset = quoteBottom * (links.length - quoteCount);

      const upper_cols = Math.ceil(quoteCount / maxLines);
      const upper_rows = quoteCount % maxLines;
      let matrix = [];
      for (let i = 0; i < upper_rows; i++) {
        let row = [];
        for (let j = 0; j < upper_cols; j++) {
          row.push(links[i * upper_cols + j + offset]);
        }
        matrix.push(row.join(' '));
      }

      const lower_cols = Math.floor(quoteCount / maxLines);
      const lower_rows = Math.min((quoteCount - upper_cols * upper_rows) / lower_cols, maxLines - upper_rows)
      for (let i = 0; i < lower_rows; i++) {
        let row = [];
        for (let j = 0; j < lower_cols; j++) {
          let pos = (i + upper_cols * upper_rows) * lower_cols + j + offset;
          if (pos >= links.length) break;
          row.push(links[pos]);
        }
        matrix.push(row.join(' '));
      }

      result = `${matrix.join('\n')}\n`;
      break;
    }
    case 'align': {
      // how many columns to fit within line limit
      const columnCount = Math.ceil(links.length / maxLines);

      const rowLen = links[0].length * columnCount + 3 * (columnCount - 1) + 1;

      const rowCount = Math.floor(Math.min(
        links.length / columnCount,
        characterLimit / rowLen, // how many rows fit within character limit
      ));

      const quoteCount = rowCount * columnCount;

      const offset = quoteBottom * (links.length - quoteCount);

      for (let i = 0; i < quoteCount; ++i) {
        const isLastColumn = ((i + 1) % columnCount === 0);

        result += links[i + offset] + (isLastColumn ? '\n' : ' | ');
      }

      break;
    }
    default: {
      const quoteCount = Math.min(
        links.length,
        Math.floor(characterLimit / (links[0].length + 1)),
      );

      const offset = quoteBottom * (links.length - quoteCount);

      result = `${links.slice(offset, offset + quoteCount).join(' ')}\n`;
      break;
    }
  }

  return result;
}

function getUIDStats(posts) {
  const stats = {};
  for (let i = 0; i < posts.length; ++i) {
    const pidElems = posts[i].getElementsByClassName('posteruid');
    if (!pidElems.length) continue;
    const uid = pidElems[0].classList[1].slice(3);
    const pid = posts[i].id.match(/\d+/);
    if (stats[uid]) {
      stats[uid].push(pid);
    } else {
      stats[uid] = [pid];
    }
  }
  return stats;
}

function getNumberWithOrdinal(i) {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) return `${i}st`;
  if (j === 2 && k !== 12) return `${i}nd`;
  if (j === 3 && k !== 13) return `${i}rd`;
  return `${i}th`;
}

export function createQuotes(action, format, quoteBottom, maxLines, characterLimit) {
  let posts = [];
  if (/^\/[^/]+\/catalog$/.test(window.location.pathname)) {
    posts = document.getElementsByClassName('thread');
  } else {
    posts = document.querySelectorAll("div[class~='postContainer']:not([data-clone])");
  }

  switch (action) {
    case 'regular': {
      const ids = Array.from(posts).map((element) => `>>${element.id.match(/\d+/)}`);
      return createQuotesString(ids, format, quoteBottom, characterLimit, maxLines);
    }
    case 'dubs': {
      const dubs = [];
      for (let i = 0; i < posts.length; ++i) {
        if (/(\d)\1\b/.test(posts[i].id)) {
          dubs.push(`>>${posts[i].id.match(/\d+/)}`);
        }
      }
      if (!dubs.length) return 'No posts with digits found';
      return createQuotesString(dubs, format, quoteBottom, characterLimit, maxLines);
    }
    case 'memeflags': {
      const memeflags = [];
      for (let i = 0; i < posts.length; ++i) {
        if (posts[i].getElementsByClassName('bfl').length) {
          memeflags.push(`>>${posts[i].id.match(/\d+/)}`);
        }
      }
      if (!memeflags.length) return 'No memeflags found';
      return createQuotesString(memeflags, format, quoteBottom, characterLimit, maxLines);
    }
    case '1pbtid': {
      const onepbtid = [];
      const stats = getUIDStats(posts);
      const uids = Object.keys(stats);
      for (let i = 0; i < uids.length; ++i) {
        const uidStat = stats[uids[i]];
        if (uidStat.length === 1) {
          onepbtid.push(`>>${uidStat[0]}`);
        }
      }
      if (!onepbtid.length) return 'No 1pbtids found';
      return createQuotesString(onepbtid, format, quoteBottom, characterLimit, maxLines);
    }
    case 'rankings': {
      const stats = getUIDStats(posts);
      const statsSorted = Object.entries(stats).sort((e1, e2) => e2[1].length - e1[1].length);

      let result = '';
      for (let i = 0; i < statsSorted.length; ++i) {
        if (maxLines < ((i + 1) * 2)) break;

        const stat = statsSorted[i];
        const statUID = stat[0];
        const statPosts = stat[1];
        const numOrdinal = getNumberWithOrdinal(i + 1);
        const ranking = `${numOrdinal} place ${
          statUID} with ${statPosts.length} post${((statPosts.length > 1) ? 's' : '')}:\n${
          createQuotesString(statPosts.map((pid) => `>>${pid}`), 'single', quoteBottom, characterLimit, maxLines)}`;

        if (characterLimit < (result.length + ranking.length)) break;

        result += ranking;
      }
      if (!result.length) return "Couldn't rank users";
      return result;
    }
    case 'kym': {
      const kym = [];

      const filenameElems = getFilenameElements(document.body);
      for (let i = 0; i < filenameElems.length; ++i) {
        const filename = filenameElems[i].textContent;
        if (isKYMfilename(filename)) {
          kym.push(`>>${posts[i].id.match(/\d+/)}\n>${filename}`);
        }
      }

      if (!kym.length) return 'No KYM filenames found';
      return createQuotesString(kym, format, quoteBottom, characterLimit, maxLines);
    }
  }

  return '';
}
