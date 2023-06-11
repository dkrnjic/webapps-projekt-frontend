const toggleForm1 = document.getElementsByClassName('toggleForm')[0];
const toggleForm2 = document.getElementsByClassName('toggleForm')[1];
let container1 = document.getElementsByClassName('container')[0];
let container2 = document.getElementsByClassName('container')[1];
let forma1= document.getElementsByClassName('forms')[0];
let forma2= document.getElementsByClassName('forms')[1];
let loginEnter= document.getElementsByClassName('form1')[1];
let registerEnter= document.getElementsByClassName('form2')[2];
let hiddenPanel = document.getElementsByClassName('hiddenElement')[0];
let origin = "https://webapps-projekt-backend-dkrnjic.onrender.com/"
/* let toggleBtn = document.getElementsByClassName('toggle-btn')[0]
let toggleBtn2 = document.getElementsByClassName('toggle-btn')[1] */
let target = "Student";

/* 
toggleBtn.addEventListener('click',()=>target=toggleBtn.value)
toggleBtn2.addEventListener('click',()=>target=toggleBtn2.value) */

let email,password;
let loginBtn= document.getElementsByClassName("my-button")[0];
let regBtn= document.getElementsByClassName("my-button")[1];

toggleForm1.addEventListener('click' ,() => {
    container1.classList.toggle('active')
    container2.classList.toggle('active')
    forma1.reset();   
    forma2.reset();   
})

toggleForm2.addEventListener('click' ,() => {
    container1.classList.toggle('active')
    container2.classList.toggle('active')
    forma1.reset();   
    forma2.reset();   
})

//enter triggers login
loginEnter.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      loginBtn.click();
    }
  }); 

  registerEnter.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      regBtn.click();
    }
  }); 

//toggleSwitch
/* let btn = document.getElementById('btn');
const toggleLeft = document.getElementsByClassName('toggle-btn')[0];
const toggleRight = document.getElementsByClassName('toggle-btn')[1];

toggleLeft.addEventListener('click' ,() => {
    btn.style.left = '0';
    toggleRight.style.color = '#333';  
    toggleLeft.style.color = 'white';  
    toggleLeft.style.transition ='.5s';
    toggleRight.style.transition ='.5s';
})

toggleRight.addEventListener('click' ,() => {
    btn.style.left = '120px';  
    toggleLeft.style.color = '#333';  
    toggleRight.style.color = 'white'; 
    toggleLeft.style.transition ='.5s';
    toggleRight.style.transition ='.5s';
})
 */


loginBtn.addEventListener("click", ()=>{
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    //console.log(email + " "+ password);
});

loginBtn.addEventListener("click", Login);
regBtn.addEventListener("click", postInfo);

const baseUrl = origin+"users";
const postUrl = origin+"register";
const authUrl = origin+"check";
const loginUrl =origin+ "login";
const cookies = origin+"cookies/setcookie";
Auth();

let testH2 = document.getElementById("test");

async function getInfo(e){
    e.preventDefault();
    const res = await fetch(baseUrl,{
        method: 'GET'
    })
    console.log(res)
    const data = await res.json();
    testH2.textContent = data.name;
}
    //Post registracija

let form2=[] 
form2[0]= document.getElementsByClassName("form2")[0];
form2[1]= document.getElementsByClassName("form2")[1];
form2[2]= document.getElementsByClassName("form2")[2];
let form1=[] 
form1[0]= document.getElementsByClassName("form1")[0];
form1[1]= document.getElementsByClassName("form1")[1];


function checkIfValid(item){
    if(item.value==""){
        item.style.outline = "1px solid red";
        return
    }
}

function isEmailValid(email) {
    const emailRegexp = new RegExp(
      /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
    )
    return emailRegexp.test(email)
  }

  function validate_password(pass, confirm_pass) {
    if (pass != confirm_pass) {
        return false;
    } else {
        return true;
    }
}




async function postInfo(e){
    e.preventDefault();
    for(let i=0;i<3;i++){
        if(form2[i].value==""){
            form2[i].style.outline = "1px solid red";
            return;
        }
        form2[i].style.outline = "1px solid black";
    }
  
    if(isEmailValid(form2[0].value) == false){
        form2[0].style.outline = "1px solid red";
        console.log("email nije validan");
        return
    } 
    if(validate_password(form2[1].value,form2[2].value)==false){
        form2[1].style.outline = "1px solid red";
        form2[2].style.outline = "1px solid red";
        console.log("sifre se ne poklapaju");
        return;
    }

    if (form2[1].value.length < 8 || form2[2].value.length < 8) {
        form2[1].style.outline = "1px solid red";
        form2[2].style.outline = "1px solid red";
        alert("lozinka mora imati najmanje 8 znakova")
        return;
      }

    //fetch POST
    const res = await fetch(postUrl,{
        method: 'POST',
        credentials: 'include',
        headers:{
            "Content-Type": 'application/json'
        },
        body:JSON.stringify({
            email: form2[0].value,
            password: form2[1].value
        })
    })
    console.log(res)
    if(res.status == 500){
        alert("taj email vec postoji u bazi")
    }
    else{
        //console.log("uspjesno si kreirao profil");
        if (res.ok) {
            hiddenPanel.style.display = "block";
            setTimeout(()=>window.location.href = "/profilemaker.html");
            return;
         }/* res.url,1000 */
         else{
            console.log("error na redirect");
            alert("error")
         }
    }
   
   /*  const data = await res.json();
    testH2.textContent = data.name; */

}




async function Auth(){//fetch POST
    const res = await fetch(authUrl,{
        method: 'GET',
        credentials: 'include'     
    })
    if (res.ok) {
        console.log("ima session");
        window.location.href = "/home.html";
        return;
     }
     else{
        console.log("nema session");
    }
}


async function Login(e){//fetch POST
    e.preventDefault();

    for(let i=0;i<2;i++){
        if(form1[i].value==""){
            form1[i].style.outline = "1px solid red";
            form1[i].placeholder="Ovo polje ne smije biti prazno";
            return;
        }
        form1[i].style.outline = "1px solid black";
    }
  
    if(isEmailValid(form1[0].value) == false){
        form1[0].style.outline = "1px solid red";
        alert("Neispravni email!")
        console.log("email nije validan");
        return
    } 
    const res = await fetch(loginUrl,{
        method: 'POST',credentials: 'include',
        headers:{
            "Content-Type": 'application/json'
        },
        body:JSON.stringify({
            email: form1[0].value,
            password: form1[1].value
        })  
    })
    if (res.ok) {
        //console.log(document.cookie.includes('user')); //jel ima cookie
        console.log("logged in");
        //window.location.href = "/home.html";
        return;
     }
    else{
        console.log("Bad credentials");
    }
}

    //test cookies
    
    function setCookie(){
        fetch(origin+ 'cookies/setcookie', {
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
    function getCookie(){
        fetch(origin+ 'cookies/getcookie', {
            method: 'GET',
            credentials: 'include'
            })
            .then(response => {
                console.log(response);
                //response.headers.get('Set-Cookie') will give you the set-cookie value
            } )
            .catch(error => console.error(error));
    }

    function clearCookie(){
        fetch(origin+ 'cookies/clearcookie', {
            method: 'GET',
            credentials: 'include'
            })
            .then(response => {
                console.log(response);
                //response.headers.get('Set-Cookie') will give you the set-cookie value
            } )
            .catch(error => console.error(error));
    }

    function getlocalcookie(){
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
            }
        var myCookie = getCookie("myCookie");
        console.log(myCookie);
    }
        
