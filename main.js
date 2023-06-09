"use strict";
exports.__esModule = true;
//let num:number=4;
//console.log(num);
var toggleButton = document.getElementsByClassName('toggle-button')[0];
var navbarLinks = document.getElementsByClassName('nav-links')[0];
var switcher = false;
toggleButton.addEventListener('click', function () {
    navbarLinks.classList.toggle('active');
});
console.log("test");


const userId = window.location.pathname.split("/")[2]; // assume the URL is /user/user1

fetch(`http://localhost:8080/user/${userId}`)
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch user profile data");
    }
    return response.json();
  })
  .then(data => {
    // create HTML elements for the user profile page
    const usernameTitle = document.createElement("h1");
    usernameTitle.textContent = data.username;
    const emailAddress = document.createElement("p");
    emailAddress.textContent = data.email;

    // append HTML elements to the user profile div
    const userProfileDiv = document.getElementById("userProfile");
    userProfileDiv.appendChild(usernameTitle);
    userProfileDiv.appendChild(emailAddress);
  })
  .catch(error => {
    console.error(error);
  });
