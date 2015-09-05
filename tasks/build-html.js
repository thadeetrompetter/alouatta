var config = require('../config'),
    gulp = require('gulp'),
    md = require('lib/md'),
    prettify = require('gulp-html-prettify'),
    template = require('lib/template-render');

module.exports = function buildHtml() {

    return gulp.src(config.html)
        .pipe(md())
        .pipe(template())
        .pipe(prettify())
        .pipe(gulp.dest('./dist/'));
};
