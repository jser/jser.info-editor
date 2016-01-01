"use strict";
var Ractive = require("ractive");
var CodeMirror = window.CodeMirror;
var registerSpellDictionary = window.registerSpellDictionary;
var relatedItem = require("./site-related-item");
var newRelatedItem = require("./site-new-related-item-button");
var DictionaryStore = require("../models/dictionary-store");
var dictionaryStore = new DictionaryStore();
var createValidator = require("codemirror-textlint");
var presetJa = require("textlint-rule-preset-japanese");
var textlintValidator = createValidator({
    rules: presetJa.rules,
    rulesConfig: presetJa.rulesConfig
});
function getDictionary(callback) {
    var http = require('http');
    var url = 'http://azu.github.io/technical-word-rules/all.json';
    http.get(url, function (res) {
        var body = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            var ret = JSON.parse(body);
            callback(null, ret);
        });
    }).on('error', function (e) {
        callback(e);
    });
}
// 初期化
getDictionary(function (error, result) {
    if (error) {
        return console.error(error);
    }
    dictionaryStore.save(result);
});
var loadTemplate = require("../../lib/load-template");
module.exports = Ractive.extend({
    data: {
        isEditing: false
    },
    onrender: function () {
        var ractive = this;

        function saveEditContent(text) {
            ractive.set({
                "content": text,
                "isEditing": false
            });
        }

        this.on("relatedItem." + relatedItem.events.removeRelatedItem, function (index) {
            ractive.splice("relatedLinks", index, 1);
        });
        this.on("newRelatedItem." + newRelatedItem.events.insertNewRelatedItem, function (event) {
            ractive.push("relatedLinks", {
                "title": "dummy",
                "url": "http://dummy"
            }).then(function () {
                var addedItem = ractive.findAllComponents("relatedItem").pop();
                addedItem.editItem(addedItem.get());
            });
        });
        this.on('edit', function (event) {
            ractive.set("isEditing", true);
            var placeholder = ractive.find(".placeholder-editor");
            var myCodeMirror = CodeMirror.fromTextArea(placeholder, {
                lineNumbers: true,
                mode: "gfm",
                lineWrapping: true,
                gutters: ["CodeMirror-lint-markers"],
                lint: {
                    "getAnnotations": textlintValidator,
                    "async": true
                }
            });
            var originalContent = ractive.get("content");
            myCodeMirror.setValue(originalContent);
            myCodeMirror.addKeyMap({
                "Ctrl-Enter": function (cm) {
                    saveEditContent(cm.getValue());
                    cm.toTextArea()
                },
                "Cmd-Enter": function (cm) {
                    saveEditContent(cm.getValue());
                    cm.toTextArea();
                },
                "Esc": function (cm) {
                    saveEditContent(originalContent);
                    cm.toTextArea();
                }
            });
        });
    },

    components: {
        "relatedItem": relatedItem,
        "newRelatedItem": newRelatedItem
    },
    template: loadTemplate(__filename + ".hbs"),
    css: loadTemplate(__filename + ".css")
});
