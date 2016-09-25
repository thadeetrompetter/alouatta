'use strict';
var config = require('../config'),
    gulp = require('gulp'),
    rev = require('gulp-rev');

module.exports = function () {
    return gulp.src([
        'css',
        'js',
        'svg',
        'ttf',
        'jpg',
        'JPG',
        'png'
    ].map(function (ext) {
        return config.distAssets + '/**/*.' + ext;
    }))
    .pipe(rev())
    .pipe(gulp.dest(config.distAssets))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.dist));
};
