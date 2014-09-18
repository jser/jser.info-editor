/**
 * Created by azu on 2014/09/17.
 * LICENSE : MIT
 */
"use strict";
    module.exports = function loadTemplate(filePath) {
    return require("fs").readFileSync(filePath, "utf-8")
};