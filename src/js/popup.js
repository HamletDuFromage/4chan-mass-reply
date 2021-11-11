function onCreated(tab) {
    console.log("tg");
}

function onError(error) {
    console.log(`Error: ${error}`);
}

let shitposts = [];

// fill the <p> with the quotes
function fillField(textData) {
    // The innerHTML is only done on the popup, not on actual webpages
    if (textData === "prends tes médocs") {
        var updating = browser.tabs.update({
            url: "https://www.reddit.com/r/france/",
            pinned: true
        });
        updating.then(onCreated, onError);
    }
    else {
        document.getElementById("textField").value = textData;
    }
}

// listn to copy button
document.getElementById('copy').addEventListener("click", (e) => {
    function updateClipboard() {
        var newClip = document.getElementById("textField").value;
        if (newClip !== "" && newClip !== "sneed" && newClip !== "This is not a recongized 4chan thread") {
            navigator.clipboard.writeText(newClip);
        }
    }

    console.log("Copying to clipboard");
    browser.tabs.query({ active: true, currentWindow: true })
        .then(updateClipboard)
        .catch(reportError);
});

// listen to checkbox events
function onGot(name, item) {
    document.getElementById(name).checked = item[name];
}
for (const button of ["bttm", "anonymize", "bypassfilter", "nocookie"]) {
    document.getElementById(button).onclick = function () {
        browser.storage.local.set({
            [this.name]: this.checked
        }).then(console.log(`storage updated`), onError);
    };

    let buttonGettingState = browser.storage.local.get(button);
    buttonGettingState.then(onGot.bind(null, button), onError);
}

// load and store mass-reply format
document.getElementById('format').addEventListener('change', (evt) => {
    const value = document.getElementById('format').value;
    browser.storage.local.set({
        format: value,
    }).then(console.log(`storage updated`), onError);
});
let formatGettingState = browser.storage.local.get('format');
formatGettingState.then((stor) => {
    if (stor && stor.format) {
        document.getElementById('format').value = stor.format;
    }
}, onError);

// load shitposts and populate select
document.getElementById('shitpost-entry').addEventListener('change', (evt) => {
    const value = document.getElementById('shitpost-entry').value;
    for (let i = 0; i < shitposts.length; i++) {
        const name = shitposts[i].name;
        if (name === value) {
          fillField(shitposts[i].content);
          return;
        }
    }
});
browser.storage.local.get(['shitposts', 'selectedsp']).then((item) => {
    const selected =(item.hasOwnProperty('selectedsp')) ? item.selectedsp : 'Contribute';
    if (item.hasOwnProperty('shitposts')) {
        shitposts = JSON.parse(item.shitposts);
        if (!shitposts.length) return;
        const select = document.getElementById('shitpost-entry');
        select.innerHTML = '';
        for (let i = 0; i < shitposts.length; i++) {
            const opt = document.createElement('option');
            const name = shitposts[i].name;
            opt.innerHTML = opt.value = name;
            select.appendChild(opt);
            if (name === selected) {
              select.value = name;
            }
        }
    }
}, (error) => { console.log(`Error: ${error}`); });
