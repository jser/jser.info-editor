/**
 * Created by azu on 2014/09/15.
 * LICENSE : MIT
 */
"use strict";
var map = require('map-stream');
var fs = require('vinyl-fs');
var git = require('gulp-git');
var log = function (file, cb) {
    console.log(file.path);
    cb(null, file);
};

fs.src('./dir/*')
    .pipe(map(log))
    .pipe(git.add())
    .pipe(git.commit('initial commit'));