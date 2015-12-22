// LICENSE : MIT
"use strict";
var DICTIONARY_STORE_PATH = "DICTIONARY_STORE_PATH";
var fs = require("fs");
var DictionaryStore = function () {
};
DictionaryStore.prototype.load = function () {
    return require("technical-word-rules");
};
DictionaryStore.prototype.save = function (newDict) {
    var serialized = JSON.stringify(newDict);
    var allJSONPath = require.resolve("technical-word-rules");
    fs.writeFileSync(allJSONPath, serialized, "utf-8");
};

module.exports = DictionaryStore;