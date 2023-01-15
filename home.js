"use strict";
exports.__esModule = true;
//let num:number=4;
//console.log(num);
let toggleButton = document.getElementsByClassName('toggle-button')[0];
let toggleContainer = document.getElementsByClassName('toggleContainer')[0];
let navbarLinks = document.getElementsByClassName('nav-links')[0];
let testMenu = document.getElementsByClassName('testMenu')[0];
let switcher = false;

/* toggleButton.addEventListener('click', function () {
    testMenu.classList.toggle('active');
    console.log("Clicked");
}); */

// Toggle of humburger menu
toggleContainer.addEventListener('click', function () {
    testMenu.classList.toggle('active');
});

 // checks if user clicked outside of "toggleContainer" while its active
document.addEventListener('click', function handleClickOutsideBox(event) {
    if (!testMenu.contains(event.target)&& !toggleContainer.contains(event.target) && testMenu.classList.contains('active')) {
        testMenu.classList.toggle('active');
    }
  });
  