"use strict";
exports.__esModule = true;
let origin = "http://localhost:8080/"


//let toggleButton = document.getElementsByClassName('toggle-button')[0];
//let navbarLinks = document.getElementsByClassName('nav-links')[0];

//Hamburger menu
let toggleContainer = document.getElementsByClassName('toggleContainer')[0];
let testMenu = document.getElementsByClassName('testMenu')[0];
let logoutBtn= document.getElementsByClassName("subMenu2")[0];

let root =origin+ "img/";

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
const avatar = document.getElementById('avatar');
const avatar2 = document.getElementById('profileImg');

//LOADING ANIMATION 
let overlay = document.getElementsByClassName("overlay")[0];
let  hidden= document.getElementsByClassName("hiddenContent")[0];

/* toggleButton.addEventListener('click', function () {
    testMenu.classList.toggle('active');
    console.log("Clicked");
}); */

  
logoutBtn.addEventListener("click", Logout);


async function CheckToken(){
    const token = localStorage.getItem('token');
    const res = await fetch(origin+ 'home/check',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },    
    })
   
        if (res.ok) {
            let i=0;
            const result = await res.json();
            if(result.admin){
                let subUser = document.getElementsByClassName("subUser")[0];
                subUser.remove();
            }else{
                let subAdmin = document.getElementsByClassName("subAdmin")[0];
                let subAdmin2 = document.getElementsByClassName("subAdmin")[1];
                subAdmin.remove();
                subAdmin2.remove();
            }
       
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
            avatar.src= root + result.data.avatar;
            avatar2.src = avatar.src;
            
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
CheckToken();


async function Logout() {
    const token = localStorage.getItem('token');
    const res = await fetch(origin + 'home/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    });
  
    if (res.ok) {
      localStorage.removeItem('token');
      console.log("Token removed from localStorage");
      window.location.href = "/login.html";
      return;
    } else {
      alert("Some error occurred");
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
  