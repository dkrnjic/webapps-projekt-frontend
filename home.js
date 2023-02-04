"use strict";
exports.__esModule = true;
//let num:number=4;
//console.log(num);
let toggleButton = document.getElementsByClassName('toggle-button')[0];
let toggleContainer = document.getElementsByClassName('toggleContainer')[0];
let navbarLinks = document.getElementsByClassName('nav-links')[0];
let testMenu = document.getElementsByClassName('testMenu')[0];
let switcher = false;
let logoutBtn= document.getElementsByClassName("subMenu2")[0];
logoutBtn.addEventListener("click", Logout);
let username= document.querySelectorAll(".username");

//LOADING ANIMATION
let overlay = document.getElementsByClassName("overlay")[0];
let  hidden= document.getElementsByClassName("hiddenContent")[0];

const isLoggedIn = document.cookie.includes('user'); 


//console.log(username.innerText);
//radi
/* function setCookie(){
    fetch('http://localhost:8080/setcookie', {
        method: 'GET',
        credentials: 'include'
        })
        .then(response => {
            console.log(response);
            //response.headers.get('Set-Cookie') will give you the set-cookie value
        } )
        .catch(error => console.error(error));

        console.log("test");
}
setCookie(); */

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
  