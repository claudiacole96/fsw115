axios.get("https://api.vschool.io/claudiaevans/todo")
  .then(res => {  
    for (let i=0; i<res.data.length; i++){
      const h1 = document.createElement("h1");
      if (res.data[i].completed == true){
        h1.innerHTML = res.data[i].title.strike();
      } else if (res.data[i].completed == false){
        h1.innerHTML = res.data[i].title;
      }
      document.body.append(h1);
    }
  })
  
  .catch(()=> console.log("error"));