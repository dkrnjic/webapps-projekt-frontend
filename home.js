"use strict";
exports.__esModule = true;
let origin = "https://webapps-projekt-backend-dkrnjic.onrender.com/"
//let toggleButton = document.getElementsByClassName('toggle-button')[0];
//let navbarLinks = document.getElementsByClassName('nav-links')[0];
let root = origin+ "img/";

let toggleContainer = document.getElementsByClassName('toggleContainer')[0];
let testMenu = document.getElementsByClassName('testMenu')[0];
let logoutBtn= document.getElementsByClassName("subMenu2")[0];
let username= document.querySelectorAll(".username");
const avatar = document.getElementById('avatar');

//LOADING ANIMATION
let overlay = document.getElementsByClassName("overlay")[0];
let  hidden= document.getElementsByClassName("hiddenContent")[0];
let  headerPanel= document.getElementsByClassName("headerContainer")[0];


logoutBtn.addEventListener("click", Logout);

async function CheckSession(){
    const res = await fetch(origin+ 'home/check',{
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
            if(result.admin){
                let subUser = document.getElementsByClassName("subUser")[0];
                subUser.remove();
            }else{
                let subAdmin = document.getElementsByClassName("subAdmin")[0];
                let subAdmin2 = document.getElementsByClassName("subAdmin")[1];
                let subAdmin3 = document.getElementsByClassName("subAdmin")[2];
                subAdmin.remove();
                subAdmin2.remove();
                subAdmin3.remove();
            }
            for (var i = 0; i < username.length; i++) {
                username[i].innerText=result.data.ime + " " + result.data.prezime;
            }
            avatar.src= root + result.data.avatar;
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
    const res = await fetch(origin+ 'home/logout',{
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
  