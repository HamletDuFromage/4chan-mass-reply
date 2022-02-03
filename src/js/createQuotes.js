'use strict';

import { getBoard, getBoardLimits } from './boardLimits';

function createQuotesString(strArray, format, bottom, characterLimit, maxLines) {
    let res = "";
    format = format ? format : 'single';
    const strLength = strArray[0].length;
    const spacing = (format === 'tower') ? 3 : 1; // to account for spaces and linebreaks
    let quotesNumber = Math.min(strArray.length, Math.floor(characterLimit / (strLength + spacing)));
    const offset = bottom * (strArray.length - quotesNumber);
    switch (format) {
        case 'lines': {
            const cols = Math.floor(quotesNumber / maxLines);
            if (cols < 1) {
                for (let i = 0; i < quotesNumber; i++) {
                    res += strArray[i] + "\n";
                }
            }
            else {
                let r = Math.floor((quotesNumber - maxLines) / cols) + 1;
                for (let i = 0 + offset; i < maxLines - r + offset; i++) {
                    res += strArray[i] + "\n";
                }
                for (let i = maxLines - r + offset; i < quotesNumber + offset; i++) {
                    res += strArray[i] + (((i - maxLines - r + offset) % (cols + 1) === 0 || i === quotesNumber + offset - 1) ? "\n" : " ");
                }
            }
            break;
        }
        case 'tower': {
            const cols = (quotesNumber / 3 < maxLines - 1) //at least three width
                ? 3
                : Math.ceil(quotesNumber / maxLines - 1);
            let cnt = 0;
            for (let i = 0 + offset; i < quotesNumber + offset; i++) {
                if (cnt && cnt % 3 === 2) {
                    res += strArray[i] + "\n";
                }
                else {
                    res += strArray[i] + " | ";
                }
                cnt++;
            }
            if (cnt % 3) res = res.slice(0, -2) + "\n";
            break;
        }
        default: {
            for (let i = 0 + offset; i < quotesNumber + offset; i++) {
                res += strArray[i] + " ";
            }
            res += "\n";
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
                const vals = postids[uid];
                postids[uid][0].push(posts[i].id.slice(2));
                postids[uid][1] += 1;
            } else {
                postids[uid] = [[posts[i].id.slice(2)], 1];
            }
        }
    }
    return postids;
}

export default function createQuotes(action, format, bttm) {
    const board = getBoard();
    if (!board) return 'This is not a recongized 4chan thread';

    let str = "";
    let fourchanx = document.querySelector('html[class~="fourchan-x"') === null ? false : true;
    const limits = getBoardLimits(board);
    const maxLines = limits.maxLines;
    const characterLimit = limits.characterLimit;

    const posts = document.querySelectorAll('div[class~="postContainer"]:not([data-clone])');

    if (action === "regular" || action === "sneed") {
        const ids = Array.from(posts).map(e => {
            return ">>" + e.id.slice(2);
        });
        str += createQuotesString(ids, format, bttm, characterLimit, maxLines);

        if (action === "sneed") {
            str += "sneed";
        }
    }
    else if (action === "dubs") {
        let dubs = [];
        for (let i = 0; i < posts.length; i++) {
            if (/(\d)\1\b/.test(posts[i].id)) {
                dubs.push(">>" + posts[i].id.slice(2));
            }
        }
        if (!dubs.length) return 'No posts with digits found';
        str += createQuotesString(dubs, format, bttm, characterLimit, maxLines);
    }
    else if (action === "memeflags") {
        let memeflags = [];
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].getElementsByClassName('bfl').length) {
                memeflags.push(">>" + posts[i].id.slice(2));
            }
        }
        if (!memeflags.length) return 'No memeflags in this thread';
        str += createQuotesString(memeflags, format, bttm, characterLimit, maxLines);
    }
    else if (action === "1pbtid") {
        const onepbtid = [];
        const postids = getUIDStats(posts);
        const uids = Object.keys(postids);
        for (let c = 0; c < uids.length; c++) {
            const posts = postids[uids[c]];
            if (posts[1] === 1) {
                onepbtid.push(">>" + posts[0][0]);
            }
        }
        if (!onepbtid.length) return "No 1pbtids";
        str += createQuotesString(onepbtid, format, bttm, characterLimit, maxLines);
    }
    else if (action === "rankings") {
        const ranking = [];
        const postids = getUIDStats(posts);
        const uids = Object.keys(postids);
        for (let c = 0; c < uids.length; c++) {
            const posts = postids[uids[c]];
            ranking.push([uids[c], posts[0], posts[1]]);
        }
        ranking.sort((e1, e2) => e2[2] - e1[2]);
        for (let v = 0; v < ranking.length; v++) {
            if ((v + 1) * 4 + 1 > maxLines) {
                break;
            }
            const uidStat = ranking[v];
            console.log(`Rank ${v}: ${uidStat[0]} with ${uidStat[2]} Postings`);
            let addStr = '\n';
            addStr += `Rank ${v+1}.:\n${uidStat[0]} with ${uidStat[2]} Postings:\n`;
            addStr += createQuotesString(uidStat[1].map((e) => '>>' + e), 'single', bttm, characterLimit, maxLines);
            if (str.length + addStr.length > characterLimit) {
                break;
            }
            str += addStr;
        }
        if (!str.length) return "Couldn't rank users";
        return str;
    }
    else if (action === "kym") {
        let kym = [];
        let filename = null;
        let filenameDOM = null;
        for (let i = 0; i < posts.length; i++) {
            if (fourchanx) {
                filenameDOM = posts[i].querySelector('div[class~="fileText"] > span[class~="file-info"] > a[target]');
            }
            else {
                filenameDOM = posts[i].querySelector('[class~="fileText"] > a');
            }
            if (filenameDOM !== null) {
                filename = filenameDOM.textContent
                if (/^\b\w{3}\./.test(filename)) {
                    kym.push(">" + filename);
                }
            }

        }
        if (!kym.length) return 'No kym filenames found';
        str += createQuotesString(kym, format, bttm, characterLimit, maxLines);
    }

    return str;
};
