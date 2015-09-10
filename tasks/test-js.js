var config = require('../config'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    lazypipe = require('lazypipe'),
    stylish = require('jshint-stylish'),
    paths = config.paths;

var actions = {
    hint: lazypipe()
            .pipe(jshint)
            .pipe(jshint.reporter, stylish)
            .pipe(jshint.reporter, 'fail'),
    style: lazypipe()
            .pipe(jscs)
};

module.exports = function (opts) {
    'use strict';
    var options = opts || {},
        action = actions[options.action];

    if(!action){
        gutil.log('run subtasks :style or :hint');
        action = gutil.noop;
    }

    return gulp.src(paths.jsFiles)
        .pipe(action());
};
