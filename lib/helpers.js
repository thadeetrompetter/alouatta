var path = require('path');

exports.getSection = function (filePath) {
    var ext = path.extname(filePath),
        base = path.basename(filePath, ext);
        
    return base.substr(base.indexOf('-') + 1);
};
