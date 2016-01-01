"use strict";
// 関連するサイトのコンポーネント
"use strict";
var Ractive = require("ractive");
var events = {
    "removeRelatedItem": "removeRelatedItem"
};
module.exports = Ractive.extend({
    data: {
        editingURL: null
    },
    editItem: function (context) {
        this.set("editingURL", true);
        // input
        var input = this.find(".related-link-edit");
        input.value = JSON.stringify({
            title: context.title,
            url: context.url
        });
    },
    onrender: function () {
        var ractive = this;
        this.on("edit", function (event) {
            event.original.preventDefault();
            this.editItem(ractive.get());
        });
        function leaveEdit(node) {
            ractive.set("editingURL", false);
            // parase
            var result = "";
            try {
                result = JSON.parse(node.value);
            } catch (e) {
                ractive.fire(events.removeRelatedItem, ractive.get("index"));
                return;
            }
            ractive.set("title", result.title);
            ractive.set("url", result.url);
        }

        this.on("keydown", function (event) {
            if (event.original.keyCode === 13) {
                leaveEdit(event.node);
            }
        });
    },
    template: require("load-template")(__filename + ".hbs")
});

module.exports.events = events;