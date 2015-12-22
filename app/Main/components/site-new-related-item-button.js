"use strict";
var Ractive = require("ractive");
var events = {
    insertNewRelatedItem: "insertNewRelatedItem"
};
var loadTemplate = require("../../lib/load-template");
module.exports = Ractive.extend({
    init: function () {
    },
    template: loadTemplate(__filename + ".hbs")
});
module.exports.events = events;