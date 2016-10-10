'use strict';
var config = require('../config'),
    gulp = require('gulp'),
    responsive = require('gulp-responsive');

module.exports = function () {
    return gulp.src([
        './source/components/*/assets/**/*.jpg',
        '!./source/components/gallery/**/*'
    ])
        .pipe(responsive({
            '**/section-*.jpg':[
                {
                    width: 1280,
                    rename: {
                        suffix: '-xl'
                    }
                },
                {
                    width: 1024,
                    rename: {
                        suffix: '-l'
                    }
                },
                {
                    width: 768,
                    rename: {
                        suffix: '-m'
                    }
                },
                {
                    width: 476,
                    rename: {
                        suffix: '-s'
                    }
                }
            ]
        }))
        .pipe(gulp.dest(config.tmp));
};
