var config = require('../config'),
    gulp = require('gulp'),
    md = require('lib/md'),
    minify = require('gulp-minify-html'),
    template = require('lib/template-render');

module.exports = function buildHtml() {

    return gulp.src(config.html)
        .pipe(md())
        .pipe(template())
        .pipe(gulp.dest('./dist/'));
};
