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
let praksaContainer = document.getElementsByClassName('praksaContainer')[0];
let oPraksi = document.getElementsByClassName('oPraksi')[0];
let closeContainer = document.getElementsByClassName('closeContainer')[0]

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
  const res = await fetch('http://localhost:8080/praksa/checkAdmin',{
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
            overlay.style.display = "none";
            hidden.classList.toggle('active');
          }else{
            window.location.href ="http://localhost:5500/home.html";
            return;
          }
          for (var i = 0; i < username.length; i++) {
              username[i].innerText=result.data.ime + " " + result.data.prezime;
          }
          avatar.src= root + result.data.avatar;
         }
      else{
          console.log("nije mogao dobiti ime");
      }
  }
}
CheckSession();

let kontaktPoduzeca = document.querySelectorAll(".kontaktPoduzeca");
let nazivPoduzeca = document.querySelectorAll(".nazivPoduzeca");
let adresaPoduzeca = document.querySelectorAll(".adresaPoduzeca");
let naslovPoduzeca = document.querySelectorAll(".naslovPoduzeca");

closeContainer.addEventListener('click',()=>{
  oPraksi.style.display= "none"
  hidden.classList.toggle('active');
})

async function getPrakse() {
  const res = await fetch('http://localhost:8080/praksa/prakseAdmin', {
    method: 'GET',
    credentials: 'include'
  });

  if (res.ok) {
    const result = await res.json();
    try {
      generateCode(result.length,result)
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




/* //OCITAJ JOS 
const parentDiv = document.querySelector('.resto1').parentNode;
const createButton = document.getElementsByClassName("clickBtn2")[0];
const outputDiv = document.getElementById("output");
let imgSrc = '';
let altText = '';

createButton.addEventListener("click", function() {
  getPrakse2() 
})
 */




/* Kreiraj 4 instance prakse */
function generateCode(length,podaci) {
  for (let i = 0; i < length; i++) {
    const holderDiv = document.createElement('div');
    holderDiv.classList.add('holder');
    
    const praksaContentDiv = document.createElement('div');
    praksaContentDiv.classList.add('praksaContent');
    
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    
    const h4Element = document.createElement('h4');
    h4Element.textContent = 'Strucni studij Ime';
    
    titleDiv.appendChild(h4Element);
    
    const restoDiv = document.createElement('div');
    restoDiv.classList.add('resto');
    
    const imgSectionDiv = document.createElement('div');
    imgSectionDiv.classList.add('imgSection');
    
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', '/assets/imgs/imgPlaceholder.png');
    
    imgSectionDiv.appendChild(imgElement);
    
    const informacijeDiv = document.createElement('div');
    informacijeDiv.classList.add('informacije');
    
    const ulElement = document.createElement('ul');
    
    const liElement1 = document.createElement('li');
    liElement1.textContent = 'Ime i prezime studenta: ';
    const spanElement1 = document.createElement('span');
    spanElement1.classList.add('nazivStudent');
    spanElement1.textContent = podaci[i].data.ime +" "+ podaci[i].data.prezime ;
    liElement1.appendChild(spanElement1);
    
    const liElement2 = document.createElement('li');
    liElement2.textContent = 'Naziv poslodavca: ';
    const spanElement2 = document.createElement('span');
    spanElement2.classList.add('nazivPoslodavca');
    spanElement2.textContent = podaci[i].praksa.Naziv_poduzeca;
    liElement2.appendChild(spanElement2);
    
    const liElement3 = document.createElement('li');
    liElement3.textContent = 'Ime i prezime Mentora: ';
    const spanElement3 = document.createElement('span');
    spanElement3.classList.add('imeMentora');
    spanElement3.textContent = podaci[i].praksa.Mentor;
    liElement3.appendChild(spanElement3);
    
    const liElement4 = document.createElement('li');
    liElement4.textContent = 'Datum početka prakse: ';
    const spanElement4 = document.createElement('span');
    spanElement4.classList.add('datumPocetka');
    spanElement4.textContent = podaci[i].praksa.Datum_pocetka;
    liElement4.appendChild(spanElement4);
    
    const liElement5 = document.createElement('li');
    liElement5.textContent = 'Datum završetka prakse:';
    const spanElement5 = document.createElement('span');
    spanElement5.classList.add('datumZavrsetka');
    spanElement5.textContent = podaci[i].praksa.Datum_zavrsetka;
    liElement5.appendChild(spanElement5);
    
    ulElement.appendChild(liElement1);
    ulElement.appendChild(liElement2);
    ulElement.appendChild(liElement3);
    ulElement.appendChild(liElement4);
    ulElement.appendChild(liElement5);
    
    informacijeDiv.appendChild(ulElement);
    
    const statusDiv = document.createElement('div');
    statusDiv.classList.add('status');
    
    const statusUlElement = document.createElement('ul');
    
    const statusLiElement1 = document.createElement('li');
    const h2Element = document.createElement('h2');
    h2Element.classList.add('statusText');
    h2Element.textContent = 'Čeka odobrenje';
    statusLiElement1.appendChild(h2Element);
    
    const statusLiElement2 = document.createElement('li');
    const spanElement6 = document.createElement('span');
    spanElement6.textContent = 'status prakse';
    statusLiElement2.appendChild(spanElement6);
    
    const statusLiElement3 = document.createElement('li');
    const aElement = document.createElement('a');
    /* aElement.setAttribute('href', ); */
    aElement.classList.add('clickBtn');
    aElement.textContent = 'Pogledaj sturčnu praksu';
    
    aElement.addEventListener('click',()=>{
      hidden.classList.toggle('active');
      oPraksi.style.display= "block"
    })
    
    statusLiElement3.appendChild(aElement);
    
    statusUlElement.appendChild(statusLiElement1);
    statusUlElement.appendChild(statusLiElement2);
    statusUlElement.appendChild(statusLiElement3);
    
    statusDiv.appendChild(statusUlElement);
    
    restoDiv.appendChild(imgSectionDiv);
    restoDiv.appendChild(informacijeDiv);
    restoDiv.appendChild(statusDiv);
    
    praksaContentDiv.appendChild(titleDiv);
    praksaContentDiv.appendChild(restoDiv);
    
    holderDiv.appendChild(praksaContentDiv);
    
    praksaContainer.appendChild(holderDiv);
  }

 
}
