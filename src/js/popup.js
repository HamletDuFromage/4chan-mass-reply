function onCreated(tab) {
    console.log("tg");
}
function onError(error) {
    console.log(`Error: ${error}`);
}
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
                selected: document.getElementById("shitpost").value,
                bttm: document.getElementById("bttm").checked,
                format: document.getElementById("format").checked
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

for (const button of ["format", "bttm"]) {
    document.getElementById(button).onclick = function () {
        browser.storage.local.set({
            [this.name]: this.checked
        }).then(console.log(`storage updated`), onError);
    };

    let buttonGettingState = browser.storage.local.get(button);
    buttonGettingState.then(onGot.bind(null, button), onError);
}

browser.tabs.executeScript({ file: "/js/massQuote.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);

function handleMessage(message, sender, sendResponse) {
    fillField(message);
}

// get the message from contents
browser.runtime.onMessage.addListener(handleMessage)
