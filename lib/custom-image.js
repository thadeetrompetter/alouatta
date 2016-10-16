var marked = require('marked'),
    renderer = new marked.Renderer();

renderer.image = function (href, title, text) {
    let [ src, sources ] = getSources(href),
        srcSetValue = formatSources(sources),
        [ classValue, titleValue ] = getLayout(title);

    return `<img class="${classValue}" srcset="${srcSetValue}" src="${src}" title="${titleValue}" alt="${text}">`;
};

function formatSources(sources) {
    return sources.map(source => {
        return source.join(' ');
    }).join(', ');
}

function getLayout(altAttrValue, defaultClass = 'image') {
    if(!altAttrValue){
        return defaultClass;
    }
    var values = altAttrValue.split(':');
    if(values.length < 2){
        return defaultClass;
    }
    return [[
        defaultClass,
        ...values[1].split(',')
    ].join(' '), values[0]];
}

function getSources(sources) {
    var srcSet = sources.split(',')
        .map(function (source) {
            if(source.includes('\n')){
                // remove newlines if string has any
                source = source.replace('\n','');
            }
            source = source.trim();
            // there might be a protocol in the url (http://) so split on the
            // last colon.
            return splitSource(source, ':');
        });
    let [ [firstSrc] ] = srcSet;
    return [ firstSrc, srcSet ];
}

function splitSource(str, separator) {
    if(countChars(str, separator) === 0){
        return Array.of(str);
    }
    var index = str.lastIndexOf(separator);
    return Array.of(str.slice(0, index), str.slice(index + 1));
}

function countChars(str, char) {
    var currentIndex,
        found = 0,
        index = 0;
    while(currentIndex = str.indexOf(char, index),  currentIndex !== -1){
        if(++found >= 2){
            break;
        }
        index = currentIndex;
    }
    return found;
}
module.exports = renderer;
