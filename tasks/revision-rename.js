'use strict';
var config = require('../config'),
    gulp = require('gulp'),
    replace = require('gulp-rev-replace');

module.exports = function () {
    var manifest = gulp.src(config.dist + '/rev-manifest.json');
    return gulp.src([ config.dist + '/*.html' ])
        .pipe(replace({manifest: manifest}))
        .pipe(gulp.dest(config.dist));
};
