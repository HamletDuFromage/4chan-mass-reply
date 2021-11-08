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
        if (header.name.toLowerCase() === "cookie") {
            header.value = "4chan_pass=" + randomString(124);
        }
    }
    return { requestHeaders: item.requestHeaders };
}

function setCookieSpoofingState(nocookie, isFirefox) {
    if (nocookie) {
        let extraInfo = isFirefox ? ["blocking", "requestHeaders"] : ["blocking", "requestHeaders", "extraHeaders"];
        browser.webRequest.onBeforeSendHeaders.addListener(spoofCookie, { urls: ["*://sys.4channel.org/*/post", "*://sys.4chan.org/*/post"] }, extraInfo);
    }
    else {
        browser.webRequest.onBeforeSendHeaders.removeListener(spoofCookie);
    }
}

(function () {
    let nocookie = false;
    isFirefox = browser.runtime.getBrowserInfo;
    browser.storage.local.get("nocookie").then((item) => {
        nocookie = item.hasOwnProperty("nocookie") ? item.nocookie : nocookie;
        setCookieSpoofingState(nocookie, isFirefox);
    }, (error) => { console.log(`Error: ${error}`); });

    browser.storage.onChanged.addListener((changes, area) => {
        if (changes.hasOwnProperty("nocookie")) {
            nocookie = changes["nocookie"].newValue;
            setCookieSpoofingState(nocookie, isFirefox);
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
})();