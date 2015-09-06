var assign = require('lodash.assign'),
    browserify = require('browserify'),
    browserifyOptions,
    config = require('../config'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify'),
    watchifyOptions;

browserifyOptions = {
    entries: [ config.script ],
    debug: true
};

module.exports = function (opts) {
    var options = opts || {};
    if(options.production){
        browserifyOptions.debug = false;
    }
    watchifyOptions = assign({}, watchify.args, browserifyOptions);
    var b = browserify(options.watch ? browserifyOptions : watchifyOptions);

    if(options.watch){
        b = watchify(b);
    }
    return b.bundle()
        .pipe(source(config.script))
        .pipe(gulp.dest(config.distAssets));
};
