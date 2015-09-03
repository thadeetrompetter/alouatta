var assign = require('lodash.assign'),
    swig = require('swig'),
    through = require('through2'),
    File = require('vinyl');

swig.setDefaults({
    loader: swig.loaders.fs('./source')
});

module.exports = function (file) {
    return through.obj(function (file, enc, cb) {
        var rendered = file.clone();
        rendered.contents = new Buffer(swig.renderFile(file.path, {
            content: file.data
        }));
        this.push(rendered);
        cb();
    });
};
