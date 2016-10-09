'use strict';

var MENU_OPEN_CLASS = 'menu-open';

function Navigation(element) {
    if(!element){
        return;
    }
    this.element = element;
    this.handle = document.querySelector('[data-menu-handle]');
    this.header = document.querySelector('[data-header]');

    this.handle.addEventListener('click', function () {
        document.body.classList.toggle(MENU_OPEN_CLASS);
    });

    this.header.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    document.documentElement.addEventListener('click', function () {
        document.body.classList.remove(MENU_OPEN_CLASS);
    });
}
new Navigation(document.querySelector('[data-navigation]'));
