var git = require('lib/git'),
    gutil = require('gulp-util'),
    nunjucks = require('nunjucks'),
    through = require('through2');

nunjucks.configure('./source', {
    noCache: true,
    autoescape: false
});

module.exports = function () {
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
            nunjucks.render(
                file.path,
                file.context,
                function (err, template) {
                    if(err){
                        cb(err);
                    }
                    rendered.contents = new Buffer(template);
                    cb(null, rendered);
            });
        });
    });
};
