function DeviceDetector() {
    var screenWidth = 720;
    var agent = navigator.userAgent.toLowerCase();
    this.ScreenWidth = function(value) {
        "use strict";
        if (!arguments.length) return screenWidth;
        else screenWidth = value;
    };
    this.detectUserAgent = function() {
        "use strict";
        var keywords = ["android", "blackberry", "iphone", "ipad", "ipod", "opera mini", "opera mobi", "iemobile"];
        var counter = 0;
        var indicator = false;
        while (!indicator && counter < keywords.length) {
            if (agent.match(new RegExp(keywords[counter], "ig"))) {
                indicator = true;
            } else counter++;
        }
        return indicator;
    };
    this.detectScreenWidth = function() {
        "use strict";
        var indicator = false;
        var maxValue = Math.max(
            document.body.scrollWidth, document.documentElement.scrollWidth,
            document.body.offsetWidth, document.documentElement.offsetWidth,
            document.body.clientWidth, document.documentElement.clientWidth
        );
        if (maxValue <= screenWidth) indicator = true;
        return indicator;
    };
}