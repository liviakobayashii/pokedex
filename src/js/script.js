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

    });
    
}

const showInfoPokemons = async(pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const json = await response.json()

    console.log(json)

    const srcImg = json["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
    
    let button = ` <button onclick="toBack()" class="toBack"><-</button>`

    let imgPokemons = `
    <h1>${json.name}</h1>   
    <img src="${srcImg}" alt="pokemon">
    `
    
    let infoPokemons =`
    <p>Type</p>
    <h3>About</h3>
    <section id="about">
        <div>
            <div>${parseFloat(json.weight).toFixed(2)}</div>
            <p>weight</p>
        </div>
        <div>
            <div>${parseFloat(json.height).toFixed(2)}</div>
            <p>height</p>
        </div>
    </section>
    
    `

    sectionPokemons.innerHTML = imgPokemons
    sectionPokemons.innerHTML += infoPokemons

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

