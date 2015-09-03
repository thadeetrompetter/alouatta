var gulp = require('gulp'),
    marked = require('marked'),
    path = require('path'),
    through = require('through2');

module.exports = function () {
    return through.obj(function (file, enc, cb) {
        var pathTo = path.join('./pages', path.basename(file.path, '.html'), '*.md'),
            stream = this,
            newFile = file.clone();

        gulp.src(pathTo)
            .pipe(through.obj(function (mdFile, enc, markdownDone) {
                newFile.data = marked(mdFile.contents.toString());
                stream.push(newFile);
                markdownDone();
            }, function () {
                cb();
            }));
    });
};
