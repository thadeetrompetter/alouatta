'use strict';

function Navigation(element) {
    if(!element){
        return;
    }
    this.element = element;
    this.handle = document.querySelector('[data-menu-handle]');

    this.handle.addEventListener('click', function (event) {
        document.body.classList.toggle('menu-open');
    });
}
new Navigation(document.querySelector('[data-navigation]'));
