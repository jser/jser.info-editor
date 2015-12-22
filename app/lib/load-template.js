/**
 * Created by azu on 2014/10/04.
 * LICENSE : MIT
 */
"use strict";
function loadTemplate(filePath) {
    return require("fs").readFileSync(filePath, "utf-8")
}
module.exports = loadTemplate;