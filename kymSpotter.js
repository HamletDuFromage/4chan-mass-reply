function spotKym() {
    let fourchanx = document.querySelector('html[class~="fourchan-x"') === null ? false : true;
    let filenameDOMs = null;
    if (fourchanx) {
        filenameDOMs = document.querySelectorAll('div[class~="fileText"] > span[class~="file-info"] > a[target]');
    }
    else {
        filenameDOMs = document.querySelectorAll('div[class~="fileText"] > a[target]');
    }
    for (const filenameDOM of filenameDOMs) {
        if (/^\b\w{3}\./.test(filenameDOM.textContent)) {
            filenameDOM.style.backgroundColor = "#FDFF47";
        }
    }
}

(function () {
    var observer = new MutationObserver(function (mutations, me) {
        spotKym();
    });
    observer.observe(document, { childList: true, subtree: true });
})();