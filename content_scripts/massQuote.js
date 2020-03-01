
(function() {

    browser.runtime.onMessage.addListener((message) => {
        
        var str = "";
        if (message.command === "massQuote") {
            
            var posts = document.getElementsByClassName("postContainer");
            for (var i = 0; i < posts.length; i++) {
                str += ">>" + posts[i].id.substring(2) + "<br>";
            
            }
        } 
        if(message.action === "Sneed"){
            str+= "sneed";
        }
        browser.runtime.sendMessage(str);  
        //str = "";
      });

})();