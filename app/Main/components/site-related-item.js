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
    init: function () {
        var ractive = this;
        this.on("edit", function (event) {
            event.original.preventDefault();
            ractive.set("editingURL", event.context.url);
            // input
            var input = ractive.find(".related-link-edit");
            input.value = JSON.stringify(event.context);
        });
        function leaveEdit(node) {
            ractive.set("editingURL", null);
            // parase
            var result = "";
            try {
                result = JSON.parse(node.value);
            } catch (e) {
                ractive.fire(events.removeRelatedItem, ractive);
                return window.alert("Please input object data");
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
    template: require("fs").readFileSync(__dirname + "/site-related-item.hbs", "utf-8")
});

module.exports.events = events;