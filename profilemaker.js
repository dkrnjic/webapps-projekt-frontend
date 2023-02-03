const postData = "http://localhost:8080/profilemaker/postdata";
let submitButton= document.getElementsByClassName("my-button")[0];
let ime,prezime;

async function CheckSession(){
    const res = await fetch('http://localhost:8080/profilemaker/check',{
        method: 'GET',
        credentials: 'include'     
    })
    if (res.redirected) {
        console.log("Nema session");
        window.location.href = res.url;
        return;
     }
     else{
        console.log("ostajes noice profilemaker");
    }
    }
    CheckSession();

submitButton.addEventListener("click", Post);


async function Post(e){//fetch POST
    e.preventDefault();
    console.log();
 
    const res = await fetch(postData,{
        method: 'POST',credentials: 'include',
        headers:{
            "Content-Type": 'application/json'
        },
        body:JSON.stringify({
            ime: document.getElementById("name").value,
            prezime: document.getElementById("lastname").value
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

