"use strict";
var config = {};
var Store = require("local-store");
var jserStore = Store("jser");

Object.defineProperties(config, {
    "jserDirPath": {
        get: function () {
            return jserStore.get("dir-path");
        },
        set: function (value) {
            jserStore.set("dir-path", value);
        }
    }
});
module.exports = config;