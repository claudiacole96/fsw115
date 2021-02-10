let characterList = document.getElementById("characters");
let locationList = document.getElementById("locations");
let episodeList = document.getElementById("episodes");

let appendData = (res, loc) => {
    let data = res.data.results;
    data.map(i => {
        let li = document.createElement("li");
        li.innerHTML = i.name;
        loc.appendChild(li);
    })
}

async function getData () {
    try {
        let characters = await axios.get("https://rickandmortyapi.com/api/character");
        let locations = await axios.get("https://rickandmortyapi.com/api/location");
        let episodes = await axios.get("https://rickandmortyapi.com/api/episode");
        appendData(characters, characterList);
        appendData(locations, locationList);
        appendData(episodes, episodeList);
    }
    catch(error) {
        console.log(error)
    }
}
getData();