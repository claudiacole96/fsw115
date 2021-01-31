const xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.vschool.io/pokemon", true);
xhr.send();

xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const JSONdata = xhr.responseText;
        const data = JSON.parse(JSONdata);
        const obj = data.objects[0];
        const pokemon = obj.pokemon;
        console.log(pokemon);
        listPokemon(pokemon);
    }
}

const listPokemon = (arr) => {
    arr.map( (item) => {
        let div = document.createElement("div");
        let h2 = document.createElement("h2");
        let p = document.createElement("p");

        let list = document.getElementById("pokemon-list");
        list.appendChild(div);
        div.appendChild(h2);
        div.appendChild(p);

        h2.innerHTML = item.name;
        p.innerHTML = item.resource_uri;
    })
}