const origin = "http://localhost:8080/";

const postData = origin + "profilemaker/postdata";
const postImg = origin + "profilemaker/upload";
const root = origin + "img/";
let changedImg = false;

const overlay = document.getElementsByClassName("overlay")[0];
const hidden = document.getElementsByClassName("hiddenContent")[0];

const radioButtons = document.querySelectorAll('input[name="gender"]');
const submitButton = document.getElementsByClassName("my-button")[0];
let data = {
  ime: "",
  prezime: "",
  rodenje: "",
  spol: "",
  nacionalnost: "",
  lokacija: "",
  mob: "",
  profesija: "",
  about: "",
  vjestine: "",
  avatar: ""
};
const input = document.getElementById("image_uploads");
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
    console.log("No image selected");
  } else {
    for (const file of curFiles) {
      if (validFileType(file)) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          changedImg = true;
          avatar.src = reader.result;
        });
        reader.readAsDataURL(input.files[0]);
      } else {
        console.log("Wrong file type");
      }
    }
  }
}

async function CheckToken() {
  const token = localStorage.getItem('token');
  const res = await fetch(origin + 'home/check', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  });

  if (res.ok) {
    const result = await res.json();
    console.log(result);
    document.getElementById("name").value = result.data.ime;
    document.getElementById("lastname").value = result.data.prezime;
    document.getElementById("dateofbirth").value = result.data.rodenje;
    document.getElementById("nationality").value = result.data.nacionalnost;
    document.getElementById("phone").value = result.data.mob;
    document.getElementById("location").value = result.data.lokacija;
    document.getElementById("profession").value = "";
    document.getElementById("about").value = result.data.about;
    document.getElementById("skills").value = result.data.vjestine;
    avatar.src = root + result.data.avatar;
    data.avatar = result.data.avatar;

    for (const radioButton of radioButtons) {
      if (radioButton.value === result.data.spol) {
        radioButton.checked = true;
        break;
      }
    }

    overlay.style.display = "none";
    hidden.classList.toggle('active');
  } else {
    console.log("Unable to fetch name");
  }
}
CheckToken();

submitButton.addEventListener("click", Post);

async function Post(e) {
  e.preventDefault();
  data.ime = document.getElementById("name").value;
  data.prezime = document.getElementById("lastname").value;
  data.rodenje = document.getElementById("dateofbirth").value;
  data.nacionalnost = document.getElementById("nationality").value;
  data.mob = document.getElementById("phone").value;
  data.lokacija = document.getElementById("location").value;
  data.profesija = document.getElementById("profession").value;
  data.about = document.getElementById("about").value;
  data.vjestine = document.getElementById("skills").value;

  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      data.spol = radioButton.value;
      break;
    }
  }

  const formData = new FormData();
  formData.append('image', input.files[0]);

  try {
    const token = localStorage.getItem('token');
    const res = await fetch(postImg, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: formData,
      mode: 'cors',
    });
  
    console.log(res); // Add this line to inspect the response
  
    if (!res.ok) {
      throw new Error(res.statusText);
    } else {
      data.avatar = await res.json();
    }
  } catch (err) {
    console.log("No new image");
  }

  /* console.log(data.avatar); */
  const token = localStorage.getItem('token');
  const res = await fetch(postData, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      data
    })
  });
  
  console.log(res);
  if (res.ok) {
    console.log("Profile updated");
    window.location.href = "/home.html";
    return;
  } else {
    console.log("Something went wrong");
    console.log(res);
  }
}
