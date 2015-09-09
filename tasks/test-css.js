var config = require('../config'),
    gulp = require('gulp'),
    gutil = require('gulp-util');
    paths = config.paths;

module.exports = function () {
    'use strict';
    return gulp.src(paths.lessFiles)
        .pipe(gutil.noop());
};
