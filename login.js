
const toggleForm1 = document.getElementsByClassName('toggleForm')[0];
const toggleForm2 = document.getElementsByClassName('toggleForm')[1];
let container1 = document.getElementsByClassName('container')[0];
let container2 = document.getElementsByClassName('container')[1];
let forma1= document.getElementsByClassName('forms')[0];
let forma2= document.getElementsByClassName('forms')[1];

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

//toggleSwitch
let btn = document.getElementById('btn');
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



loginBtn.addEventListener("click", ()=>{
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    console.log(email + " "+ password);
});

loginBtn.addEventListener("click", Login);
regBtn.addEventListener("click", postInfo);

const baseUrl = "http://localhost:8080/users";
const postUrl = "http://localhost:8080/users";
const loginUrl = "http://localhost:8080/users/login";
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

    //fetch POST
    const res = await fetch(postUrl,{
        method: 'POST',
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
        console.log("uspjesno si kreirao profil");
    }
   
   /*  const data = await res.json();
    testH2.textContent = data.name; */

}

async function Login(e){
    e.preventDefault();
    //fetch POST
    
    const res = await fetch(loginUrl,{
        method: 'POST',
        headers:{
            "Content-Type": 'application/json'
        },
      
        body:JSON.stringify({
            email: form1[0].value,
            password: form1[1].value
        })
        
      
      
    })
    console.log(res)
    if ( res.redirected) {
        window.location.href = res.url;
        return;
     }
    if(res.status == 500){
        alert("Kriva lozinka")
    }
    else{
        console.log("uspjesna prijava");
    }
   
   /*  const data = await res.json();
    testH2.textContent = data.name; */

}