/*   
   async function Test22(){
    const res = await fetch('http://localhost:8080/home/images')
    .then((res) => {
      if (!res.ok) {
        console.log("Nema avatar");
        throw new Error(res.statusText);
        
      }
      return res.blob();
    })
    .then((blob) => {
      avatar.src=URL.createObjectURL(blob);
    })
    .catch((err) => {
      console.error(err);
    });
    }
  
 */