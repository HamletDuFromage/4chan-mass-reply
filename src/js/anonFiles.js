'use strict';

function getFilename() {
    const curtime = new Date().getTime();
    return curtime - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000);
}

export function anonFilename(file) {
    const filename = getFilename() + '.' + file.name.split('.')[1];
    console.log("Change filename to " + filename);
    return new File([file], filename, { type: file.type });
}

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
