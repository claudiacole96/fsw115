//get request with delete and edit icon event listeners
let defaultTodoUrl = "https://api.vschool.io/claudiaevans/todo";

const getTodoRequest = (address) => {
    axios.get(address)
    .then(res => {  
        for (let i=0; i<res.data.length; i++){
            let todoList = document.getElementById("todoDiv");
            let mainDiv = document.createElement("div");
            mainDiv.classList.add("todos");
            todoList.appendChild(mainDiv);

            let todoDiv = document.createElement("div");
            todoDiv.id = res.data[i]._id;
            todoDiv.classList.add("todoItem");
            mainDiv.appendChild(todoDiv);

            let spanTitle = document.createElement("span");
            if (res.data[i].completed == true){
                spanTitle.innerHTML = res.data[i].title.strike();
                todoDiv.classList.add("completed");
            } else if (res.data[i].completed == false){
                spanTitle.innerHTML = res.data[i].title;
            }
            spanTitle.classList.add("title");
            let spanDescrip = document.createElement("span");
            spanDescrip.innerHTML = res.data[i].description;
            spanDescrip.classList.add("description");
            let spanPrice = document.createElement("span");
            spanPrice.innerHTML = `$${res.data[i].price}`;
            spanPrice.classList.add("price");

            //complete and uncomplete todos
            spanTitle.addEventListener("click", () => {
                if (spanTitle.innerHTML == res.data[i].title) {
                    spanTitle.innerHTML = res.data[i].title.strike();
                    todoDiv.classList.add("completed");
                    axios.put(`${address}/${todoDiv.id}`, {completed: true})
                        .then(res => console.log(res.data))
                        .catch(error => console.log(error))
                } else {
                    spanTitle.innerHTML = res.data[i].title;
                    todoDiv.classList.remove("completed")
                    axios.put(`${address}/${todoDiv.id}`, {completed: false})
                        .then(res => console.log(res.data))
                        .catch(error => console.log(error))
                }
                
            })
            todoDiv.appendChild(spanTitle);
            todoDiv.appendChild(spanDescrip);
            todoDiv.appendChild(spanPrice);

            let iconDiv = document.createElement("div");
            iconDiv.style.gridColumn = "14/-1";
            mainDiv.appendChild(iconDiv);

            //delete button
            let deleteIcon = document.createElement("i");
            deleteIcon.name = todoDiv.id;
            deleteIcon.classList.add("delete");
            deleteIcon.classList.add("fas");
            deleteIcon.classList.add("fa-minus-circle");
            deleteIcon.addEventListener("click", (e) => {
                axios.delete(`${address}/${e.target.name}`)
                .then(res => {
                    console.log(res);
                    location.reload();
                })
                .catch(error => console.log(error))
            })
            iconDiv.appendChild(deleteIcon);
        }
    })
    .catch(()=> console.log("error"))

    //axios post new todo function
    let todoAddForm = document.getElementById("addTodoForm");
    let todoAdd = document.getElementById("todoAdd");
    todoAdd.addEventListener("click", (e) => {
        console.log(todoAddForm.title.value);
        e.preventDefault();
        let newTodo = {
            title: todoAddForm.title.value,
            description: todoAddForm.description.value,
            price: todoAddForm.price.value
        };
        axios.post(address, newTodo)
            .then(res => {
                console.log(res.data);
                location.reload();
            })
            .catch(error => console.log(error))
    })

    //remove all completed from list button function
    let todoDeleteComplete = document.getElementById("todoDeleteComplete");
    todoDeleteComplete.addEventListener("click", () => {
        let completedTodos = document.getElementsByClassName("completed");
        for (i=0; i<completedTodos.length; i++) {
            axios.delete(`${address}/${completedTodos[i].id}`)
                .then(res => {
                    console.log(res);
                    location.reload();
                })
                .catch(error => console.log(error))
        }
    })
}

getTodoRequest(defaultTodoUrl);



/* Notes

function to edit todo

*/