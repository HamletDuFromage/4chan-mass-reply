function fillField(textData){
    document.getElementById("textField").innerHTML = textData;
}

function listenForClicks() {
    document.addEventListener("click", (e) => {

        //function
        
        function updateClipboard() {
            var newClip = document.getElementById("textField").innerText;

            if (newClip !== "" && newClip !== "sneed"){
                navigator.clipboard.writeText(newClip);
            }
            /*
            //navigator.permissions.query({name: "clipboard-write"}).then(result => {
                //if (result.state == "granted" || result.state == "prompt") {
                    navigator.clipboard.writeText(newClip).then(function() {
                        
                    }, function() {
                        
                    });
                //}
            //});
            */
        }
        
        function copyQuote() {
            copyToClipBoard("lol");
        }

        function hide(tabs) {
            browser.tabs.insertCSS({code: hidePage});
        }
        function massQuote(tabs) {
            
            browser.tabs.sendMessage(tabs[0].id, {
                command: "massQuote",
                action: e.target.textContent
            });

        }
        function reportError(error) {
            console.error(`Could not mass quote: ${error}`);
        }

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
    console.error(`Failed to execute bmassQuote content script: ${error.message}`);
}


browser.tabs.executeScript({file: "/content_scripts/massQuote.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);

function handleMessage(message, sender, sendResponse){
    fillField(message); 
  }

browser.runtime.onMessage.addListener(handleMessage)
