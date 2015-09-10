var cssLint = require('gulp-csslint'),
    cssOutput,
    config = require('../config'),
    gulp = require('gulp');

cssOutput = config.distAssets + '/*.css';

module.exports = function () {
    'use strict';
    return gulp.src(cssOutput)
        .pipe(cssLint())
        .pipe(cssLint.reporter())
        .pipe(cssLint.reporter('fail'));
};
