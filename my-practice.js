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

  const button2 = document.getElementById('button2');
const panel = document.getElementById('panel');
const panelYes = document.getElementById('panel-yes');
const panelNo = document.getElementById('panel-no');
const overlay2 = document.getElementById('overlay2');

button2.addEventListener('click', () => {
  panel.style.display = 'block';
  overlay2.style.display = 'block';
});



panelNo.addEventListener('click', () => {
  // Handle "No" button click
  panel.style.display = 'none';
  overlay2.style.display = 'none';
});

  
  let submited = false;
  let logoutBtn= document.getElementsByClassName("subMenu2")[0];
  let naslovInput = document.getElementById('title2');
  logoutBtn.addEventListener("click", Logout);
  let root = origin+ "img/";
  let username= document.querySelectorAll(".username");
  const avatar = document.getElementById('avatar');

  //LOADING ANIMATION
  let overlay = document.getElementsByClassName("overlay")[0];
  let  hidden= document.getElementsByClassName("hiddenContent")[0];
  

  let textarea= document.getElementsByTagName("textarea")[0];
  let text = document.getElementsByClassName('text')[0];
  let numOfDays = 1;
  var observe;
if (window.attachEvent) {
  observe = function (element, event, handler) {
      element.attachEvent('on'+event, handler);
  };
}
else {
  observe = function (element, event, handler) {
      element.addEventListener(event, handler, false);
  };
}

async function CheckSession(){
  const res = await fetch(origin + 'practice/check',{
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
              submited = result.practice;
              if(submited=="true"){
                button.remove();
                button2.remove();
              }
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


function init () {
 
  function resize () {
      text.style.height = 'auto';
      text.style.height = text.scrollHeight+'px';
  }
  
  function delayedResize () {
      window.setTimeout(resize, 0);
  }
  observe(text, 'change',  resize);
  observe(text, 'cut',     delayedResize);
  observe(text, 'paste',   delayedResize);
  observe(text, 'drop',    delayedResize);
  observe(text, 'keydown', delayedResize);

  //text.focus();
  //text.select();
  resize();
}

let button = document.getElementById("button");
button.addEventListener("click", ()=>{
  if (textarea.hasAttribute('readonly')) {
      textarea.removeAttribute('readonly')
      text.style.border= "solid #1F5294 2px";
      text.style.boxShadow=" 0px 2px 2px #1F5294";
      button.innerText ="Završi";
  } 
  else {
  textarea.setAttribute('readonly', 'readonly');
  let content = textarea.value;
  let test = 2;
  //  post request na server
  

fetch(origin+ 'practice', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
       day: numOfDays,
       title:naslovInput.value,
      content:content 
  })
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  // handle success response
})
.catch(error => {
  // handle error
});
  text.style.boxShadow=" 0px 0px 0px #000";
  button.innerText ="Uredi";
}
})

panelYes.addEventListener('click', () => {
    panel.style.display = 'none';
    overlay2.style.display = 'none';
    button.setAttribute("disabled", "disabled");
    button2.setAttribute("disabled", "disabled");
    fetch(origin+ 'practice/predaj', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        window.location.reload();
        // handle success response
      })
      .catch(error => {
        // handle error
      });
  });




let dayField= document.querySelectorAll(".day");
  
let clickedDan;
dayField.forEach((dan, index) => {
dan.addEventListener('click', () => {
  if (clickedDan) {
    clickedDan.style.background = '';
  }
  if (clickedDan !== dan) {
    clickedDan = dan;
    dan.style.background = 'rgb(243, 228, 141)';
    getTextarea(dan.innerText);
    numOfDays = dan.innerText;
    init();
  } else {
    dan.style.background = 'rgb(243, 228, 141)';
    
  }

 
  dayField.forEach((otherDan, otherIndex) => {
    if (index !== otherIndex && otherDan !== clickedDan) {
      otherDan.style.background = '#F2F4F3';
    }
  });
});
});





async function getTextarea(day){
  const res = await fetch(origin+ 'practice/'+day,{
      method: 'GET',
      credentials: 'include'     
  })
  if (res.ok) {
      const result = await res.json();
      textarea.value = result.content;
      naslovInput.value = result.title;
  }
  else{
      textarea.value = "";
      naslovInput.value="";
  }
}

