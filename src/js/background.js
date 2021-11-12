'use strict';

// url of JSON with copypastas
const url = 'https://raw.githubusercontent.com/pixelplanetdev/4chan-mass-reply/master/copypastas.json';

browser.contextMenus.create({
    id: "rm-cookies",
    title: "Delete cookies",
    documentUrlPatterns: ["*://*.4chan.org/*", "*://*.4channel.org/*"]
});

function onRemoved(cookie) {
    console.log(`Removed cookie: ${cookie}`);
}

function onError(error) {
    console.log(`Error removing cookie: ${error}`);
}

function randomString(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function spoofCookie(item) {
    console.log("spoofing cookies!");
    for (var header of item.requestHeaders) {
        switch (header.name.toLowerCase()) {
            case 'cookie': {
                header.value = "4chan_pass=" + randomString(124);
                break;
            }
            case 'user-agent': {
                let newValue = '';
                // randomly increase every integer in user-agent
                // don't decrease cause that could get you blocked
                for (let c = 0; c < header.value.length; c++) {
                    const curChar = header.value.charAt(c);
                    const curNum = parseInt(curChar);
                    if (Number.isNaN(curNum)) {
                        newValue += curChar;
                    }
                    else {
                        newValue += String(curNum
                            + Math.floor(Math.random() * (10 - curNum)
                        ));
                    }
                }
                header.value = newValue;
                break;
            }
        }
    }
    return { requestHeaders: item.requestHeaders };
}

function setCookieSpoofingState(nocookie) {
    if (nocookie) {
        const extraInfo = ["blocking", "requestHeaders", "extraHeaders"];
        browser.webRequest.onBeforeSendHeaders.addListener(spoofCookie, { urls: ["*://sys.4channel.org/*/post", "*://sys.4chan.org/*/post"] }, extraInfo);
    }
    else {
        browser.webRequest.onBeforeSendHeaders.removeListener(spoofCookie);
    }
}

(function () {
    let nocookie = false;

    browser.storage.local.get("nocookie").then((item) => {
        nocookie = item.hasOwnProperty("nocookie") ? item.nocookie : nocookie;
        setCookieSpoofingState(nocookie);
    }, (error) => { console.log(`Error: ${error}`); });

    browser.storage.onChanged.addListener((changes, area) => {
        if (changes.hasOwnProperty("nocookie")) {
            nocookie = changes["nocookie"].newValue;
            setCookieSpoofingState(nocookie);
        }
    });

    browser.contextMenus.onClicked.addListener(function (info) {
        if (info.menuItemId == "rm-cookies") {
            for (const url of ["https://4channel.org", "https://4chan.org"])
                browser.cookies.getAll({ url: url })
                    .then(function (cookies) {
                        return Promise.all(cookies.map(function (cookie) {
                            return browser.cookies.remove({ url: url, name: cookie.name });
                        }));
                    })
                    .then(onRemoved, onError);
        }
    });

    fetch(url).then((resp) => {
            if(!resp.ok) {
                throw new Error("HTTP error " + resp.status);
            }
            resp.text().then((txt) => {
                browser.storage.local.set({shitposts: txt});
            });
        }).catch((error) => {
            console.log(`Error fetching shitposts: ${error}`);
        });
})();
