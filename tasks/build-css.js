var config = require('../config'),
    gulp = require('gulp'),
    less = require('gulp-less');

module.exports = function buildCss() {
    return gulp.src(config.css, {base: './source'})
        .pipe(less())
        .pipe(gulp.dest(config.distAssets));
};
