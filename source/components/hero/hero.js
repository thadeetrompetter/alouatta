'use strict';

var ATTRIBUTE = 'data-hero',
    SELECTOR = '[' + ATTRIBUTE + ']',
    IMAGE_FORMATS = '[data-image-formats]',
    debounce = require('lodash.debounce'),
    elements = document.querySelectorAll(SELECTOR);

function Hero(element) {
    if(element.hero){ return; }
    this.element = element;
    this.imageFormats = this.getImageFormats(element.querySelector(IMAGE_FORMATS));
    if(!this.imageFormats){ return; }
    var debouncedLoadImage = debounce(this.loadImage.bind(this), 50);
    window.addEventListener('resize', debouncedLoadImage);
    this.loadImage();
    element.hero = this;
}
module.exports = Hero;

Hero.prototype.loadImage = function () {
    var size = this.getViewportSize();
    var image = ['url(', this.imageFormats[size], ')'].join('');
    if(typeof this.currentImage === 'undefined' || image !== this.currentImage){
        this.element.style.backgroundImage = image;
        this.currentImage = image;
    }
};
Hero.prototype.getImageFormats = function (element) {
    var formats;
    try {
        formats = JSON.parse(element.innerHTML);
    }catch(e){
        return false;
    }
    return Object.keys(formats).length ? formats : false;
};
Hero.prototype.getViewportSize = function () {
    var width = window.innerWidth;
    if(width < 476){
        return 's';
    }else if (width < 768){
        return 'm';
    }else if (width < 1024) {
        return 'l';
    }else {
        return 'xl';
    }
};

[].slice.call(elements).forEach(function (element) {
    new Hero(element);
});
