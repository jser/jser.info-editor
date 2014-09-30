/**
 * Created by azu on 2014/09/15.
 * LICENSE : MIT
 */
"use strict";
var fs = require('vinyl-fs');
var git = require('gulp-git');
var map = require('map-stream');
var log = function (file, cb) {
    console.log(file.path);
    cb(null, file);
};
function gitCommit(glob, commitMessage) {
    return fs.src(glob)
        .pipe(map(log))
        .pipe(git.add())
        .pipe(git.commit(commitMessage))
        .on('error', function (e) {
            console.log(e)
        });
}
module.exports = gitCommit;
