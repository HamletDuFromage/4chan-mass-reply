import {
  debugLog,
} from './misc';

/*
 * decide if a pixel is closer to black than to white.
 * return 0 for white, 1 for black
 */
function pxlBlackOrWhite(r, g, b) {
  return (r + g + b > 384) ? 0 : 1;
}

/*
 * Get bordering pixels of transparent areas (the outline of the circles)
 * and return their coordinates with the neighboring color.
 */
function getBoundries(imgdata) {
  const data = imgdata.data;
  const width = imgdata.width;

  let i = data.length - 1;
  let cl = 0;
  let cr = 0;
  const chkArray = [];
  let opq = true;
  while (i > 0) {
    // alpha channel above 128 is assumed opaque
    const a = data[i] > 128;
    if (a !== opq) {
      if ((data[i - 4] > 128) === opq) {
        // ignore just 1-width areas
        i -= 4;
        continue;
      }
      if (a) {
        /* transparent pixel to its right */
        /*
                // set to color blue (for debugging)
                data[i + 4] = 255;
                data[i + 3] = 255;
                data[i + 2] = 0;
                data[i + 1] = 0;
                */
        const pos = (i + 1) / 4;
        const x = pos % width;
        const y = (pos - x) / width;
        // 1: black, 0: white
        const clr = pxlBlackOrWhite(data[i - 1], data[i - 2], data[i - 3]);
        chkArray.push([x, y, clr]);
        cr += 1;
      } else {
        /* opaque pixel to its right */
        /*
                // set to color red (for debugging)
                data[i] = 255;
                data[i - 1] = 0;
                data[i - 2] = 0;
                data[i - 3] = 255;
                */
        const pos = (i - 3) / 4;
        const x = pos % width;
        const y = (pos - x) / width;
        // 1: black, 0: white
        const clr = pxlBlackOrWhite(data[i + 1], data[i + 2], data[i + 3]);
        chkArray.push([x, y, clr]);
        cl += 1;
      }
      opq = a;
    }
    i -= 4;
  }
  debugLog(`Border area of ${cl + cr} pixels in captcha`);
  return chkArray;
}

/*
 * slide the background image and compare the colors of the border pixels in
 * chkArray, the position with the most matches wins
 * Return in slider-percentage.
 */
function getBestPos(bgdata, chkArray, slideWidth) {
  const data = bgdata.data;
  const width = bgdata.width;
  let bestSimilarity = 0;
  let bestPos = 0;

  for (let s = 0; s <= slideWidth; s += 1) {
    let similarity = 0;
    const amount = chkArray.length;
    for (let p = 0; p < amount; p += 1) {
      const chk = chkArray[p];
      const x = chk[0] + s;
      const y = chk[1];
      const clr = chk[2];
      const off = (y * width + x) * 4;
      const bgclr = pxlBlackOrWhite(data[off], data[off + 1], data[off + 2]);
      if (bgclr === clr) {
        similarity += 1;
      }
    }
    if (similarity > bestSimilarity) {
      bestSimilarity = similarity;
      bestPos = s;
    }
  }
  debugLog(`Best slider position with similarity of ${bestSimilarity}: ${bestPos}`);
  return bestPos / slideWidth * 100;
}

function getImageDataFromURI(uri) {
  return new Promise((resolve, reject) => {
    const image = document.createElement('img');
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      const imgdata = ctx.getImageData(0, 0, canvas.width, canvas.height);
      resolve(imgdata);
    };
    image.onerror = (e) => {
      reject(e);
    };
    image.src = uri;
  });
}

/*
 * Automatically slide captcha into place
 * Arguments are the "t-fg', 't-bg', 't-slider', 't-resp' elements of the captcha
 */
export function slideCaptcha(tfgElement, tbgElement, sliderElement, answerElement) {
  // get data uris for captcha back- and foreground
  const tbgUri = tbgElement.style.backgroundImage.slice(5, -2);
  const tfgUri = tfgElement.style.backgroundImage.slice(5, -2);

  if (!tbgUri || !tfgUri) {
    // no slider present
    return;
  }

  // load foreground (image with holes)
  getImageDataFromURI(tfgUri).then((igd) => {
    // get array with pixels of foreground
    // that we compare to background
    const chkArray = getBoundries(igd);
    // load background (image that gets slid)
    getImageDataFromURI(tbgUri).then((sigd) => {
      const slideWidth = sigd.width - igd.width;
      // slide, compare and get best matching position
      const sliderPos = getBestPos(sigd, chkArray, slideWidth);
      // slide in the UI
      sliderElement.value = sliderPos;
      sliderElement.dispatchEvent(new Event('input'), { bubbles: true });
      answerElement.focus();
    });
  });
}
