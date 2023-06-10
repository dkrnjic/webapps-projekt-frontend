"use strict";
exports.__esModule = true;


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
const redirectBtn = document.getElementsByClassName("clickBtn")[0];

let logoutBtn= document.getElementsByClassName("subMenu2")[0];
let naslovInput = document.getElementById('title2');
logoutBtn.addEventListener("click", Logout);
let root = "http://localhost:8080/img/";
let username= document.querySelectorAll(".username");
const avatar = document.getElementById('avatar');
let holder = document.getElementsByClassName('holder')[1];
let praksaContent = document.getElementsByClassName('praksaContent')[0];
let commentPlace = document.getElementsByClassName('commentPlace')[0]

//LOADING ANIMATION
let overlay = document.getElementsByClassName("overlay")[0];
let  hidden= document.getElementsByClassName("hiddenContent")[0];
  
//status prakse
let nazivPoslodavca = document.getElementsByClassName('nazivPoslodavca')[0];
let imeMentora = document.getElementsByClassName('imeMentora')[0];
let datumPocetka = document.getElementsByClassName('datumPocetka')[0];
let datumZavrsetka = document.getElementsByClassName('datumZavrsetka')[0];
let statusText = document.getElementsByClassName('statusText')[0];

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

async function CheckSession(){
  const res = await fetch('http://localhost:8080/praksa/check',{
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
            window.location.href ="http://localhost:5500/home.html";
            return;
          }
          for (var i = 0; i < username.length; i++) {
              username[i].innerText=result.data.ime + " " + result.data.prezime;
              
          }
          nazivPoslodavca.innerText=result.praksa.Naziv_poduzeca;
          imeMentora.innerText=result.praksa.Mentor;
          datumPocetka.innerText=result.praksa.Datum_pocetka;
          datumZavrsetka.innerText=result.praksa.Datum_zavrsetka;
          statusText.innerText=result.praksa.status;
          
      
          if(result.praksa.status!="Nema" && result.status=="Pending"){
             holder.remove();
          }else if(result.praksa.status!="Nema" && result.status=="Rejected"){
            statusText.innerText=result.status;
            praksaContent.style.border= "0.3px rgba(128, 0, 0, 1) solid";
            praksaContent.style.backgroundColor= "rgba(255, 0, 0, 0.1)"; 
            commentPlace.innerText = result.comment;
            holder.remove();
          }
          else if(result.praksa.status!="Nema" && result.status=="Approved"){
              statusText.innerText=result.status;
              praksaContent.style.backgroundColor= "rgba(0, 255, 0, 0.1)";
              praksaContent.style.border= "0.3px rgba(0, 128, 0, 1) solid";
              commentPlace.innerText = result.comment;
              holder.remove();
          }
          else if(result.praksa.status="Nema"){
            redirectBtn.remove();
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

/* kontaktPoduzeca.forEach((kontakt, index) => {
  console.log(kontakt.textContent);
  }); */
let kontaktPoduzeca = document.querySelectorAll(".kontaktPoduzeca");
let nazivPoduzeca = document.querySelectorAll(".nazivPoduzeca");
let adresaPoduzeca = document.querySelectorAll(".adresaPoduzeca");
let naslovPoduzeca = document.querySelectorAll(".naslovPoduzeca");

async function getPrakse() {
  const res = await fetch('http://localhost:8080/praksa', {
    method: 'GET',
    credentials: 'include'
  });

  if (res.ok) {
    const result = await res.json();
    try {
      for (let i = 0; i < 4 && i < result.length; i++) {
        const praksa = result[i];
        naslovPoduzeca[i].textContent = praksa.Naslov;
        nazivPoduzeca[i].textContent = praksa.Naziv_poduzeća;
        adresaPoduzeca[i].textContent = praksa.Adresa;
        kontaktPoduzeca[i].textContent = praksa.Kontakt;
        
        let clickBtn1 = document.getElementsByClassName('clickBtn1')[i]
        clickBtn1.addEventListener('click', async()=>{
          console.log("rado");
          const res = await fetch('http://localhost:8080/praksa/test',{
              method: 'POST',
              credentials: 'include',
              headers:{
                  "Content-Type": 'application/json'
              },
              body:JSON.stringify({
                Naziv_poduzeca: praksa.Naziv_poduzeća
              })
            })
            window.location.href = "http://localhost:5500/my-practice.html"
          });
      }
    
    } catch (error) {
      console.log(error);
    }
    // Iterate over the first 4 items in the result array
  
  } else {
    // Handle error case
  }
}
getPrakse() 



let num =4;
async function getPrakse2() {
  const res = await fetch('http://localhost:8080/praksa?start='+num, {
    method: 'GET',
    credentials: 'include'
  });

  if (res.status == 200) {
    const result = await res.json();
    const restoDiv = document.createElement('div');
    restoDiv.classList.add("resto1");

    // Iterate over the first 4 items in the result array
    for (let i = 0; i < 4 && i < result.length; i++) {
    const praksa = result[i];
    switch (i) {
      case 0:
        imgSrc = '/assets/imgs/italija.jpg';
        altText = 'Italija';
        break;
      case 1:
        imgSrc = '/assets/imgs/spanj.png';
        altText = 'Španjolska';
        break;
      case 2:
        imgSrc = '/assets/imgs/malta2.png';
        altText = 'Malta';
        break;
      case 3:
        imgSrc = '/assets/imgs/uk.png';
        altText = 'Ujedinjeno Kraljevstvo';
        break;
    }
    const newDiv = document.createElement('div');
    newDiv.classList.add('imgSection1');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title1');

    const titleP = document.createElement('p');
    titleP.classList.add('naslovPoduzeca');
    titleP.textContent = praksa.Naslov;

    titleDiv.appendChild(titleP);
    newDiv.appendChild(titleDiv);
    

    //posle title
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('contentPick');
    //treba slika vamo.
    let img = document.createElement('img');
    img.setAttribute('src', imgSrc);
    img.setAttribute('alt', altText);
    const ul = document.createElement('ul');
    newDiv.appendChild(img);

    const liNaziv = document.createElement('li');
    const nazivP = document.createElement('p');
    nazivP.textContent = 'Naziv poduzeća: ';
    const nazivSpan = document.createElement('span');
    nazivSpan.classList.add('nazivPoduzeca');
    nazivSpan.textContent = praksa.Naziv_poduzeća;
    liNaziv.appendChild(nazivP);
    liNaziv.appendChild(nazivSpan);
    ul.appendChild(liNaziv);

    const liAdresa = document.createElement('li');
    const adresaP = document.createElement('p');
    adresaP.textContent = 'Adresa: ';
    const adresaSpan = document.createElement('span');
    adresaSpan.classList.add('adresaPoduzeca');
    adresaSpan.textContent = praksa.Adresa;
    liAdresa.appendChild(adresaP);
    liAdresa.appendChild(adresaSpan);
    ul.appendChild(liAdresa);

    const liKontakt = document.createElement('li');
    const kontaktP = document.createElement('p');
    kontaktP.textContent = 'Kontakt: ';
    const kontaktSpan = document.createElement('span');
    kontaktSpan.textContent =  praksa.Kontakt;
    kontaktSpan.classList.add('kontaktPoduzeca');
    liKontakt.appendChild(kontaktP);
    liKontakt.appendChild(kontaktSpan);
    ul.appendChild(liKontakt);

    const liOdaberi = document.createElement('li');
    const odaberiA = document.createElement('a');
    
    odaberiA.textContent = 'Odaberi';
    odaberiA.classList.add('clickBtn1');
    odaberiA.addEventListener('click', async()=>{
        const res = await fetch('http://localhost:8080/praksa/test',{
            method: 'POST',
            credentials: 'include',
            headers:{
                "Content-Type": 'application/json'
            },
            body:JSON.stringify({
              Naziv_poduzeca: nazivSpan.textContent
            })
          })
      
      
      if (res.ok) {
        console.log("uspih");
        window.location.href = "http://localhost:5500/my-practice.html"
      }
      else{
          alert("neki bug")
      }
    })
    liOdaberi.appendChild(odaberiA);
    ul.appendChild(liOdaberi);

    contentDiv.appendChild(ul);
    newDiv.appendChild(contentDiv);
    restoDiv.appendChild(newDiv);

    parentDiv.insertAdjacentElement('beforeend', restoDiv);
 
/* 
      naslovPoduzeca[i].textContent = praksa.Naslov;
      nazivPoduzeca[i].textContent = praksa.Naziv_poduzeća;
      adresaPoduzeca[i].textContent = praksa.Adresa;
      kontaktPoduzeca[i].textContent = praksa.Kontakt; */
     
    }
  }
  if(res.status == 404) {
     console.log("nema podataka vise");
  }
  num+=4;
}




//OCITAJ JOS 
const parentDiv = document.querySelector('.resto1').parentNode;
const createButton = document.getElementsByClassName("clickBtn2")[0];
const outputDiv = document.getElementById("output");
let imgSrc = '';
let altText = '';

createButton.addEventListener("click", function() {
  getPrakse2() 
})
