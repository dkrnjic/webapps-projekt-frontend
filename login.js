
//test btn
const testBtn = document.getElementById('testBtn');
let container1 = document.getElementsByClassName('container')[0];
let container2 = document.getElementsByClassName('container')[1];

testBtn.addEventListener('click' ,() => {
    container1.classList.toggle('active')
    container2.classList.toggle('active')
    console.log("radi");
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
