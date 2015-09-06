var config = require('../config'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    less = require('gulp-less'),
    minify = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps');

module.exports = function buildCss(opts) {
    var options = opts || {};
    return gulp.src(config.css, {base: './source'})
        .pipe(gulpif(!options.production, sourcemaps.init()))
            .pipe(less())
            .pipe(gulpif(opts.production, minify()))
        .pipe(gulpif(!options.production, sourcemaps.write()))
        .pipe(gulp.dest(config.distAssets));
};
