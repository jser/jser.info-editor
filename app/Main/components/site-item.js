"use strict";
var Ractive = require("ractive");
var CodeMirror = require("codemirror");
require('codemirror/mode/markdown/markdown');
var relatedItem = require("./site-related-item");
var newRelatedItem = require("./site-new-related-item-button");
module.exports = Ractive.extend({
    data: {
        isEditing: false
    },
    init: function () {
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
                addedItem.editItem(addedItem.data);
            });
        });
        this.on('edit', function (event) {
            ractive.set("isEditing", true);
            var placeholder = ractive.find(".placeholder-editor");
            var myCodeMirror = CodeMirror.fromTextArea(placeholder, {
                mode: "markdown",
                lineWrapping: true
            });
            var originalContent = event.context.content;
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
    template: require("load-template")(__filename + ".hbs"),
    css: require("load-template")(__filename + ".css")
});
