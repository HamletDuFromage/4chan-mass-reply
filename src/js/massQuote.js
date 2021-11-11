'use strict';

import createQuotes from './createQuotes';

(function () {
    chrome.runtime.onMessage.addListener((message) => {
        if (message.command != "massQuote") {
            return;
        }

        const str = createQuotes(message.action, message.format, message.bttm);
        if (str != "") { chrome.runtime.sendMessage(str); }
    });

})();
