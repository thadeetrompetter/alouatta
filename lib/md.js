var config = require('../config'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    getSection = require('./helpers').getSection,
    marked = require('marked'),
    path = require('path'),
    through = require('through2'),
    renderer = require('./custom-image');

module.exports = function () {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
			cb(null, file);
			return;
		}
		if (file.isStream()) {
			cb(new gutil.PluginError('md', 'Streaming not supported'));
			return;
		}
        var viewName = path.basename(file.path, '.html'),
            pathToView = path.join(config.pages, viewName),
            pathToMd = path.join(pathToView, '*.md'),
            stream = this,
            newFile = file.clone(),
            context = {};

            context.sections = [];
            context.viewName = viewName;
            context.viewDir = pathToView;

            newFile.context = context;

        gulp.src(pathToMd)
            .pipe(through.obj(function (mdFile, enc, markdownDone) {
                var section = {};
                section.name = getSection(mdFile.path);
                section.content = marked(mdFile.contents.toString(), {
                    renderer: renderer
                });
                context.sections.push(section);
                markdownDone();
            }, function () {
                stream.push(newFile);
                cb();
            }));
    });
};
