"use strict";
var gitPush = require("../local/git-push");
var pushButton = document.getElementById("js-push-button");
var NotificationWrapper = require("../lib/node-webkit-notification");
pushButton.addEventListener("click", function () {
    gitPush(function (error) {
        if (error) {
            new NotificationWrapper(
                '#',    // image icon path goes here
                "Error!",
                error
            );
            console.log(error);
            return
        }
        new NotificationWrapper(
            '#',    // image icon path goes here
            "git push!"
        );
    });
});