var adjustPath = require('lib/helpers').adjustPath,
    assign = require('lodash.assign'),
    browserify = require('browserify'),
    browserifyOptions,
    buffer = require('vinyl-buffer'),
    config = require('../config'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    syncAssets = require('lib/helpers').syncAssets,
    through = require('through2'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify'),
    watchifyOptions;

browserifyOptions = {
    entries: [ config.script ],
    debug: true
};

module.exports = function (opts) {
    var options = opts || {},
        serve = syncAssets(options.server);

    if(options.production){
        browserifyOptions.debug = false;
    }
    watchifyOptions = assign({}, watchify.args, browserifyOptions);
    var b = browserify(options.watch ? browserifyOptions : watchifyOptions);

    if(options.watch){
        b = watchify(b);
        b.on('update', bundle);
        b.on('error', gutil.log);
    }
    function bundle() {
        return b.bundle()
            .pipe(source(config.script))
            .pipe(adjustPath('/source',''))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
                .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.distAssets))
            .pipe(serve());
    }
    return bundle();
};
