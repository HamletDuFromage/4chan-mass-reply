
(function() {

    browser.runtime.onMessage.addListener((message) => {
        var maxLines = 100;
        var str = "";
        var url = window.location.href;
        if(url.match(/boards.4chann?e?l?.org\/[a-z]+\/thread/))
        {
            var quotesNumber = 166;
            if(url.match(/\/jp/)){maxQuotes = 416;}
            if(url.match(/\/lit/)){maxQuotes = 250;}

            if (message.command === "massQuote") {
                var posts = document.getElementsByClassName("postContainer");
                quotesNumber = Math.min(posts.length, quotesNumber);
                var cols = Math.floor(quotesNumber/maxLines);
                var offset = message.bttm * (posts.length - quotesNumber);

                if (cols < 1){
                    for (var i = 0; i < quotesNumber; i++) {
                        str += ">>" + posts[i].id.substring(2) + "<br>";
                    }
                }
                else{
                    var r = Math.floor((quotesNumber - maxLines)/cols) + 1;
                    for (var i = 0 + offset; i < maxLines - r + offset; i++) {
                        str += ">>" + posts[i].id.substring(2) + "<br>";
                    }
                    for (var i = maxLines - r + offset; i < quotesNumber + offset; i++){
                        str += ">>" + posts[i].id.substring(2);
                        if ((i - maxLines - r + offset)%(cols+1) === 0 || i === quotesNumber - 1) {str += "<br>";}
                        else{str += " ";}
                    }
                }
            }
            if(message.action === "Sneed"){
                str+= "sneed";
            }
        }
        else{str += "This is not a recongized 4chan thread";}
        browser.runtime.sendMessage(str);  
      });

})();