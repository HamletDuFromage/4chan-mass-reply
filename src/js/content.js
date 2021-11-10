(function () {
    const fourchanx = document.querySelector('html[class~="fourchan-x"') === null ? false : true;
    let anonymize = false;

    function spotKym(element) {
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

    function hideQr(element) {
        if (fourchanx) {
            element.querySelector('body[id="qr"]').style.visibility = "hidden";
        }
    }

    function isFileInput(e) {
        const result = (typeof e.type !== 'undefined'
            && e.nodeType === 1
            && e.tagName.toLowerCase() === 'input'
            && /file(?:s)?/i.test(e.type)
        );
        if (result) {
          console.log('Found file input field', e);
        }
        return result;
    }

    function createFileList(a) {
        a = [].slice.call(Array.isArray(a) ? a : arguments)
        let b = a.length;
        let c = b;
        let d = true;
        while (b-- && d) d = a[b] instanceof File
        if (!d) throw new TypeError('expected argument to FileList is File or array of File objects')
        for (b = (new ClipboardEvent('')).clipboardData || new DataTransfer; c--;) b.items.add(a[c])
        return b.files
    }

    function getFilename() {
        const curtime = new Date().getTime();
        return curtime - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000);
    }

    function anonymizeFile() {
        const element = this;
        if (!anonymize || element.files.length === 0) {
            return;
        }
        let mimetype = element.files[0].type;
        let filename = getFilename() + '.' + element.files[0].name.split('.')[1];
        //change name and write element first immediately because fast responding sites
        //would not catch after hash change
        let file = new File([element.files[0]], filename, { type: mimetype });
        element.files = createFileList(file);
        console.log("Change filename to " + filename);
        //change hash of images
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
                        element.files = createFileList(file);
                    }, mimetype, 0.9);
                }
            }, false)
            reader.readAsDataURL(element.files[0]);
        }
    }

    function checkNodesAndChildNodes(nodes, check) {
        for (let n = 0; n < nodes.length; n++) {
            const node = nodes[n];
            if (check(node)) {
                return node;
            }
            const childNodes = node.childNodes;
            const findChild = checkNodesAndChildNodes(childNodes, check);
            if (findChild) {
                return findChild;
            }
        }
        return null;
    }

    function mutationChange(mutations) {
        mutations.forEach((mutation) => {
            const nodes = mutation.addedNodes;
            for (let n = 0; n < nodes.length; n++) {
                if (isFileInput(nodes[n])) {
                    //if element itself is input=file
                    nodes[n].addEventListener('change', anonymizeFile);
                }
                else if (nodes[n].nodeType === 1) {
                    //search child nodes for input=file
                    const nodesl = nodes[n].getElementsByTagName("input");
                    for (let i = 0; i < nodesl.length; i++) {
                        if (isFileInput(nodesl[i])) {
                            nodesl[i].addEventListener('change', anonymizeFile);
                        }
                    }
                }
            }
        });
    };

    browser.storage.onChanged.addListener((changes, area) => {
        if (changes.hasOwnProperty("anonymize")) {
            anonymize = changes["anonymize"].newValue;
        }
    });

    browser.storage.local.get("anonymize").then((item) => {
        anonymize = item.hasOwnProperty("anonymize") ? item.anonymize : anonymize;
        spotKym(document);
        const inputs = document.getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
            if (isFileInput(inputs[i])) {
                inputs[i].addEventListener('change', anonymizeFile);
            }
        }
        let observer = new MutationObserver((mutations) => { mutationChange(mutations); });
        observer.observe(document, { childList: true, subtree: true });
    }, (error) => { console.log(`Error: ${error}`); });
})();
