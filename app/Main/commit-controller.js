"use strict";
var path = require("path");
var store = require("./models/index-store");
var gitCommit = require("../local/git-commit");
var commitButton = document.getElementById("js-commit-button");
var NotificationWrapper = require("node-webkit-notification");
commitButton.addEventListener("click", function () {
    var indexPath = store.currentIndexPath;
    var fileName = path.dirname(indexPath);
    var match = fileName.match(/\/(\d{4})\/(\d{2})$/);
    var fileAttr = {
        year: match[1],
        month: match[2],
        name: path.basename(indexPath)
    };
    var commitMessage = "Update: " + fileAttr.year + "/" + fileAttr.month + "/" + fileAttr.name;
    gitCommit(indexPath, commitMessage)
        .on('end', function () {
            new NotificationWrapper(
                '#',    // image icon path goes here
                "Commit!"
            );
        })
        .on('error', function (error) {
            new NotificationWrapper(
                '#',    // image icon path goes here
                "Error!",
                error
            );
            console.log(error);
        });
});