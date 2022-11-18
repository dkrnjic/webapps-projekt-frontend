
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


/* 
loginBtn.addEventListener("click", ()=>{
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    console.log(email + " "+ password);
});

regBtn.addEventListener("click", getInfo);

const baseUrl = "http://localhost:8080/users";
let testH2 = document.getElementById("test");

async function getInfo(e){
    e.preventDefault();
    const res = await fetch(baseUrl,{
        method: 'GET'
    })
    console.log(res)
    const data = await res.json();
    testH2.textContent = data.name;

} */