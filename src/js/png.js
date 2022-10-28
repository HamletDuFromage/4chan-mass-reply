/*
 * PNG references:
 * File structure:
 * http://www.libpng.org/pub/png/spec/1.2/PNG-Structure.html
 * Chunk specifications:
 * http://www.libpng.org/pub/png/spec/1.2/PNG-Chunks.html
 */

import {
  getRandomDate,
  crc32,
} from './misc';

// various PNG chunk types
// eslint-disable-next-line no-unused-vars
const TYPE_TIME = 0x74494d45;
// eslint-disable-next-line no-unused-vars
const TYPE_IHDR = 0x49484452;
// eslint-disable-next-line no-unused-vars
const TYPE_IDAT = 0x49444154;
// eslint-disable-next-line no-unused-vars
const TYPE_IEND = 0x49454e44;

// create tIME PNG chunk data out of given Date
function createTIMEChunk(date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const tIME = [
    // length
    0, 0, 0, 7,
    // TYPE_TIME
    0x74, 0x49, 0x4d, 0x45,
    year >>> 8, year & 0xFF, month, day, hours, minutes, seconds,
  ];
  const crc = Number(crc32(tIME.slice(4)));
  tIME.push(crc >>> 24);
  tIME.push((crc >>> 16) & 0xFF);
  tIME.push((crc >>> 8) & 0xFF);
  tIME.push(crc & 0xFF);
  return tIME;
}

// search for first occurance of specific chunk type
function findChunk(buffer, type) {
  const view = new DataView(buffer);
  const length = buffer.byteLength;
  // first 8 bytes are signature
  for (let i = 8; i < (length - 12);) {
    const chunkType = Number(view.getUint32(i + 4));
    if (chunkType === type) {
      return i;
    }
    const chunkLength = view.getUint32(i);
    i += 4 + 4 + chunkLength + 4;
  }
  return null;
}

/*
 * checks if PNG file has tIME chunk (modification time)
 * and change it to a random time this year,
 * create new chunk if not available
 */
export function changeModificationTime(buffer) {
  const tIMEPos = findChunk(buffer, TYPE_TIME);
  const newDate = getRandomDate();
  const tIME = createTIMEChunk(newDate);
  if (tIMEPos) {
    // tIME chunk exists, change it
    const view = new DataView(buffer);
    // skip length and time
    for (let i = 8; i < tIME.length; ++i) {
      view.setUint8(tIMEPos + i, tIME[i]);
    }
    return [buffer];
  }
  // add new tIME chunk before first IDAT chunk
  const iDATPos = findChunk(buffer, TYPE_IDAT);
  if (iDATPos) {
    return [buffer.slice(0, iDATPos), new Uint8Array(tIME), buffer.slice(iDATPos)];
  }
  return [buffer];
}
