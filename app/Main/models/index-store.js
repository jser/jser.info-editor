/**
 * Created by azu on 2014/09/17.
 * LICENSE : MIT
 */
"use strict";
var fs = require("fs");
var findWithDate = require("./index-finder");
// index.jsonを保持する
var currentIndexPath = [];
var store = {};
store.loadAtDate = function (monthDate) {
    currentIndexPath = findWithDate(monthDate);
    return require(currentIndexPath);
};
store.save = function (indexObject) {
    var serialized = JSON.stringify(indexObject, null, 4);
    fs.writeFileSync(currentIndexPath, serialized);
};

module.exports = store;