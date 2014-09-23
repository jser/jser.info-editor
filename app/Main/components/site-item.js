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
            ractive.set("content", text);
            ractive.set("isEditing", false);
        }

        this.on("relatedItem." + relatedItem.events.removeRelatedItem, function (node) {
            console.log(node);
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
            myCodeMirror.setValue(event.context.content);
            myCodeMirror.addKeyMap({
                "Ctrl-Enter": function (cm) {
                    saveEditContent(cm.getValue());
                    cm.toTextArea()
                },
                "Cmd-Enter": function (cm) {
                    saveEditContent(cm.getValue());
                    cm.toTextArea();
                }
            });
        });
    },

    components: {
        "relatedItem": relatedItem,
        "newRelatedItem": newRelatedItem
    },
    template: require("fs").readFileSync(__filename + ".hbs", "utf-8"),
    css: require("fs").readFileSync(__filename + ".css", "utf-8")
});
