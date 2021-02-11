//get request with delete and edit icon event listeners
let defaultTodoUrl = "https://api.vschool.io/claudiaevanscapstone/todo";

const getTodoRequest = (address) => {
    axios.get(address)
    .then(res => {
        res.data.map(i => {
            let todoList = document.getElementById("todoDiv");
            let mainDiv = document.createElement("div");
            mainDiv.classList.add("todos");
            todoList.appendChild(mainDiv);

            let todoDiv = document.createElement("div");
            todoDiv.id = i._id;
            todoDiv.classList.add("todoItem");
            mainDiv.appendChild(todoDiv);
            //pokemon
            let spanPoke = document.createElement("span");
            if (i.completed == true) {
                spanPoke.innerHTML = i.title.strike();
                todoDiv.classList.add("completed");
            } else if (i.completed == false) {
                spanPoke.innerHTML = i.title;
            }
            spanPoke.classList.add("pokemon");
            //description
            let spanDescription = document.createElement("span");
            spanDescription.innerHTML = i.description;
            spanDescription.classList.add("description");
            //price
            let spanPrice = document.createElement("span");
            spanPrice.innerHTML = `$${i.price}`;
            spanPrice.classList.add("price");
            //pokemon complete and uncomplete function
            spanPoke.addEventListener("click", () => {
                if (spanPoke.innerHTML == i.title) {
                    spanPoke.innerHTML = i.title.strike();
                    todoDiv.classList.add("completed");
                    let sold = document.getElementById("pokeSold");
                    axios.put("https://api.vschool.io/claudiaevanscapstone2/todo/6025aee9ee6f8d3fc3fec41c", {price: parseInt(sold.innerHTML) + 1})
                        .then(res => console.log(res.data))
                        .catch(error => console.log(error))
                    axios.put(`${address}/${todoDiv.id}`, {completed: true})
                        .then (res => {
                            console.log(res);
                            location.reload()
                        })
                        .catch (error => console.log(error))
                } else {
                    spanPoke.innerHTML = i.title;
                    todoDiv.classList.remove("completed");
                    let sold = document.getElementById("pokeSold");
                    axios.put("https://api.vschool.io/claudiaevanscapstone2/todo/6025aee9ee6f8d3fc3fec41c", {price: parseInt(sold.innerHTML) - 1})
                        .then(res => console.log(res.data))
                        .catch(error => console.log(error))
                    axios.put(`${address}/${todoDiv.id}`, {completed: false})
                        .then(res => {
                            console.log(res);
                            location.reload()
                        })
                        .catch(error => console.log(error))
                }
            })
            //append spans
            todoDiv.appendChild(spanPoke);
            todoDiv.appendChild(spanDescription);
            todoDiv.appendChild(spanPrice);
            //delete icon and div
            let iconDiv = document.createElement("div")
            iconDiv.style.gridColumn = "14/-1";
            mainDiv.appendChild(iconDiv)
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
        })
    })
    .catch(error => console.log(error))
    //post new pokemon todo item
    let pokeAddForm = document.getElementById("addTodoForm");
    let pokeAdd = document.getElementById("todoAdd");
    pokeAdd.addEventListener("click", (e) => {
        e.preventDefault();
        let newPoke = {
            title: pokeAddForm.pokemon.value,
            description: pokeAddForm.description.value,
            price: pokeAddForm.price.value
        }
        axios.post(address, newPoke)
        .then(res => {
            console.log(res.data);
            location.reload();
        })
        .catch(error => console.log(error))
    })
    //remove all sold/completed
    let todoDeleteComplete = document.getElementById("todoDeleteComplete");
    todoDeleteComplete.addEventListener("click", () => {
        let completeTodos = document.getElementsByClassName("completed");
        for (i=0; i<completeTodos.length; i++) {
            axios.delete(`${address}/${completeTodos[i].id}`)
            .then(res => {
                console.log(res);
                location.reload();
            })
            .catch(error => console.log(error))
        }
    })
}

const getPokemon = (data) => {
    let pokeInput = document.getElementById("pokemon");
    data.data.results.map(i => {
        let option = document.createElement("option");
        option.innerHTML = i.name;
        option.value = i.name;
        pokeInput.appendChild(option);
    })
}

const getSoldData = (data) => {
    let soldInput = document.getElementById("pokeSold");
    soldInput.innerHTML = data.data[0].price;
}

async function getData () {
    try {
        let pokemonData = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=152");
        let pokemonSoldData = await axios.get("https://api.vschool.io/claudiaevanscapstone2/todo")
        getTodoRequest(defaultTodoUrl);
        getPokemon(pokemonData);
        getSoldData(pokemonSoldData);
    }
    catch(error) {
        console.log(error)
    }
}
getData();