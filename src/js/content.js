/* Anonymization code by https://github.com/pixelplanetdev, public domain */

function spotKym(element, fourchanx) {
    let filenameDOMs = null;
    if (fourchanx) {
        filenameDOMs = element.querySelectorAll('div[class~="fileText"] > span[class~="file-info"] > a[target]');
    }
    else {
        filenameDOMs = element.querySelectorAll('div[class~="fileText"] > a[target]');
    }
    for (const filenameDOM of filenameDOMs) {
        if (/^\b\w{3}\./.test(filenameDOM.textContent)) {
            filenameDOM.style.backgroundColor = "#FDFF47";
        }
    }
}

function hideQr(element, fourchanx) {
    if (fourchanx) {
        element.querySelector('body[id="qr"]').style.visibility = "hidden";
    }
}

function isFileInput(e) {
    return (typeof e.type !== 'undefined' && /file(?:s)?/i.test(e.type));
}

function createFileList(a) {
    a = [].slice.call(Array.isArray(a) ? a : arguments)
    for (var c, b = c = a.length, d = !0; b-- && d;) d = a[b] instanceof File
    if (!d) throw new TypeError('expected argument to FileList is File or array of File objects')
    for (b = (new ClipboardEvent('')).clipboardData || new DataTransfer; c--;) b.items.add(a[c])
    return b.files
}

function getFilename() {
    var curtime = new Date().getTime();
    return curtime - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000);
}

function fileNameChange() {
    var element = this;
    var mimetype = element.files[0].type;
    var filename = getFilename() + '.' + element.files[0].name.split('.')[1];
    //change name and write element first immediately because fast responding sites
    //would not catch after hash change
    var file = new File([element.files[0]], filename, { type: mimetype });
    element.files = createFileList(file);
    console.log("Change filename to " + filename);
    if (mimetype == 'image/png' || mimetype == 'image/jpeg' || mimetype == 'image/webp') {
        var reader = new FileReader();
        reader.addEventListener("load", function () {
            var imgs = new Image();
            imgs.src = reader.result;
            imgs.onload = function () {
                var cvs = document.createElement('canvas');
                cvs.width = imgs.naturalWidth;
                cvs.height = imgs.naturalHeight;
                var canvas = cvs.getContext("2d");
                console.log("Change Imagehash");
                canvas.drawImage(imgs, 0, 0);
                canvas.fillStyle = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ",255)";
                canvas.fillRect(Math.floor(Math.random() * cvs.width), Math.floor(Math.random() * cvs.height), 1, 1);
                var newImageData = cvs.toBlob(function (blob) {
                    file = new File([blob], filename, { type: mimetype });
                    element.files = createFileList(file);
                }, 'image/jpeg', 0.9);
            }
        }, false)
        reader.readAsDataURL(element.files[0]);
    }
}

function addNameChangeEvent(element, anonymize) {
    if (anonymize) {
        element.addEventListener('change', fileNameChange);
    }
    else {
        element.removeEventListener('change', fileNameChange);
    }
}

function mutationChange(mutations, fourchanx, anonymize) {
    console.log(anonymize);
    mutations.forEach((mutation) => {
        var nodes = mutation.addedNodes;
        for (var n = 0; n < nodes.length && anonymize; n++) {
            spotKym(nodes[n], fourchanx);
            if (isFileInput(nodes[n])) {
                //if element itself is input=file
                addNameChangeEvent(nodes[n], anonymize);
            }
            else {
                //search child nodes for input=file
                var nodesl = nodes[n].getElementsByTagName("input");
                for (var i = 0; i < nodesl.length && anonymize; i++) {
                    if (isFileInput(nodesl[i])) {
                        addNameChangeEvent(nodesl[i], anonymize);
                    }
                }
            }
        }
    });
};

(function () {
    const fourchanx = document.querySelector('html[class~="fourchan-x"') === null ? false : true;
    var anonymize = false;
    browser.storage.onChanged.addListener((changes, area) => {
        if (changes.hasOwnProperty("anonymize")) {
            anonymize = changes["anonymize"].newValue;
            let inputs = document.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++) {
                if (isFileInput(inputs[i])) {
                    addNameChangeEvent(inputs[i], anonymize);
                }
            }
        }
    });
    browser.storage.local.get("anonymize").then((item) => {
        anonymize = item.anonymize;
        spotKym(document, fourchanx);
        let inputs = document.getElementsByTagName('input');
        for (var i = 0; i < inputs.length && anonymize; i++) {
            if (isFileInput(inputs[i])) {
                addNameChangeEvent(inputs[i], anonymize);
            }
        }
        let observer = new MutationObserver((mutations) => { mutationChange(mutations, fourchanx, anonymize); });
        observer.observe(document, { childList: true, subtree: true });
    }, (error) => { console.log(`Error: ${error}`); });
})();