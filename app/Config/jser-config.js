"use strict";
var config = {};
Object.defineProperties(config, {
    "jserDirPath": {
        get: function () {
            return window.localStorage.getItem("dir-path");
        },
        set: function (value) {
            window.localStorage.setItem("dir-path", value);
        }
    }
});
module.exports = config;
