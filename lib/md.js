var gulp = require('gulp'),
    gutil = require('gulp-util'),
    getSection = require('lib/helpers').getSection,
    marked = require('marked'),
    path = require('path'),
    through = require('through2');

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
            pathTo = path.join('./pages', viewName, '*.md'),
            stream = this,
            newFile = file.clone(),
            context = {};

            context.sections = [];
            context.viewName = viewName;

            newFile.context = context;

        gulp.src(pathTo)
            .pipe(through.obj(function (mdFile, enc, markdownDone) {
                var section = {};
                section.name = getSection(mdFile.path);
                section.content = marked(mdFile.contents.toString());
                context.sections.push(section);
                markdownDone();
            }, function () {
                stream.push(newFile);
                cb();
            }));
    });
};
