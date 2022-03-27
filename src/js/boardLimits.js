"use strict";

export function getBoard() {
    const board = window.location.href.match(/(?<=boards.4chan(?:nel)?.org\/)[a-z0-9]+(?=\/)/);
    if (board.length) {
      return board[0];
    }
    return null;
}

export function getBoardLimits(board) {
    let maxLines = 100;
    let characterLimit = 2000;
    let maxImageFilesize = 4194304;
	let hasUserIDs = false;
    switch (board) {
        case "b":
            maxImageFilesize = 2097152;
            break;
        case "biz":
			hasUserIDs = true;
            break;
        case "gd":
            maxImageFilesize = 8388608;
            break;
        case "hc":
            maxImageFilesize = 8388608;
            break;
        case "hr":
            maxImageFilesize = 8388608;
            break;
        case "r":
            maxImageFilesize = 8388608;
            break;
        case "tg":
            maxImageFilesize = 8388608;
            break;
        case "trv":
            maxImageFilesize = 8388608;
            break;
        case "wsr":
            maxImageFilesize = 8388608;
            break;
        case "w":
            maxImageFilesize = 6291456;
            break;
        case "wg":
            maxImageFilesize = 6291456;
            break;
        case "wsg":
            maxImageFilesize = 6291456;
            break;
        case "out":
            maxImageFilesize = 5242880;
            break;
        case "p":
            maxImageFilesize = 5242880;
            break;
        case "soc":
            maxImageFilesize = 5242880;
			hasUserIDs = true;
            break;
        case "po":
            maxImageFilesize = 8388608;
            break;
        case "s":
            maxImageFilesize = 8388608;
            break;
        case "r9k":
            maxImageFilesize = 2097152;
            break;
        case "s4s":
            maxImageFilesize = 2097152;
            break;
        case "pol":
            maxLines = 70;
			hasUserIDs = true;
            break;
        case "v":
            maxLines = 25;
            break;
        case "bant":
            maxLines = 49;
            maxImageFilesize = 2097152;
			hasUserIDs = true;
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
            maxImageFilesize = 8388608;
			hasUserIDs = true;
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
      maxImageFilesize,
	  hasUserIDs
    };
}
