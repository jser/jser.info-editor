"use strict";
var path = require("path");
var store = require("./models/index-store");
function commit(message) {

}
var commitButton = document.getElementById("js-commit-button");
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

});