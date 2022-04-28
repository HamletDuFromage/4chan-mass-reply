/*
 * PNG eferences:
 * File structure:
 * http://www.libpng.org/pub/png/spec/1.2/PNG-Structure.html
 * Chunk specifications:
 * http://www.libpng.org/pub/png/spec/1.2/PNG-Chunks.html
 */

import {
  debugLog,
} from './misc';

/*
 * calculate table for faster crc calculation
 */
function makeCRCTable() {
  let c;
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    crcTable[n] = c;
  }
  return crcTable;
}

/*
 * calculate 32bit crc for given string / array / Uint8Array
 */
export function crc32(str) {
  const crcTable = window.crcTable || (window.crcTable = makeCRCTable());
  let crc = 0 ^ (-1);
  for (let i = 0; i < str.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ str[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

/*
 * get a random date at least one year and max two years ago
 */
function getRandomDateTwoYears() {
  const yearMs = 365 * 24 * 60 * 60 * 1000;
  const curtime = Date.now();
  const randomTimePastTwoYear = curtime - yearMs - Math.floor(Math.random() * yearMs);
  return new Date(randomTimePastTwoYear);
}

/*
 * create tIME PNG chunk data out of given Date
 */
function createTIMEChunk(dateTime) {
  const year = dateTime.getUTCFullYear();
  const month = dateTime.getUTCMonth() + 1;
  const day = dateTime.getUTCDate();
  const hours = dateTime.getUTCHours();
  const minutes = dateTime.getUTCMinutes();
  const seconds = dateTime.getUTCSeconds();
  const tIME = [
    /* TYPE_TIME */
    0x74, 0x49, 0x4d, 0x45,
    year >>> 8, year & 0x00FF, month, day, hours, minutes, seconds,
  ];
  const crc = Number(crc32(tIME));
  tIME.push(crc >>> 24);
  tIME.push(crc >>> 16 & 0x000000FF);
  tIME.push(crc >>> 8 & 0x000000FF);
  tIME.push(crc & 0x000000FF);
  return tIME.map((e) => Number(e));
}

/*
 * various PNG chunk types
 */
// eslint-disable-next-line no-unused-vars
const TYPE_TIME = 0x74494d45;
// eslint-disable-next-line no-unused-vars
const TYPE_IHDR = 0x49484452;
// eslint-disable-next-line no-unused-vars
const TYPE_IDAT = 0x49444154;
// eslint-disable-next-line no-unused-vars
const TYPE_IEND = 0x49454e44;

/*
 * search for first occurance of specific chunk type
 */
function searchForChunk(buffer, type) {
  const view = new DataView(buffer);
  const length = buffer.byteLength;
  // first 8 bytes are signature
  let i = 8;
  while (i < length) {
    const chunkLength = view.getUint32(i);
    i += 4;
    const chunkType = Number(view.getUint32(i));
    if (chunkType === type) {
      return i;
    }
    i += 4;
    // skip crc
    i += chunkLength + 4;
  }
  return null;
}

/*
 * checks if PNG file has tIME chunk (modification time )
 * and change it to a random time between 1 and 2 years ago.
 * Creating new chunk if not available.
 */
export function changeModificationTime(buffer) {
  const newDate = getRandomDateTwoYears();
  const timeData = createTIMEChunk(newDate);
  const tIMEPos = searchForChunk(buffer, TYPE_TIME);
  try {
    if (tIMEPos) {
      /*
       * tIME chunk exists, change it
       */
      const view = new DataView(buffer);
      for (let i = 0; i < timeData.length; i += 1) {
        view.setUint8(tIMEPos + i, timeData[i]);
      }
      return [buffer];
    }
    /*
       * add new tIME chunk before first IDAT chunk
       */
    const iDATPos = searchForChunk(buffer, TYPE_IDAT) - 4;
    const tIMEBuffer = Uint8Array.from([
      // length minus crc and type
      0x00, 0x00, 0x00, timeData.length - 8,
      ...timeData,
    ]);
    return [buffer.slice(0, iDATPos), tIMEBuffer.buffer, buffer.slice(iDATPos)];
  } catch (e) {
    debugLog('Error when trying to change PNG modify time:', e);
    return [buffer];
  }
}

export default changeModificationTime;
