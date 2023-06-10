"use strict";
exports.__esModule = true;
let origin = "https://webapps-projekt-backend-dkrnjic.onrender.com/"
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
let root = origin +"img/";
let username= document.querySelectorAll(".username");
const avatar = document.getElementById('avatar');
let holder = document.getElementsByClassName('holder')[1];
let praksaContainer = document.getElementsByClassName('praksaContainer')[0];
let oPraksi = document.getElementsByClassName('oPraksi')[0];
let closeContainer = document.getElementsByClassName('closeContainer')[0]
let textareaText = document.getElementsByClassName('textareaText')[0];
let nameOfStudent = document.getElementsByClassName('nameOfStudent')[0];
let buttonAccept = document.getElementById('buttonAccept');
let buttonReject = document.getElementById('buttonReject');
let uid = document.getElementById('uid');
let stanjeBtns = document.getElementsByClassName('stanjeBtns');
let commentPlace = document.getElementsByClassName('commentPlace')[0]

let textareaTextArray = [{title:"",content:""},
                          {title:"",content:""},
                          {title:"",content:""},
                          {title:"",content:""},
                          {title:"",content:""},
                          {title:"",content:""},
                          {title:"",content:""},
                          {title:"",content:""},
                          {title:"",content:""},]

//LOADING ANIMATION
let overlay = document.getElementsByClassName("overlay")[0];
let  hidden= document.getElementsByClassName("hiddenContent")[0];

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

async function CheckSession(){
  const res = await fetch(origin+ 'praksa/checkAdmin',{
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
            window.location.href ="/home.html";
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

                                           /* EVENT LISTENERS */

closeContainer.addEventListener('click',()=>{
  oPraksi.style.display= "none"
  hidden.classList.toggle('active');
})

buttonAccept.addEventListener('click',AcceptPractice)
buttonReject.addEventListener('click',RejectPractice)



                                                 /* FETCHES */

/* Dohvati prve 4 prakse */
async function getPrakse() {
  try {
    const res = await fetch(origin+ 'praksa/prakseAdmin', {
      method: 'GET',
      credentials: 'include'
    });
    if (res.ok) {
      const result = await res.json();
      arrayPodaci = result;
      stanjeBtns[1].style.backgroundColor = "wheat";
      stanjeBtns[1].style.color = "black";
      generateCode(result.length,result,"Pending")
    } 
  } catch (error) {
    console.log(error);
  }
}
getPrakse() 

/* Reject practice */
async function RejectPractice() {
  try {
    let commentText = document.getElementsByClassName('commentText')[0];
    const res = await fetch(origin+ 'praksa/reject', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment:commentText.value,
        id:uid.textContent
      })
     
    })
    if (res.ok) {
      const result = await res.json();
      commentText.value =" ";
      alert("uspjeh")
      oPraksi.style.display= "none"
      hidden.classList.toggle('active');
      window.location.href ="/prakse.html";
    } 
  } catch (error) {
    console.log(error);
  }
}

/* Accept practice */
async function AcceptPractice() {
  try {
    let commentText = document.getElementsByClassName('commentText')[0];
    const res = await fetch(origin+ 'praksa/accept', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        comment:commentText.value,
        id:uid.textContent
      })
    })
    if (res.ok) {
      const result = await res.json();
      commentText.value =" ";
      alert("uspjeh")
      oPraksi.style.display= "none"
      hidden.classList.toggle('active');
      window.location.href ="/prakse.html";
    } 
  } catch (error) {
    console.log(error);
  }
}

/* Ocitaj sljedece cetiri prakse sa buttonom */
let num =4;
async function getPrakse2() {
  const res = await fetch(origin+ 'praksa/prakseAdmin?start='+num, {
    method: 'GET',
    credentials: 'include'
  });

  if (res.status == 200) {
    const result = await res.json();
  }
  if(res.status == 404) {
     console.log("nema podataka vise");
  }
  num+=4;
}


/* load next page  */
let nextPage = document.getElementsByClassName('nextPage');
for (let i = 0; i < nextPage.length; i++) {
  nextPage[i].addEventListener('click', () => {
    returnColors2(i)
    naslovInput.value =textareaTextArray[i].title;
    textareaText.textContent = textareaTextArray[i].content;;
  });
}

function returnColors(){
  for (let index = 0; index < stanjeBtns.length; index++) {
    stanjeBtns[index].style.backgroundColor = "#1F5294";
    stanjeBtns[index].style.color = "white";
  }
}

function returnColors2(target){
  for (let index = 0; index < nextPage.length; index++) {
    nextPage[index].style.backgroundColor = "#1F5294";
    nextPage[index].style.color = "white";
  }
  nextPage[target].style.backgroundColor = "wheat";
  nextPage[target].style.color = "black";
}
/* load next stanjeBtns  */

stanjeBtns[0].addEventListener('click', () => {
    returnColors()
    stanjeBtns[0].style.backgroundColor = "wheat";
    stanjeBtns[0].style.color = "black";
    while (praksaContainer.firstChild) {
      praksaContainer.removeChild(praksaContainer.lastChild);
    }
    generateCode(arrayPodaci.length,arrayPodaci,"Approved")
});

stanjeBtns[1].addEventListener('click', () => {
  returnColors()
  stanjeBtns[1].style.backgroundColor = "wheat";
  stanjeBtns[1].style.color = "black";
  while (praksaContainer.firstChild) {
    praksaContainer.removeChild(praksaContainer.lastChild);
  }
  generateCode(arrayPodaci.length,arrayPodaci,"Pending")
});

stanjeBtns[2].addEventListener('click', () => {
  returnColors()
  stanjeBtns[2].style.backgroundColor = "wheat";
  stanjeBtns[2].style.color = "black";
  while (praksaContainer.firstChild) {
    praksaContainer.removeChild(praksaContainer.lastChild);
  }
  generateCode(arrayPodaci.length,arrayPodaci,"Rejected")
});



let arrayPodaci=[];

/* Kreiraj 4 instance prakse */
function generateCode(length,podaci,target) {
  console.log(podaci);
  for (let i = 0; i < length; i++) {
    if(podaci[i].status==target){
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

      const liElement6 = document.createElement('li');
      liElement6.textContent = 'Komentar Mentora: ';
      const spanElement7 = document.createElement('span');
      spanElement7.classList.add('commentPlace');
      spanElement7.textContent = podaci[i].comment;
      liElement6.appendChild(spanElement7);

      
      ulElement.appendChild(liElement1);
      ulElement.appendChild(liElement2);
      ulElement.appendChild(liElement3);
      ulElement.appendChild(liElement4);
      ulElement.appendChild(liElement5);
      ulElement.appendChild(liElement6);
      
      informacijeDiv.appendChild(ulElement);
      
      const statusDiv = document.createElement('div');
      statusDiv.classList.add('status');
      
      const statusUlElement = document.createElement('ul');
      
      const statusLiElement1 = document.createElement('li');
      const h2Element = document.createElement('h2');
      h2Element.classList.add('statusText');
      h2Element.textContent = target;
      statusLiElement1.appendChild(h2Element);
      
      const statusLiElement2 = document.createElement('li');
      const spanElement6 = document.createElement('span');
      spanElement6.textContent = 'status prakse';
      statusLiElement2.appendChild(spanElement6);
      
      const statusLiElement3 = document.createElement('li');
      if(target == "Approved"){
        praksaContentDiv.style.backgroundColor= "rgba(0, 255, 0, 0.1)";
        praksaContentDiv.style.border= "0.3px rgba(0, 128, 0, 1) solid";
      }else if(target == "Rejected"){
        praksaContentDiv.style.border= "0.3px rgba(128, 0, 0, 1) solid";
        praksaContentDiv.style.backgroundColor= "rgba(255, 0, 0, 0.1)";
      }else{
        const aElement = document.createElement('a');
        /* aElement.setAttribute('href', ); */
        aElement.classList.add('clickBtn');
        aElement.textContent = 'Pogledaj sturčnu praksu';
        
        aElement.addEventListener('click',()=>{
          try {
            textareaTextArray[0] = {title: podaci[i].practice.day[1].title, content: podaci[i].practice.day[1].content}
            textareaTextArray[1] = {title: podaci[i].practice.day[2].title, content: podaci[i].practice.day[2].content}
            textareaTextArray[2] = {title: podaci[i].practice.day[3].title, content: podaci[i].practice.day[3].content}
            textareaTextArray[3] = {title: podaci[i].practice.day[4].title, content: podaci[i].practice.day[4].content}
            textareaTextArray[4] = {title: podaci[i].practice.day[5].title, content: podaci[i].practice.day[5].content}
            textareaTextArray[5] = {title: podaci[i].practice.day[6].title, content: podaci[i].practice.day[6].content}
            textareaTextArray[6] = {title: podaci[i].practice.day[7].title, content: podaci[i].practice.day[7].content}
            textareaTextArray[7] = {title: podaci[i].practice.day[8].title, content: podaci[i].practice.day[8].content}
            textareaTextArray[8] = {title: podaci[i].practice.day[9].title, content: podaci[i].practice.day[9].content}
          } catch (error) {
            console.log("error sa array textarea");
            textareaTextArray = [{title:"",content:""},
                              {title:"",content:""},
                              {title:"",content:""},
                              {title:"",content:""},
                              {title:"",content:""},
                              {title:"",content:""},
                              {title:"",content:""},
                              {title:"",content:""},
                              {title:"",content:""},]
          }  
          nameOfStudent.textContent =podaci[i].data.ime +" "+ podaci[i].data.prezime;
          naslovInput.value = podaci[i].practice.day[1].title;
          textareaText.textContent = podaci[i].practice.day[1].content;
          uid.textContent= podaci[i]._id
          hidden.classList.toggle('active');
          oPraksi.style.display= "block"
        })
        statusLiElement3.appendChild(aElement);
      }
     
      
     
      
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
 
}
