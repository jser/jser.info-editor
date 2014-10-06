"use strict";
var config = {};
var Store = require("local-store");
var jserStore = Store("jser");

Object.defineProperties(config, {
    "jserDirPath": {
        get: function () {
            return localStorage.getItem("dir-path");
        },
        set: function (value) {
            localStorage.setItem("dir-path", value);
        }
    }
});
module.exports = config;
