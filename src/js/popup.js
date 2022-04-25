'use strict';

const cpurl = 'https://raw.githubusercontent.com/HamletDuFromage/4chan-mass-reply/master/copypastas.json';

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
(function () {
    function valueUpdated(key, value) {
        if (key === 'showbtns') {
            document.getElementById('btnsFieldset').disabled = !value;
        }
    }

    /*
     * default values, make sure its the same as in content.js
     */
    browser.storage.local.get({
        "anonymize": false,
        "nocookie": true,
        "bypassfilter": true,
        "slidecapt": false,
        "reuse": false,
        "showbtns": true,
        "bttm": false,
    }).then((localstore) => {
        const keys = Object.keys(localstore);
        for (let i = 0; i < keys.length; i++) {
            const button = keys[i];
            document.getElementById(button).onclick = function (evt) {
                valueUpdated(evt.target.name, evt.target.checked);
                browser.storage.local.set({
                    [evt.target.name]: evt.target.checked
                }).then(console.log(`storage updated`), onError);
            };
            valueUpdated(button, localstore[button]);
            document.getElementById(button).checked = localstore[button];
        }
    });
})()

// load and store mass-reply format
document.getElementById('format').addEventListener('change', (evt) => {
    const value = evt.target.value;
    browser.storage.local.set({
        format: value,
    }).then(console.log(`storage updated`), onError);
});
browser.storage.local.get({ format: 'single' }).then((item) => {
    document.getElementById('format').value = item.format;
});

// load selected shitpost into textarea
document.getElementById('shitpost-entry').addEventListener('change', (evt) => {
    const value = evt.target.value;
    for (let i = 0; i < shitposts.length; i++) {
        const name = shitposts[i].name;
        if (name === value) {
            fillField(shitposts[i].content);
            return;
        }
    }
});

// populate shitposts into select
function parseShitposts(shitpostsJson) {
    shitposts = [];
    shitposts = JSON.parse(shitpostsJson);
    if (!shitposts.length) return;
    const select = document.getElementById('shitpost-entry');
    const selected = select.value;
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    for (let i = 0; i < shitposts.length; i++) {
        const opt = document.createElement('option');
        const name = shitposts[i].name;
        opt.textContent = opt.value = name;
        select.appendChild(opt);
        if (name === selected) {
            select.value = name;
        }
    }
};

browser.storage.local.get({
    "cpurl": cpurl,
    "shitposts": null,
    "selectedsp": 'Contribute',
}).then((item) => {
    const selected = item.selectedsp;
    if (item.shitposts) {
        parseShitposts(item.shitposts);
    }
    document.getElementById('cpurl').value = item.cpurl;
}, (error) => { console.log(`Error: ${error}`); });

browser.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') {
        return;
    }
    if (changes.shitposts) {
        parseShitposts(changes.shitposts.newValue);
    }
});

function sendMessage(messageType) {
    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(tabs => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: messageType
        }).then(response => {
            fillField(response.response);
        });
    });
}

// buttons to get mass quotes
for (let messageType of ["regular", "sneed", "dubs"]) {
    document.getElementById(messageType).onclick = () => {
        sendMessage(messageType);
    }
}

// button to show cpurl input
document.getElementById('showurl').onclick = (evt) => {
    const divUrl = document.getElementById('divurl');
    if (divUrl.classList.contains('hidden')) {
        divUrl.classList.remove('hidden');
        evt.target.classList.add('selected');
    }
    else {
        divUrl.classList.add('hidden');
        evt.target.classList.remove('selected');
    }
}

// ok button to save entered cpurl
document.getElementById('urlok').onclick = () => {
    let url = document.getElementById('cpurl').value;
    if (!url.trim()) {
        url = cpurl;
        document.getElementById('cpurl').value = cpurl;
    }
    browser.storage.local.set({ cpurl: url });
}
