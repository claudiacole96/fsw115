axios.get("https://api.vschool.io/claudiaevans/todo")
    .then(res => {  
        for (let i=0; i<res.data.length; i++){
            const todoList = document.getElementById("todoList");
            const span = document.createElement("span");
            if (res.data[i].completed == true){
                span.innerHTML = res.data[i].title.strike();
            } else if (res.data[i].completed == false){
                span.innerHTML = res.data[i].title;
            }
            todoList.appendChild(span);
        }
    })

.catch(()=> console.log("error"));