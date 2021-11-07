browser.contextMenus.create({
    id: "rm-cookies",
    title: "Delete cookies",
    documentUrlPatterns: ["*://*.4chan.org/*", "*://*.4channel.org/*"]
});

function onRemoved(cookie) {
    console.log(`Removed: ${cookie}`);
}

function onError(error) {
    console.log(`Error removing cookie: ${error}`);
}

browser.contextMenus.onClicked.addListener(function (info) {
    console.log("4chan-mass-reply context menu");
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

// Works on GET, not POST
browser.webRequest.onBeforeSendHeaders.addListener((item) => {
    for (var header of item.requestHeaders) {
        if (header.name.toLowerCase() === "cookie") {
            console.log(header.value);
            header.value = "4chan_pass=spoofed";
        }
    }
    return { requestHeaders: item.requestHeaders }; 

}, { urls: ["https://boards.4channel.org/*", "https://boards.4chan.org/*"] }, ["blocking", "requestHeaders"]);