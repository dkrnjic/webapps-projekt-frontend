let origin = "http://localhost:8080/"

const postData = origin+ "profilemaker/postdata";
const postImg = origin+ "profilemaker/upload";
const root = origin +"img/";
let changedImg = false;

//LOADING ANIMATION 
let overlay = document.getElementsByClassName("overlay")[0];
let  hidden= document.getElementsByClassName("hiddenContent")[0];

const radioButtons = document.querySelectorAll('input[name="gender"]');
const submitButton= document.getElementsByClassName("my-button")[0];
let data={ime:"",prezime:"",rodenje:"",spol:"",nacionalnost:"",lokacija:"",mob:"",profesija:"",about:"",vjestine:"",avatar:""};
let input= document.getElementById("image_uploads");
const preview = document.querySelector('.preview');
const avatar = document.getElementById('avatar');
const fileTypes = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
    "image/x-icon"
  ];
  
  
  function validFileType(file) {
    return fileTypes.includes(file.type);
  }
  function returnFileSize(number) {
    if (number < 1024) {
      return `${number} bytes`;
    } else if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)} KB`;
    } else if (number >= 1048576) {
      return `${(number / 1048576).toFixed(1)} MB`;
    }
  }

input.addEventListener('change', updateImageDisplay);
function updateImageDisplay() {
    const curFiles = input.files;
    if (curFiles.length === 0) {
      console.log("nema slike");
    } 
    else {    
      for (const file of curFiles) {
        if (validFileType(file)) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                changedImg=true;
                avatar.src = reader.result;
              });
            reader.readAsDataURL(input.files[0]);        
        } else {
          console.log("wrong type");
        }  
      }
    }
  }
  


async function CheckSession(){
    const res = await fetch(origin+ 'home/check',{
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
            //let i=0;
            const result = await res.json();
            console.log(result);
            document.getElementById("name").value = result.data.ime;
            document.getElementById("lastname").value = result.data.prezime;
            document.getElementById("dateofbirth").value = result.data.rodenje;
            document.getElementById("nationality").value = result.data.nacionalnost;
            document.getElementById("phone").value = result.data.mob
            document.getElementById("location").value = result.data.lokacija;
            document.getElementById("profession").value = "";
            document.getElementById("about").value = result.data.about;
            document.getElementById("skills").value = result.data.vjestine;
            avatar.src= root + result.data.avatar;
            data.avatar = result.data.avatar;
            
            for (const radioButton of radioButtons) {
                if (radioButton.value === result.data.spol) {
                    radioButton.checked = true;
                break;
                }
            }
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


submitButton.addEventListener("click", Post);


async function Post(e){//fetch POST
    e.preventDefault();
    console.log();
    data.ime = document.getElementById("name").value
    data.prezime= document.getElementById("lastname").value
    data.rodenje= document.getElementById("dateofbirth").value
    data.nacionalnost= document.getElementById("nationality").value
    data.mob= document.getElementById("phone").value
    data.lokacija= document.getElementById("location").value
    data.profesija= document.getElementById("profession").value
    data.about= document.getElementById("about").value
    data.vjestine= document.getElementById("skills").value
    /* 
    for(var key in data) {
        if(key==="mob")
            break;
        if(data[key].value === "") {
           console.log(key, data[key].value);
           data[key].style.outline = "1px solid red";
           alert("moras ispuniti polja sa *!")
           return
        }      
    }
 */
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
        data.spol = radioButton.value;
        break;
        }
    }
    
    const formData = new FormData();
    formData.append('image', input.files[0]);

    try {
      const res = await fetch(postImg, {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      else{
        data.avatar = await res.json();
      }
    

      //alert('Image uploaded successfully!');
    } catch (err) {
        console.log("nema nove slike");
      //error.textContent = err.message;
    }    
    console.log(data.avatar);
    const res = await fetch(postData,{
        method: 'POST',credentials: 'include',
        headers:{
            "Content-Type": 'application/json'
        },
        body:JSON.stringify({ 
            data
        })  
    })
    console.log(res)
    if (res.redirected) {
        console.log("updatean profil");
        window.location.href = res.url;
        return;
     }
    else{
        console.log("Nes ne valja");
    }
}


/* 
async function UploadImg(e){//fetch POST
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', input.files[0]);
    try {
      const res = await fetch(postImg, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }
      console.log(res);

      //alert('Image uploaded successfully!');
    } catch (err) {
      error.textContent = err.message;
    }    
} */