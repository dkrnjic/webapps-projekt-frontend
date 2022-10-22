"use strict";

var num = 4;
console.log(num);
var toggleButton = document.getElementsByClassName('toggle-button')[0];
var navbarLinks = document.getElementsByClassName('nav-links')[0];
toggleButton.addEventListener('click', function () {
    navbarLinks.classList.toggle('active');
});

