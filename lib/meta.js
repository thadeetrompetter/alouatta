var config = require('../config'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    appendMetaData = require('lib/helpers').appendMetaData,
    path = require('path'),
    through = require('through2');

module.exports = function () {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }
        if (file.isStream()) {
            cb(new gutil.PluginError('meta', 'Streaming not supported'));
            return;
        }
        var viewDir = file.context.viewDir,
            metaData,
            metaGlob = path.join(viewDir, config.meta),
            previousDir,
            sections = file.context.sections;

        gulp.src(metaGlob)
            .pipe(through.obj(function data(metaFile, enc, metaDone) {
                var exception;
                try {
                    if(previousDir !== viewDir){
                        metaData = JSON.parse(metaFile.contents.toString());
                    }
                    previousDir = viewDir;
                } catch(e){
                    exception = e;
                }
                metaDone(exception || null);
            }, function end() {
                if(metaData){
                    sections = appendMetaData(sections, metaData);
                }
                cb(null, file);
            }));
    });
};
