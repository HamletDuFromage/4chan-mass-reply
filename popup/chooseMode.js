// fill the <p> with the quotes
function fillField(textData){
    // The innerHTML is only done on the popup, not on actual webpages
    document.getElementById("textField").innerHTML = textData;
}



function listenForClicks() {
    document.addEventListener("click", (e) => {

        function updateClipboard() {
            var newClip = document.getElementById("textField").innerText;

            if (newClip !== "" && newClip !== "sneed" && newClip !== "This is not a recongized 4chan thread"){
                navigator.clipboard.writeText(newClip);
            }
        }
        
        function copyQuote() {
            copyToClipBoard("lol");
        }

        function hide(tabs) {
            browser.tabs.insertCSS({code: hidePage});
        }
        function massQuote(tabs) {
            
            // send a message with the kind of quote that must be performed
            browser.tabs.sendMessage(tabs[0].id, {
                command: "massQuote",
                action: e.target.textContent,
                selected: document.getElementById("shitpost").value,
                bttm : document.getElementById("bttm").checked
            });
        }
        function reportError(error) {
            console.error(`Could not mass quote: ${error}`);
        }

        // Check if buttons are clicked
        if (e.target.classList.contains("action")) {
            
            browser.tabs.query({active: true, currentWindow: true})
              .then(massQuote)
              .catch(reportError);
        }

        else if (e.target.classList.contains("copy")) {
            browser.tabs.query({active: true, currentWindow: true})
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

function setItem() {
    console.log("storage updated");
}

function onGot(item) {
    document.getElementById("bttm").checked = item.checkBoxState.value;
}
  
function onError(error) {
    console.log(`Error: ${error}`);
}

document.getElementById("bttm").onclick = function() {
    browser.storage.local.set({
        checkBoxState : {value:this.checked}
    }).then(setItem, onError);
};

let gettingState = browser.storage.local.get("checkBoxState");
gettingState.then(onGot, onError);


browser.tabs.executeScript({file: "/content_scripts/massQuote.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);

function handleMessage(message, sender, sendResponse){
    fillField(message); 
  }

// get the message from contents
browser.runtime.onMessage.addListener(handleMessage)
