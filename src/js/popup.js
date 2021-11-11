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
        document.getElementById("textField").innerHTML = textData;
    }
}

function listenForClicks() {
    document.addEventListener("click", (e) => {
        function updateClipboard() {
            var newClip = document.getElementById("textField").innerText;
            if (newClip !== "" && newClip !== "sneed" && newClip !== "This is not a recongized 4chan thread") {
                navigator.clipboard.writeText(newClip);
            }
        }

        function sendQuoteInstruction(tabs) {
            // send a message with the kind of quote that must be performed
            browser.tabs.sendMessage(tabs[0].id, {
                command: "massQuote",
                action: e.target.id,
                bttm: document.getElementById("bttm").checked,
                format: document.getElementById("format").value,
            });
        }
        function reportError(error) {
            console.error(`Could not mass quote: ${error}`);
        }

        // Check if buttons are clicked
        if (e.target.classList.contains("action")) {
            browser.tabs.query({ active: true, currentWindow: true })
                .then(sendQuoteInstruction)
                .catch(reportError);
        }

        else if (e.target.id === "copy") {
            console.log("Copying to clipboard");
            browser.tabs.query({ active: true, currentWindow: true })
                .then(updateClipboard)
                .catch(reportError);
        }
    });
}

function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute massQuote content script: ${error.message}`);
}

function onGot(name, item) {
    document.getElementById(name).checked = item[name];
}
// listen to checkbox events
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

browser.tabs.executeScript({ file: "/js/massQuote.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);

function handleMessage(message, sender, sendResponse) {
    fillField(message);
}

// get the message from contents
browser.runtime.onMessage.addListener(handleMessage)
