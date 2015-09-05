var assign = require('lodash.assign'),
    path = require('path');

exports.getSection = function (filePath) {
    var ext = path.extname(filePath),
        base = path.basename(filePath, ext);

    return base.substr(base.indexOf('-') + 1);
};
exports.appendMetaData = function (sections, metaData) {
    return sections.map(function (section) {
        if(section.name in metaData){
            return assign(section, metaData[section.name]);
        }
        return section;
    });
};
