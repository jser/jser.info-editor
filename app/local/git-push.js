/**
 * Created by azu on 2014/09/15.
 * LICENSE : MIT
 */
"use strict";
var fs = require('vinyl-fs');
var git = require('gulp-git');
var jser = require("../Config/jser-config");
var map = require('map-stream');
var log = function (file, cb) {
    console.log(file.path);
    cb(null, file);
};
function gitPush(callback) {
    var cwd = {
        cwd: jser.jserDirPath
    };
    git.push("origin", "gh-pages", cwd, callback);
}
module.exports = gitPush;
