var config = require('../config'),
    gulp = require('gulp'),
    inlineMinify = require('lib/inline-minify'),
    md = require('lib/md'),
    meta = require('lib/meta'),
    pathToDistRoot = require('lib/helpers').pathToDistRoot,
    prettify = require('gulp-html-prettify'),
    syncAssets = require('lib/helpers').syncAssets,
    template = require('lib/template-render');

module.exports = function buildHtml(opts) {
    var options = opts || {},
        serve = syncAssets(options.server);

    return gulp.src(config.html)
        .pipe(md())
        .pipe(meta())
        .pipe(template())
        .pipe(inlineMinify())
        .pipe(prettify())
        .pipe(pathToDistRoot())
        .pipe(gulp.dest(config.dist))
        .pipe(serve());
};
