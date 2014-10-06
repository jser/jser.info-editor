"use strict";
var gitPush = require("../local/git-push");
var pushButton = document.getElementById("js-push-button");
var NotificationWrapper = require("node-webkit-notification");
pushButton.addEventListener("click", function () {
    console.log("push");
    gitPush().on('end', function () {
        new NotificationWrapper(
            '#',    // image icon path goes here
            "Commit!"
        );
    }).on('error', function (error) {
        new NotificationWrapper(
            '#',    // image icon path goes here
            "Error!",
            error
        );
        console.log(error);
    });
});