"use strict";
exports.__esModule = true;
let origin = "http://localhost:8080/"
let toggleContainer = document.getElementsByClassName('toggleContainer')[0];
let testMenu = document.getElementsByClassName('testMenu')[0];

// Toggle of humburger menu
toggleContainer.addEventListener('click', function () {
  testMenu.classList.toggle('active');
});

document.addEventListener('click', function handleClickOutsideBox(event) {
  if (!testMenu.contains(event.target)&& !toggleContainer.contains(event.target) && testMenu.classList.contains('active')) {
      testMenu.classList.toggle('active');
  }
});

//Hide btn ak nije odabrao
let logoutBtn= document.getElementsByClassName("subMenu2")[0];
logoutBtn.addEventListener("click", Logout);
let root = origin+"img/";
let username= document.querySelectorAll(".username");
const avatar = document.getElementById('avatar');


//LOADING ANIMATION
let overlay = document.getElementsByClassName("overlay")[0];
let  hidden= document.getElementsByClassName("hiddenContent")[0];
  

// Find the "Kreiraj" button element
const kreirajBtn = document.querySelector('.clickBtn1');

// Attach a click event listener to the button
kreirajBtn.addEventListener('click', () => {
  // Get the input values from the form
  const naslovValue = document.querySelector('.naslovPoduzeca input').value;
  const nazivPoduzecaValue = document.querySelector('.contentPick li:nth-child(1) input').value;
  const adresaValue = document.querySelector('.contentPick li:nth-child(2) input').value;
  const kontaktValue = document.querySelector('.contentPick li:nth-child(3) input').value;
  const slikaValue = document.querySelector('.imgSection1 img').getAttribute('src');

  // Create a JSON object with the form data
  const data = {
    Naslov: naslovValue,
    Naziv_poduzeća: nazivPoduzecaValue,
    Adresa: adresaValue,
    Kontakt: kontaktValue,
    Slika: slikaValue
  };

  // Send a POST request to the backend endpoint
  fetch(origin+'praksa/add', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        console.log('Praksa successfully added');
        alert("Praksa dodana ")
        window.location.href = "/dodavanjePrakse.html"
      } else {
        console.log('Failed to add praksa');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});



async function Logout(){//fetch POST
  const res = await fetch(origin + 'home/logout',{
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

async function CheckSession(){
  const res = await fetch(origin+'praksa/check',{
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
          }
          else{
            window.location.href ="/home.html";
            return;
          }
          for (var i = 0; i < username.length; i++) {
              username[i].innerText=result.data.ime + " " + result.data.prezime;
          }
          avatar.src= root + result.data.avatar;
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