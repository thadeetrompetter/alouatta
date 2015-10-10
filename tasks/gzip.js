var config = require('../config'),
    gulp = require('gulp'),
    gzip = require('gulp-gzip');

module.exports = function () {
    return gulp.src(['./dist/**/*'])
        .pipe(gzip({
            append: false
        }))
        .pipe(gulp.dest('./dist'));
};
