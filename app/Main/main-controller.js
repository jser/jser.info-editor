/**
 * Created by azu on 2014/09/17.
 * LICENSE : MIT
 */
"use strict";

var store = require("./models/index-store");
var Ractive = require("ractive");
var ractive = new Ractive({
    el: '#js-sidebar',
    template: require("fs").readFileSync(__dirname + "/Views/main-sidebar.hbs", "utf-8"),
    components: {
        "sidebarItem": require("./components/main-sidebar-component")
    },
    data: store.loadAtDate(new Date)

});
ractive.observe('list', function (newValue, oldValue, keypath) {
    console.log(keypath);
});
