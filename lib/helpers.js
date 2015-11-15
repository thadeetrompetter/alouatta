var assign = require('lodash.assign'),
    gutil = require('gulp-util'),
    path = require('path'),
    through = require('through2');

exports.getSection = function (filePath) {
    var ext = path.extname(filePath),
        base = path.basename(filePath, ext);

    return base.substr(base.indexOf('-') + 1);
};
exports.appendMetaData = function (sections, metaData) {
    return sections.map(function (section) {
        var name = section.name.toLowerCase();
        if(name in metaData){
            return assign(section, metaData[name]);
        }
        return section;
    });
};
exports.adjustPath = function(component, replacement) {
    return through.obj(function (file, enc, cb) {
        file.path = file.path.replace(component, replacement);
        cb(null, file);
    });
};
exports.pathToDistRoot = function () {
    return through.obj(function (file, enc, cb) {
        var dir = path.resolve(path.dirname(file.path), '..'),
            baseName = path.basename(file.path);

        file.path = path.join(dir, baseName);
        cb(null, file);
    });
};
exports.syncAssets = function (bsInstance) {
    if(bsInstance && bsInstance.active){
        return bsInstance.stream;
    }
    return gutil.noop;
};
