let sectionButtons = document.querySelector("#buttons")
let sectionPokemons = document.querySelector("#pokemons")
let sectionInfoPokemons= document.querySelector("#infoPokemons")

const init = async() => {

    const response = await fetch("https://pokeapi.co/api/v2/type")
    const json = await response.json()
    
    const types = json.results
    
    let pokemonTypes = ""
    types.forEach(type => {
        pokemonTypes += `
        <button onclick="showPokemons('${type.name}')">${type.name}</button>
        `       
    }); 

    sectionPokemons.innerHTML = pokemonTypes
    sectionInfoPokemons.innerHTML = ""

}
init()

const showPokemons = async(type) => {
    
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
    const json = await response.json()
    
    const pokemons = json.pokemon
    
    let html = ""
    pokemons.forEach(pokemon => {
        html += `<button onclick="showInfoPokemons('${pokemon.pokemon.name}')">${pokemon.pokemon.name}</button>`
        
        sectionPokemons.innerHTML = html
        sectionInfoPokemons.innerHTML = ""

    });
    
}

const showInfoPokemons = async(pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const json = await response.json()
    
    console.log(json)
    
    const srcImg = json["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
    
    let button = ` <button onclick="toBack()" class="toBack"><-</button>`
    
    let divStats = ""
    const stats = json.stats
    stats.forEach(item => {
        divStats += `<p>${item.base_stat}</p>`
    });

    let lineBar = "";
    stats.forEach(item => {
        lineBar += `
        <div class="line-bar">
            <div class="bar" style="width: ${item.base_stat}%"></div>
        </div>
        `;
    });    

    let imgPokemons = `
    <h1>${json.name}</h1>   
    <img src="${srcImg}" alt="pokemon">
    `
    
    let infoPokemons =`
    <p>Type</p>
    <h3>About</h3>
    <section id="info">
        <section id="about">
            <div>
                <div>${parseFloat(json.weight).toFixed(2).replace(".",",")} kg</div>
                <p>weight</p>
            </div>
            <div>
                <div>${parseFloat(json.height).toFixed(2).replace(".",",")} cm</div>
                <p>height</p>
            </div>
        </section>
        <section id="stats">
            <div id="title">
                <p>HP</p>
                <p>ATK</p>
                <p>DEF</p>
                <p>SATK</p>
                <p>SDEF</p>
                <p>SPD</p>
            </div>
            <div id="data">
                ${divStats}
            </div>
            <div id="bars">
                ${lineBar}
            </div>

        </section>
    </section>
    
    `

    sectionPokemons.innerHTML = ""
    sectionInfoPokemons.innerHTML = imgPokemons
    sectionInfoPokemons.innerHTML += infoPokemons

    // showLocalization(pokemon)
}
// const showLocalization = async(pokemon) => {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/encounters`)
//     const json = await response.json()

//     let localizations = ''

//     json.forEach(local => {
//         localizations += `
//         <li>${local.location_area.name}</li>   
//         `
//     });

//     const div = `
//     <div id="localizations">${localizations}</div>
//     `
//     sectionPokemons.innerHTML += div
// }

// const toBack = () => { 
//     window.location.reload() 
// }

