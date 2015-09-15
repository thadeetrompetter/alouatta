var git = require('lib/git'),
    gutil = require('gulp-util'),
    swig = require('swig'),
    through = require('through2');

swig.setDefaults({
    loader: swig.loaders.fs('./source'),
    cache: false
});

module.exports = function (file) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
			cb(null, file);
			return;
		}
		if (file.isStream()) {
			cb(new gutil.PluginError('template-render', 'Streaming not supported'));
			return;
		}
        var rendered = file.clone();
        git().then(function (sha) {
            file.context.sha = sha;
            rendered.contents = new Buffer(swig.renderFile(file.path, file.context));
            cb(null, rendered);
        });
    });
};
