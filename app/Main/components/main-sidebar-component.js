"use strict";
var Ractive = require("ractive");
var CodeMirror = require("codemirror");
require('codemirror/mode/markdown/markdown');
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

        this.on('edit', function (event) {
            console.log(ractive);
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
    template: require("fs").readFileSync(__dirname + "/main-sidebar-item.hbs", "utf-8"),
    css: require("fs").readFileSync(__dirname + "/main-sidebar-item.css", "utf-8")
});
