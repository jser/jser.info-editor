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
        "sidebarItem": require("./components/site-item")
    },
    /*
    {
        "title": "Journey from browserify to webpack — Medium",
        "url": "https://medium.com/@tomchentw/why-webpack-is-awesome-9691044b6b8e",
        "content": "webpackを使ったビルドについて。 browserifyとの比較\nwebpackがデフォルトで webpack-dev-serverや差分コンパイル、bower統合、js以外を読み込めるloaderを持ってる点について書かれている\n\ntest",
        "tags": [
            "browserify",
            "JavaScript",
            "Tools"
        ],
        "date": "2014-09-01T05:03:06.517Z",
        "relatedLinks": [
            {
                "title": "WebKit CSS JIT Internals - Constellats",
                "url": "http://constellation.github.io/blog/2014/07/14/webkit-css-jit-internals/"
            }
        ]
    }
     */
    data: {
        list: store.loadAtDate(new Date).list,
        sortColumn: "date",
        sort: function (array, column) {
            array = array.slice();
            return array.sort(function (a, b) {
                return a[column] < b[column] ? 1 : -1;
            });
        }
    },
    debug: true
});
ractive.observe('list', function (newValue, oldValue, keypath) {
    store.save({
        "list": newValue
    });
});