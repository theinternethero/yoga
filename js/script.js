// require('es6-promise').polyfill();
require('nodelist-foreach-polyfill');
require('formdata-polyfill');

window.addEventListener('DOMContentLoaded', () => { // Скрипт будет выполняться только после того, как прогрузиться DOM дерево (HTML)

    'use strict'; // Активен строгий режим

    let calc = require('./parts/calc.js'), // ./ это то что находится в этой же папке
        form = require('./parts/form.js'),
        slider = require('./parts/slider.js'),
        tabs = require('./parts/tabs.js'),
        timer = require('./parts/timer.js'),
        popup = require('./parts/popup.js'),
        smooth = require('./parts/smoothscroll.js');

    calc();
    form();
    slider();
    tabs('info-tabcontent', 'info-header', 'info-header-tab');
    timer();
    popup();
    smooth();
});