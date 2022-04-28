import {
  debugLog,
} from './misc';
import {
  changeModificationTime,
} from './png';

/*
 * change filename to random timestamp of the past year
 */
export function anonFilename(file) {
  const curtime = new Date().getTime();
  const randomTimePastYear = curtime - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000);
  const filename = `${randomTimePastYear}.${file.name.split('.').slice(-1)}`;
  debugLog(`Changing the filename to "${filename}"`);
  return new File([file], filename, { type: file.type });
}

/*
 * change image hash by adding random bytes at the end
 */
export function anonHash(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const random = crypto.getRandomValues(new BigUint64Array(1));
      debugLog(`Changing the hash of the file (random: ${random})`);

      let newFile = [];
      if (file.type === 'image/jpeg') {
        newFile = [reader.result.slice(0, -10), random, reader.result.slice(-2)];
      } else if (file.type === 'image/png') {
        newFile = changeModificationTime(reader.result);
      } else {
        newFile = [reader.result, random];
      }

      const nFile = new File(newFile, file.name, { type: file.type });
      resolve(nFile);
    }, false);

    reader.readAsArrayBuffer(file);
  });
}

/*
 * convert webp into jpeg
 */
export function fileConvert(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      let mimetype = file.type;
      let filename = file.name;

      if (mimetype === 'image/webp') {
        debugLog('Converting WebP to JPEG');

        mimetype = 'image/jpeg';
        filename = `${filename.split('.')[0]}.jpg`;

        const img = new Image();
        img.onload = () => {
          const cvs = document.createElement('canvas');
          cvs.width = img.naturalWidth;
          cvs.height = img.naturalHeight;

          const ctx = cvs.getContext('2d');
          ctx.drawImage(img, 0, 0);

          cvs.toBlob((blob) => {
            const nFile = new File([blob], filename, { type: mimetype });
            resolve(nFile);
          }, mimetype, 0.9);
        };

        img.src = reader.result;
      } else {
        resolve(file);
      }
    }, false);

    reader.readAsDataURL(file);
  });
}

/*
 * check if file is within filesize limit, recompress into jpg if not.
 * if jpeg is still too large, reduce it's compression level till it fits
 */
export function fileCompress(file, maxImageSize, compressionLvl) {
  let compressionLevel = compressionLvl;

  return new Promise((resolve) => {
    if (file.size < maxImageSize) {
      if (compressionLevel) {
        const qrError = document.getElementById('qrError');
        if (qrError && qrError.getAttribute('data-type') === 'filesize') {
          qrError.style.display = 'none';
        }
        debugLog(`Successfully compressed the image, new file size - ${file.size} bytes`);
      }
      resolve(file);
      return;
    }
    if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/webp') {
      resolve(file);
      return;
    }

    let filename = file.name;
    const mimetype = 'image/jpeg';

    if (!compressionLevel) {
      compressionLevel = 0.9;
      filename = `${filename.split('.')[0]}.jpg`;
    } else {
      compressionLevel -= (0.9 / 3);
      if (compressionLevel < 0) {
        debugLog("Can't compress further");
        resolve(file);
        return;
      }
    }
    debugLog(`Compressing the image to JPEG quality ${compressionLevel.toFixed(2)}`);

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const img = new Image();
      img.onload = () => {
        const cvs = document.createElement('canvas');
        cvs.width = img.naturalWidth;
        cvs.height = img.naturalHeight;

        const ctx = cvs.getContext('2d');
        ctx.drawImage(img, 0, 0);

        cvs.toBlob((blob) => {
          const nFile = new File([blob], filename, { type: mimetype });
          fileCompress(nFile, maxImageSize, compressionLevel).then((newFile) => resolve(newFile));
        }, mimetype, compressionLevel);
      };

      img.src = reader.result;
    }, false);

    reader.readAsDataURL(file);
  });
}
