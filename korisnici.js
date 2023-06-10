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
const redirectBtn = document.getElementsByClassName("clickBtn")[0];

let logoutBtn= document.getElementsByClassName("subMenu2")[0];
let naslovInput = document.getElementById('title2');
logoutBtn.addEventListener("click", Logout);
let root = origin+ "img/";
let username= document.querySelectorAll(".username");
const avatar = document.getElementById('avatar');
let holder = document.getElementsByClassName('holder')[1];
let praksaContent = document.getElementsByClassName('praksaContent')[0];
let commentPlace = document.getElementsByClassName('commentPlace')[0]

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
            console.log("valj");
          }
          else{
            window.location.href ="/home.html";
            return;
          }
          for (var i = 0; i < username.length; i++) {
              username[i].innerText=result.data.ime + " " + result.data.prezime;
            
          }
          
          console.log("2");
      
         

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

async function getKorisnici() {
  const res = await fetch(origin+ 'users/getUsers', {
    credentials: 'include'
  });
  if (res.ok) {
    const result = await res.json();
    try {
      for (let i = 0; i < 4 && i < result.length; i++) {
        const korisnik = result[i];

        let imeLika = document.getElementsByClassName('imeLika')[i]
        imeLika.textContent = korisnik.data.ime+ " " + korisnik.data.prezime;

        let avatarOfUser = document.getElementsByClassName('avatarOfUser')[i]
        avatarOfUser.src= root + korisnik.data.avatar; 

        let statusPrakseText = document.getElementsByClassName('statusPrakseText')[i]
        statusPrakseText.textContent = korisnik.status;
        


        let clickBtn1 = document.getElementsByClassName('clickBtn1')[i]
        clickBtn1.addEventListener('click', async()=>{
          profileContainerFixed.style.display = "block"
          const res = await fetch(origin+ 'users/userprofile/'+korisnik._id,{
              method: 'GET',
              credentials: 'include'
            })
            if (res.ok) {
              const result = await res.json();
              console.log(result);
              info1[0].textContent =  result.data.ime + " " + result.data.prezime ;
              info1[1].textContent =  result.email ;
              info1[2].textContent =  result.data.about ;
              info1[3].textContent =  result.data.location ;
              info1[4].textContent =  result.data.mob;
              info1[5].textContent =  result.data.rodenje;
              info1[6].textContent =  result.status;
              profileImage.src= root + result.data.avatar; 
            }
            else{
                alert("neki bug")
            }

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
getKorisnici() 
let profileContainerFixed = document.getElementsByClassName('profileContainerFixed')[0];
let closeProfileInfo = document.getElementsByClassName('closeProfileInfo')[0];
let info1 = document.getElementsByClassName('info1');
let profileImage = document.getElementsByClassName('profileImage')[0];


closeProfileInfo.addEventListener('click',()=>{
  profileContainerFixed.style.display = "none"
  info1[0].textContent = "";
  info1[1].textContent = "" ;
  info1[2].textContent =  "" ;
  info1[3].textContent =  "";
  info1[4].textContent = "";
  info1[5].textContent =  "";
  info1[6].textContent = "";
  profileImage.src= ""; 
})


let num =4;
async function getKorisnici2() {
  const res = await fetch(origin+ 'users/getUsers?start='+num, {
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
    
    const newDiv = document.createElement('div');
    newDiv.classList.add('imgSection1');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title1');

    const titleP = document.createElement('p');
    titleP.classList.add('imeLika');
    titleP.textContent = result[i].data.ime + " "+ result[i].data.prezime ;

    titleDiv.appendChild(titleP);
    newDiv.appendChild(titleDiv);
    

    //posle title
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('contentPick');
    //treba slika vamo.
    let img = document.createElement('img');
    img.setAttribute('src',root + result[i].data.avatar);
    img.setAttribute('alt', altText);
    const ul = document.createElement('ul');
    newDiv.appendChild(img);

    const liNaziv = document.createElement('li');
    const nazivP = document.createElement('p');
    nazivP.textContent = 'Status prakse: ';
    const nazivSpan = document.createElement('span');
    nazivSpan.classList.add('nazivPoduzeca');
    nazivSpan.textContent = result[i].status;
    liNaziv.appendChild(nazivP);
    liNaziv.appendChild(nazivSpan);
    ul.appendChild(liNaziv);

    const liOdaberi = document.createElement('li');
    const odaberiA = document.createElement('a');
    
    odaberiA.textContent = 'Više o studentu';
    odaberiA.classList.add('clickBtn1');
    odaberiA.addEventListener('click', async()=>{
      profileContainerFixed.style.display = "block"
      /* console.log(result[0]._id); */
      const res = await fetch(origin + 'users/userprofile/'+result[i]._id,{
          method: 'GET',
          credentials: 'include'
        })
        if (res.ok) {
          const result2 = await res.json();
          info1[0].textContent =  result2.data.ime + " " + result2.data.prezime ;
          info1[1].textContent =  result2.email ;
          info1[2].textContent =  result2.data.about ;
          info1[3].textContent =  result2.data.location ;
          info1[4].textContent =  result2.data.mob;
          info1[5].textContent =  result2.data.rodenje;
          info1[6].textContent =  result2.status;
          profileImage.src= root + result2.data.avatar; 
        }
        else{
            alert("neki bug")
        }

      });
   
    liOdaberi.appendChild(odaberiA);
    ul.appendChild(liOdaberi);

    contentDiv.appendChild(ul);
    newDiv.appendChild(contentDiv);
    restoDiv.appendChild(newDiv);

    parentDiv.insertAdjacentElement('beforeend', restoDiv);
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
  getKorisnici2() 
})



