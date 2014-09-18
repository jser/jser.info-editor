var Ractive = require("ractive");
var template = require("fs").readFileSync(__dirname + "/view/config-form.hbs", "utf-8");
var viewModel = require("./view/config-viewModel");
var ractive = new Ractive({
    el: '#js-config-form',
    template: template,
    data: viewModel
});
ractive.observe('*', function (newValue, oldValue, keypath) {
    viewModel[keypath] = newValue;
});