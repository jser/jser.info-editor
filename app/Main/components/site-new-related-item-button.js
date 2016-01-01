"use strict";
var Ractive = require("ractive");
var events = {
    insertNewRelatedItem: "insertNewRelatedItem"
};
module.exports = Ractive.extend({
    template: require("load-template")(__filename + ".hbs")
});
module.exports.events = events;