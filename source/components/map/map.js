'use strict';

var ATTRIBUTE = 'data-map',
    SELECTOR = '[' + ATTRIBUTE + ']',
    awaitModule = require('lib/await-module'),
    elements = document.querySelectorAll(SELECTOR);

function Map(element) {
    if (element.map){ return; }
    this.element = element;
    this.position = getPosition(
        parseFloat(element.getAttribute('data-latitude')),
        parseFloat(element.getAttribute('data-longitude'))
    );
    this.zoom = parseInt(element.getAttribute('data-zoom'), 10);

    this.map = this.createMap();
    this.marker = this.createMarker();
    element.map = this;
}
Map.prototype.createMap = function () {
    return new window.google.maps.Map(this.element, {
        center: this.position,
        zoom: this.zoom,
        scrollwheel: false
    });
};
Map.prototype.createMarker = function () {
    return new window.google.maps.Marker({
        position: this.position,
        map: this.map
    });
};
function getPosition(lat, lon) {
    return {
        lat: lat,
        lng: lon
    };
}
awaitModule(window, 'googleMapsApiLoaded', function () {
    [].slice.call(elements).forEach(function (element) {
        new Map(element);
    });
}, function () {
    window.console.warn('google maps api did not load');
});

module.exports = Map;
