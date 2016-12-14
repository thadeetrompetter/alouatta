var autoprefix = require('gulp-autoprefixer'),
    config = require('../config'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    less = require('gulp-less'),
    minify = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    syncAssets = require('../lib/helpers').syncAssets;

module.exports = function buildCss(opts) {
    var options = opts || {},
        serve = syncAssets(options.server);

    return gulp.src(config.css, {base: './source'})
        .pipe(gulpif(!options.production, sourcemaps.init()))
            .pipe(less())
            .pipe(autoprefix())
            .pipe(gulpif(opts.production, minify()))
        .pipe(gulpif(!options.production, sourcemaps.write()))
        .pipe(gulp.dest(config.distAssets))
        .pipe(serve());
};
