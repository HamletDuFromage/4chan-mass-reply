import {
  debugLog,
} from './misc';

// credits: pixelplanetdev

// Decide if a pixel is closer to black than to white.
function isPixelDark(r, g, b) {
  return ((r + g + b) <= ((256 * 3) / 2));
}

/*
 * Get bordering pixels of transparent areas (the outline of the circles)
 * and return their coordinates with the neighboring color.
 */
function getBoundaries(imgData) {
  const data = imgData.data;
  const width = imgData.width;

  const boundaries = [];

  let isPreviousOpaque = true;

  for (let i = data.length - 1; i >= 0; i -= 4) {
    // alpha channel above 128 is assumed opaque
    const isCurrentOpaque = (data[i] > 128);
    if (isCurrentOpaque === isPreviousOpaque) continue;

    // ignore single pixel areas
    const isNextOpaque = (data[i - 4] > 128);
    if (isNextOpaque === isPreviousOpaque) continue;

    let transparentPixelNum;
    let dark;

    if (isCurrentOpaque) {
      // transparent pixel to the right
      transparentPixelNum = (i + 1) / 4;
      dark = isPixelDark(data[i - 3], data[i - 2], data[i - 1]);
    } else {
      // opaque pixel to the right
      transparentPixelNum = (i - 3) / 4;
      dark = isPixelDark(data[i + 1], data[i + 2], data[i + 3]);
    }

    const x = transparentPixelNum % width;
    const y = Math.floor(transparentPixelNum / width);

    boundaries.push({ x, y, dark });

    isPreviousOpaque = isCurrentOpaque;
  }
  debugLog(`Boundry area of ${boundaries.length} pixels in captcha`);
  return boundaries;
}

/*
 * Slide the background image and compare the colors of the border pixels in
 * boundaries, the position with the most matches wins
 * Return in slider-percentage.
 */
function getBestPos(bgData, boundaries, slideWidth) {
  const data = bgData.data;
  const width = bgData.width;

  let bestSimilarity = 0;
  let bestPos = 0;

  const boundariesLen = boundaries.length;

  for (let slidePos = 0; slidePos <= slideWidth; ++slidePos) {
    let similarity = 0;

    for (let boundryIndex = 0; boundryIndex < boundariesLen; ++boundryIndex) {
      const boundry = boundaries[boundryIndex];
      const index = ((boundry.x + slidePos) + (boundry.y * width)) * 4;
      const bgDark = isPixelDark(data[index], data[index + 1], data[index + 2]);
      if (bgDark === boundry.dark) {
        ++similarity;
      }
    }

    if (similarity > bestSimilarity) {
      bestSimilarity = similarity;
      bestPos = slidePos;
    }
  }
  debugLog(`Best slider position with similarity of ${bestSimilarity}: ${bestPos}`);
  return (bestPos / slideWidth) * 100;
}

function getImageDataFromURI(uri) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const cvs = document.createElement('canvas');
      cvs.width = img.width;
      cvs.height = img.height;
      const ctx = cvs.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, cvs.width, cvs.height);
      resolve(imgData);
    };

    img.onerror = reject;
    img.src = uri;
  });
}

/*
 * Automatically slide captcha into place
 * Arguments are the 't-fg', 't-bg', 't-slider', 't-resp' elements of the captcha
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
  getImageDataFromURI(tfgUri).then((fgImgData) => {
    // get array with pixels of foreground
    // that we compare to background
    const boundaries = getBoundaries(fgImgData);
    // load background (image that gets slid)
    getImageDataFromURI(tbgUri).then((bgImgData) => {
      const slideWidth = bgImgData.width - fgImgData.width;
      // slide, compare and get best matching position
      const sliderPos = getBestPos(bgImgData, boundaries, slideWidth);
      // slide in the UI
      sliderElement.value = sliderPos;
      sliderElement.dispatchEvent(new Event('input'), { bubbles: true });
      answerElement.focus();
    });
  });
}
