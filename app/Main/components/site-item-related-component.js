"use strict";
// 関連するサイトのコンポーネント
"use strict";
var Ractive = require("ractive");
module.exports = Ractive.extend({
    template: require("fs").readFileSync(__dirname + "/site-item-related.hbs", "utf-8"),
});
