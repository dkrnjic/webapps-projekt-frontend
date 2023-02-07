"use strict";
exports.__esModule = true;

//let toggleButton = document.getElementsByClassName('toggle-button')[0];
//let navbarLinks = document.getElementsByClassName('nav-links')[0];

let toggleContainer = document.getElementsByClassName('toggleContainer')[0];
let testMenu = document.getElementsByClassName('testMenu')[0];
let logoutBtn= document.getElementsByClassName("subMenu2")[0];
let username= document.querySelectorAll(".username");

//LOADING ANIMATION
let overlay = document.getElementsByClassName("overlay")[0];
let  hidden= document.getElementsByClassName("hiddenContent")[0];
let  headerPanel= document.getElementsByClassName("headerContainer")[0];

logoutBtn.addEventListener("click", Logout);

async function CheckSession(){
    const res = await fetch('http://localhost:8080/home/check',{
        method: 'GET',
        credentials: 'include'     
    })
    if (res.redirected) {
        console.log("Nema session");
        window.location.href = res.url;
        return;
     }
     else{
        if (res.ok) {
            const result = await res.json();
            for (var i = 0; i < username.length; i++) {
                username[i].innerText=result.data.ime + " " + result.data.prezime;
            }
            //LOADING TRIGGER
            overlay.style.display = "none";
            hidden.classList.toggle('active');
            headerPanel.classList.toggle('active');
           }
        else{
            console.log("nije mogao dobiti ime");
        }
    }
}
 CheckSession();

async function Logout(){//fetch POST
    const res = await fetch('http://localhost:8080/home/logout',{
        method: 'POST',
        credentials: 'include'     
    })
    if (res.redirected) {
        console.log("logout");
        window.location.href = res.url;
        return;
     }
     else{
        alert("neki bug")
    }
}


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
  