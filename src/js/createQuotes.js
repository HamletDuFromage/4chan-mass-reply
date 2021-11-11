'use strict';

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
                    res += strArray[i] + "<br>";
                }
            }
            else {
                let r = Math.floor((quotesNumber - maxLines) / cols) + 1;
                for (let i = 0 + offset; i < maxLines - r + offset; i++) {
                    res += strArray[i] + "<br>";
                }
                for (let i = maxLines - r + offset; i < quotesNumber + offset; i++) {
                    res += strArray[i] + (((i - maxLines - r + offset) % (cols + 1) === 0 || i === quotesNumber + offset - 1) ? "<br>" : " ");
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
                    res += strArray[i] + "<br>";
                }
                else {
                    res += strArray[i] + " | ";
                }
                cnt++;
            }
            if (cnt % 3) res += "<br>";
            break;
        }
        default: {
            for (let i = 0 + offset; i < quotesNumber + offset; i++) {
                res += strArray[i] + " ";
            }
            res += "<br>";
            break;
        }
    }
    return res;
}

export function getBoardLimits(board) {
    let maxLines = 100;
    let characterLimit = 2000;
    switch (board[1]) {
        case "pol":
            maxLines = 70;
            break;
        case "v":
            maxLines = 25;
            break;
        case "bant":
            maxLines = 49;
            break;

        case "jp":
            characterLimit = 5000;
            break;
        case "lit":
            characterLimit = 3000;
            break;
        case "vt":
            characterLimit = 5000;
            break;
        case "qst":
            characterLimit = 3000;
            break;
        case "vt":
            characterLimit = 5000;
            break;
        case "mlp":
            characterLimit = 3000;
            break;
    }
    return {
      maxLines,
      characterLimit,
    };
}

export default function createQuotes(action, format, bttm) {
    let board = window.location.href.match(/boards.4chan(?:nel)?.org\/([a-z]+)\/.*thread.*/);
    if (!board) return 'This is not a recongized 4chan thread';

    let str = "";
    let fourchanx = document.querySelector('html[class~="fourchan-x"') === null ? false : true;
    const limits = getBoardLimits(board[1]);
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
