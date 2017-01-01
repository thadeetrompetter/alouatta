'use strict';
var eslint = require('gulp-eslint'),
    gulp = require('gulp'),
    lazypipe = require('lazypipe'),
    paths = require('../config').paths;

var lint = lazypipe()
            .pipe(eslint, {
                configFile: paths.eslint
            })
            .pipe(eslint.format)
            .pipe(eslint.failAfterError);

module.exports = function () {
    return gulp.src(paths.jsFiles)
        .pipe(lint());
};
