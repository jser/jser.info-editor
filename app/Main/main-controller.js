/**
 * Created by azu on 2014/09/17.
 * LICENSE : MIT
 */
"use strict";

var _ = require("lodash");
var store = require("./models/index-store");
var Ractive = require("ractive");
var config = require("../Config/jser-config");
module.exports = function loadView() {
    if (!config.jserDirPath) {
        return
    }
    var ractive = new Ractive({
        el: '#js-sidebar',
        template: require("fs").readFileSync(__dirname + "/Views/main-sidebar.hbs", "utf-8"),
        components: {
            "siteItem": require("./components/site-item")
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
            list: store.loadAtDate(new Date).list
        },
        computed: {
            sortedList: function () {
                var column = "date";
                var list = this.get('list').slice();
                return list.sort(function (a, b) {
                    return a[column] < b[column] ? 1 : -1;
                });
            }
        },
        debug: true
    });
    ractive.on("allEdit", function (context) {
        var siteItems = ractive.findAllComponents("siteItem");
        siteItems.forEach(function (item) {
            item.fire("edit");
        })
    });
    ractive.observe('sortedList.*', function (newValue, oldValue, keypath) {
        if (oldValue == null) {
            return;
        }
        var list = ractive.get("list");
        var index = list.indexOf(oldValue);
        list[index] = newValue;
        var listKeyPath = ["list", index].join(".");
        ractive.update(listKeyPath);
    });
    ractive.observe('list', function (newValue, oldValue, keypath) {
        if (oldValue == null) {
            return;
        }
        console.log("Save!");
        store.save({
            "list": newValue
        });
    });
};