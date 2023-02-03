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

const isLoggedIn = document.cookie.includes('user'); 
console.log(isLoggedIn);


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
  