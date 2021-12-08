'use strict';

function getFilename() {
    const curtime = new Date().getTime();
    return curtime - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000);
}

/*
 * change filename to random timestamp of the past year
 */
export function anonFilename(file) {
    const filename = getFilename() + '.' + file.name.split('.').slice(-1);
    console.log("Change filename to " + filename);
    return new File([file], filename, { type: file.type });
}

/*
 * changes image hash by adding a random pixel and recompressing
 * also converts webp into png
 */
export function anonHash(file) {
    return new Promise((resolve) => {
        let mimetype = file.type;
        let filename = file.name;
        if (mimetype == 'image/png' || mimetype == 'image/jpeg' || mimetype == 'image/webp') {
            if (mimetype === 'image/webp') mimetype = 'image/jpeg';
            const ext = (mimetype === 'image/png') ? 'png' : 'jpg';
            filename = filename.split('.')[0] + '.' + ext;

            const reader = new FileReader();
            reader.addEventListener("load", function () {
                const imgs = new Image();
                imgs.src = reader.result;
                imgs.onload = function () {
                    const cvs = document.createElement('canvas');
                    cvs.width = imgs.naturalWidth;
                    cvs.height = imgs.naturalHeight;
                    const canvas = cvs.getContext("2d");
                    console.log("Change Imagehash");
                    canvas.drawImage(imgs, 0, 0);
                    canvas.fillStyle = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ",255)";
                    canvas.fillRect(Math.floor(Math.random() * cvs.width), Math.floor(Math.random() * cvs.height), 1, 1);
                    const newImageData = cvs.toBlob(function (blob) {
                        file = new File([blob], filename, { type: mimetype });
                        return resolve(file);
                    }, mimetype, 0.9);
                }
            }, false)
            reader.readAsDataURL(file);
        }
    });
}

/*
 * checks if file is within filesize limit,
 * recompresses into jpg if not.
 * If jpeg is still too large, reduce it's compression level till it fits
 */
export function checkFilesize(file, maxImageSize, compressionLevel) {
    return new Promise((resolve) => {
        if (file.size < maxImageSize) {
            return resolve(file);
        }
        if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/webp') {
            /* not an image */
            return resolve(file);
        }
        console.log(`File size ${file.size} is too large (${maxImageSize})`);
        let newFile = file;
        let cl = compressionLevel || 0.9;
        let filename = file.name;
        const mimetype = 'image/jpeg';
        if (file.type === mimetype) {
            compressionLevel -= 20;
            if (compressionLevel < 5) {
                console.log('Can not reduce filesize further');
                return resolve(file);
            }
            console.log(`Reducing filesize by compressing to jpeg quality ${cl}`);
        } else {
            filename = filename.split('.')[0] + '.' + 'jpg';
            console.log('Reducing filesize by compressing to jpeg');
        }

        const reader = new FileReader();
        reader.addEventListener("load", function () {
            const imgs = new Image();
            imgs.src = reader.result;
            imgs.onload = function () {
                const cvs = document.createElement('canvas');
                cvs.width = imgs.naturalWidth;
                cvs.height = imgs.naturalHeight;
                const canvas = cvs.getContext("2d");
                canvas.drawImage(imgs, 0, 0);
                const newImageData = cvs.toBlob(function (blob) {
                    newFile = new File([blob], filename, { type: mimetype });
                    console.log(`New Filesize: ${newFile.size}`);
                    checkFilesize(newFile, maxImageSize, cl).then((file) => {
                        return resolve(file);
                    });
                }, mimetype, cl);
            }
        }, false)
        reader.readAsDataURL(newFile);
    });
}
