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
        
    const srcImg = json["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
    
    let button = ` <button onclick="toBack()" class="toBack"><-</button>`

    let divStats = `<hr><h3 id="h3Stats">Stats</h3>`
    const stats = json.stats

    const statsNames = {
        hp: 'HP',
        attack: 'ATK',
        defense: 'DEF',
        'special-attack': 'SATK',
        'special-defense': 'SDEF',
        speed: 'SPD',
    }


    stats.forEach(item => {
        divStats += `
        <div class="characteristics">
            <p class="statsName">${statsNames[item.stat.name]}</p>

            <p class="statsValue">${item.base_stat}</p>

            <div class="line-bar">
                <div class="bar" style="width: ${item.base_stat}px"></div>
            </div>
        </div>
        `
    });
    
    const type = json.types
    
    let divType = ""

    type.forEach(item => {
        divType += `<p>${item.type.name}</p>`
    });

    let imgPokemons = `
    <h1>${json.name}</h1>   
    <img src="${srcImg}" alt="pokemon">
    <div id="divType">${divType}</div>
    `
    
    let infoPokemons =`

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
            <div id="data">
                ${divStats}
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

