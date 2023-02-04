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


//User info declaration
let username= document.querySelectorAll(".username");
 let about = document.getElementsByClassName("bio")[0];
let about1 = document.getElementsByClassName("bio2")[0];
let email = document.querySelectorAll(".email");
let phone = document.querySelectorAll(".phone");
let location = document.querySelectorAll(".location");
let birth = document.getElementsByClassName("birth")[0];
let gender =  document.getElementsByClassName("gender")[0];
let nationality = document.getElementsByClassName("nationality")[0]; 
let skills = document.getElementsByClassName("skillsContent")[0]; 
//LOADING ANIMATION 
let overlay = document.getElementsByClassName("overlay")[0];
let  hidden= document.getElementsByClassName("hiddenContent")[0];

/* toggleButton.addEventListener('click', function () {
    testMenu.classList.toggle('active');
    console.log("Clicked");
}); */

  

 
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
            let i=0;
            const result = await res.json();
            console.log(result);
             for (i = 0; i < username.length; i++) {
                username[i].innerText=result.data.ime + " " + result.data.prezime;
            }
            i=0;
            
            //about.innerText = result.data.about
            about1.innerText = result.data.about
            email.innerText = result.email;
            birth.innerText = result.data.rodenje;
            gender.innerText = result.data.spol;
            nationality.innerText= result.data.nacionalnost;
            skills.innerText = result.data.vjestine;
            
            for (i = 0; i < email.length; i++) {
                email[i].innerText=result.email;
            }
            i=0;
            for (i = 0; i < location.length; i++) {
                location[i].innerText=result.data.lokacija;
            }
            i=0;
            for (i = 0; i < phone.length; i++) {
                phone[i].innerText=result.data.mob;
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
  