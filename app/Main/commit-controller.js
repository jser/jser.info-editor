"use strict";
var path = require("path");
var store = require("./models/index-store");
var gitCommit = require("../local/git-commit");
var commitButton = document.getElementById("js-commit-button");
var map = require('map-stream');
var log = function (file, cb) {
    if (file instanceof Error) {
        return cb(file);
    }
    new Notification("Commit!");
    cb(null, file);
};

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
        .pipe(map(log));
});