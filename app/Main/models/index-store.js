/**
 * Created by azu on 2014/09/17.
 * LICENSE : MIT
 */
"use strict";
var fs = require("fs");
var findWithDate = require("./index-finder");
// index.jsonを保持する
var store = {};
store.currentIndexPath = "";
store.loadAtDate = function (monthDate) {
    this.currentIndexPath = findWithDate(monthDate);
    return require(this.currentIndexPath);
};
store.save = function (indexObject) {
    var serialized = JSON.stringify(indexObject, null, 4);
    fs.writeFileSync(this.currentIndexPath, serialized);
};

module.exports = store;