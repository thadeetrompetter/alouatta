var config = require('../config'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    lazypipe = require('lazypipe'),
    path = require('path'),
    paths = config.paths,
    through = require('through2'),
    uglify = require('gulp-uglify');

function getPipe(category, method) {
    return lazypipe()
        .pipe(function () {
            return gulpif(function (file) {
                return file.category === category;
            }, method());
        });
}

function setDestination() {
    return through.obj(function (file, enc, cb) {
        var assetPath = path.relative(file.base, file.path),
            assetDestination = assetPath.replace('assets/','');
            file.path = path.join(file.base, assetDestination);
            file.category = path.basename(path.dirname(assetPath));
            cb(null, file);
    });
}

var image = getPipe('images', imagemin),
    script = getPipe('script', uglify);

module.exports = function () {
    return gulp.src([
        paths.assets,
        './tmp/*/assets/**/*.*'
    ])
        .pipe(setDestination())
        .pipe(image())
        .pipe(script())
        .pipe(gulp.dest(config.distAssets));
};
