import {
  isKYMfilename,
  getFilenameElements,
} from './misc';

function createQuotesString(links, format, quoteBottom, characterLimit, maxLines) {
  let result = '';

  const spacing = (format === 'tower') ? 3 : 1; // to account for spaces and linebreaks

  const maxRepliesToFit = Math.min(
    links.length,
    Math.floor(characterLimit / (links[0].length + spacing)),
  );

  const offset = quoteBottom * (links.length - maxRepliesToFit);

  switch (format) {
    case 'lines': {
      const cols = Math.floor(maxRepliesToFit / maxLines);

      if (cols < 1) {
        for (let i = 0; i < maxRepliesToFit; ++i) {
          result += `${links[i]}\n`;
        }
      } else {
        const rows = Math.floor((maxRepliesToFit - maxLines) / cols) + 1;

        const currentRow = offset;
        const remainingLines = maxLines - rows + offset;

        for (let i = currentRow; i < remainingLines; ++i) {
          result += `${links[i]}\n`;
        }

        const startColumn = maxLines - rows + offset;
        const endQuoteIndex = maxRepliesToFit + offset;

        for (let i = startColumn; i < endQuoteIndex; ++i) {
          result += links[i];

          const isLastColumn = ((i - startColumn) % (cols + 1) === 0) || (i === endQuoteIndex - 1);
          result += isLastColumn ? '\n' : ' ';
        }
      }
      break;
    }
    case 'tower': {
      const cols = (maxRepliesToFit / 3 < maxLines - 1)
        ? 3 : Math.ceil(maxRepliesToFit / maxLines - 1);

      let count = 0;

      for (let i = offset; i < (maxRepliesToFit + offset); ++i) {
        if (count && ((count % cols) === (cols - 1))) {
          result += `${links[i]}\n`;
        } else {
          result += `${links[i]} | `;
        }
        ++count;
      }

      if (count % 3) {
        result = `${result.slice(0, -3)}\n`;
      }
      break;
    }
    default: {
      for (let i = offset; i < (maxRepliesToFit + offset); ++i) {
        result += `${links[i]} `;
      }
      result = `${result.slice(0, -1)}\n`;
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
