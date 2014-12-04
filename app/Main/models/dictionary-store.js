// LICENSE : MIT
"use strict";
var DICTIONARY_STORE_PATH = "DICTIONARY_STORE_PATH";

var DictionaryStore = function () {
};
DictionaryStore.prototype.load = function () {
    var data = window.localStorage.getItem(DICTIONARY_STORE_PATH);
    return data != null ? JSON.parse(data) : require("technical-word-rules");
};
DictionaryStore.prototype.save = function (newDict) {
    var serialized = JSON.stringify(newDict);
    window.localStorage.setItem(DICTIONARY_STORE_PATH, serialized);
};

module.exports = DictionaryStore;