
(function() {

    browser.runtime.onMessage.addListener((message) => {
        var str = "";
        var url = window.location.href;
        if(url.match(/boards.4chann?e?l?.org\/[a-z]+\/thread/))
        {
            if (message.command === "massQuote") {
                var maxLines = 100;
                var posts = document.getElementsByClassName("postContainer");
                var quotesNumber = Math.min(posts.length, 220);
                var cols = Math.floor(quotesNumber/maxLines);

                if (cols < 1){
                    for (var i = 0; i < quotesNumber; i++) {
                        str += ">>" + posts[i].id.substring(2) + "<br>";
                    }
                }
                else{
                    var r = Math.floor((quotesNumber - maxLines)/2) + 1
                    var r = 30;
                    for (var i = 0; i < maxLines - r; i++) {
                        str += ">>" + posts[i].id.substring(2) + "<br>";
                    }
                    for (var i = maxLines - r; i < quotesNumber; i++){
                        str += ">>" + posts[i].id.substring(2);
                        if (i%(cols+1) === 0 || i === quotesNumber - maxLines - r - 1) {str += "<br>";}
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