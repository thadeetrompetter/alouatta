var gutil = require('gulp-util'),
    startDelimiter = /\/\/>>minifyStart/g,
    endDelimiter = /\/\/>>minifyEnd/g,
    es = require('event-stream'),
    name = 'inline-minify',
    uglify = require('uglify-js');

module.exports = function () {
    return es.map(function (data, cb) {
        var contents = data.contents.toString();
        if(hasPragmas(contents)){
            var lines = contents.split('\n'),
                indices = getPragmas(lines),
                minified;

            verifyIndices(indices);
            minified = minify(lines, indices);
            contents = replace(lines, indices, minified).join('\n');
            data.contents = new Buffer(contents);
        }
        cb(null, data);
    });
};

function hasPragmas(contents) {
    return startDelimiter.test(contents);
}
function replace(contents, indices, minified) {
    var collector = contents.slice();
    indices.forEach(function (delimiters, index) {
        var count = (delimiters[1] - delimiters[0]) + 1;
        collector.splice(delimiters[0], count, minified[index]);
    });
    return collector;
}
function minify(contents, indices) {
    return indices.map(function (index) {
        var section = contents.slice(index[0], index[1]).join('\n');
        return uglify.minify(section,{
            fromString: true
        }).code;
    });
}

function verifyIndices(indices) {
    indices.forEach(function (index) {
        if(index.length < 2){
            throw new gutil.PluginError(name, {
                message: 'unmatched start offset on line: ' + index[0]
            });
        }
    });
}
function getPragmas(lines) {
    var index = 0,
        started;
    return lines.reduce(function (collector, line) {
        var slice = collector.slice();
        if(startDelimiter.test(line) && (typeof started === 'undefined' || !started)){
            slice = slice.concat([[ index ]]);
            started = true;
        }
        if(endDelimiter.test(line) && started){
            var currentIndex = slice.length - 1;
            slice[currentIndex] = slice[currentIndex].concat( index );
            started = false;
        }
        index++;
        return slice;
    }, []);
}
