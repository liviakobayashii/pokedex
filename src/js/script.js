let sectionButtons = document.querySelector("#buttons")
let sectionPokemons = document.querySelector("#pokemons")
let sectionInfoPokemons= document.querySelector("#infoPokemons")

// const clicked = async(pokemon) => {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
//     const json = await response.json()

//     console.log(json.types["0"]["type"]["name"])
// }
const init = async() => {

    const response = await fetch("https://pokeapi.co/api/v2/type")
    const json = await response.json()
    
    const types = json.results
    
    let html = ""
    types.forEach(type => {
        html += `
        <button onclick="showPokemons('${type.name}')">${type.name}</button>
        `       
    }); 

    sectionButtons.innerHTML = html
    sectionPokemons.innerHTML =""
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
        
        sectionButtons.innerHTML = ""
        sectionPokemons.innerHTML = html
        sectionInfoPokemons.innerHTML = ""

    });
    
}

const showInfoPokemons = async(pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const json = await response.json()

    const srcImg = json["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
    
    let html = `
    <h1>${json.name}</h1>   
    <img src="${srcImg}" alt="pokemon">
    <h3>Located at:</h3>
    `

    sectionPokemons.innerHTML =""
    sectionButtons.innerHTML = ""
    sectionInfoPokemons.innerHTML = html

    showLocalization(pokemon)
}
const showLocalization = async(pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/encounters`)
    const json = await response.json()

    console.log(json)

    json.forEach(local => {
        let localization = `
        <li>${local.location_area.name}</li>   
        `
        sectionInfoPokemons.innerHTML += localization
    });

}

// buttonTeste.addEventListener("click", (e) => {
//     clicked()
// })
