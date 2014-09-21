"use strict";
var Ractive = require("ractive");
var events = {
    insertNewRelatedItem: "insertNewRelatedItem"
};
module.exports = Ractive.extend({
    init: function () {
    },
    template: require("fs").readFileSync(__filename + ".hbs", "utf-8")
});
module.exports.events = events;