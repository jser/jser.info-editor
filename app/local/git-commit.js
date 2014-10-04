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
function gitCommit(glob, commitMessage) {
    var cwd = {
        cwd: jser.jserDirPath
    };
    return fs.src(glob)
        .pipe(map(log))
        .pipe(git.add(cwd))
        .pipe(git.commit(commitMessage, cwd));
}
module.exports = gitCommit;
