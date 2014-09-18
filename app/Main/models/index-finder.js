"use strict";
var path = require("path");
var config = require("../../Config/jser-config");
function format0(str, len) {
    return ('_' + Math.pow(10, lemn) + str).slice(-len);
}
/**
 * Return index.json path which find from `Date` object
 * @param {Date} date
 * @returns {string}
 */
function findIndexWithDate(date) {
    var fileDirPath = "data/" + date.getFullYear() + '/' + format0((date.getMonth() + 1), 2);
    return path.join(config.jserDirPath, fileDirPath, "index.json");
}

module.exports = findIndexWithDate;