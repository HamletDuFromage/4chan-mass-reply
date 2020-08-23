
(function() {

    browser.runtime.onMessage.addListener((message) => {
        if (message.command != "massQuote") {
            return;
        }

        var maxLines = 100;
        var str = "";
        var url = window.location.href;
        var posts = document.getElementsByClassName("postContainer");
        var postLength = posts[0].id.length;
        var quotesNumber = 166;
        if(url.match(/\/jp/)){quotesNumber = 416;}
        if(url.match(/\/lit/)){quotesNumber = 250;}
        quotesNumber = Math.min(posts.length, quotesNumber);

        if(url.match(/boards.4chann?e?l?.org\/[a-z]+\/thread/))
        {
            if(message.action != "Check 'em")
            {
                var cols = Math.floor(quotesNumber/maxLines);
                var offset = message.bttm * (posts.length - quotesNumber);

                if (cols < 1){
                    for (var i = 0; i < quotesNumber; i++) {
                        str += ">>" + posts[i].id.substring(2, postLength) + "<br>";
                    }
                }
                else{
                    var r = Math.floor((quotesNumber - maxLines)/cols) + 1;
                    for (var i = 0 + offset; i < maxLines - r + offset; i++) {
                        str += ">>" + posts[i].id.substring(2, postLength) + "<br>";
                    }
                    for (var i = maxLines - r + offset; i < quotesNumber + offset; i++){
                        str += ">>" + posts[i].id.substring(2, postLength);
                        if ((i - maxLines - r + offset)%(cols+1) === 0 || i === quotesNumber + offset - 1) {str += "<br>";}
                        else{str += " ";}
                    }
                }
                
                if(message.action === "Sneed"){
                    str+= "sneed";
                }
            }
            else{
                for (var i = 0; i < quotesNumber; i++) {
                    if(posts[i].id.charAt(postLength - 1) === posts[i].id.charAt(postLength - 2)){
                        str += ">>" + posts[i].id.substring(2, postLength) + "<br>";
                    }
                }
            }
        }
        else{str += "This is not a recongized 4chan thread";}
        browser.runtime.sendMessage(str);  
      });

})();