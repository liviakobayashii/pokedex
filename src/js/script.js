let sectionPokemons = document.querySelector("#pokemons")

var lastPokemonTypePicked = null

const init = async () => {

    const response = await fetch("https://pokeapi.co/api/v2/type")
    const json = await response.json()

    const types = json.results

    let pokemonTypes = ""
    
    types.forEach(type => {
        pokemonTypes += `
        <button onclick="showPokemons('${type.name}')">${type.name}</button>
        `
    });

    const render = `
    <div class="divPokemons">
        <h1>Pokémon Types</h1>
        ${pokemonTypes}
    </div>
    `

    sectionPokemons.innerHTML = render
}

const showPokemons = async (type) => {

    lastPokemonTypePicked = type

    const buttonToBack = `
    <div id="backToHome">
        <button onclick="init()" class="toBack"><-</button>
    </div>
    `

    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
    const json = await response.json()

    const pokemons = json.pokemon

    let html = ""
    pokemons.forEach(pokemon => {
        html += `<button onclick="showInfoPokemons('${pokemon.pokemon.name}')">${pokemon.pokemon.name}</button>`

        const render = `
        <div class="divPokemons">
            <h1>Pókemons of ${lastPokemonTypePicked}</h1>
            ${html}
        </div>
        `

        sectionPokemons.innerHTML = buttonToBack
        sectionPokemons.innerHTML += render
    });

}

const showInfoPokemons = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const json = await response.json()

    const buttonToBack = `<button onclick="toBack()" class="toBack"><-</button>`

    const srcImg = json["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]

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

    let pokemonPerfil = `
    <section id="pokemonPerfil">
        <h1>${json.name}</h1>   
        <img src="${srcImg}" alt="pokemon" id="imgPerfilPokemon">
        <div id="divType">${divType}</div>
    </section>
        `

    let infoPokemons = `
        
        
        <section id="info">
        
            <h3>About</h3>
            <section id="about">
                <div>
                    <div>${transformMeasures(json.weight)} kg</div>
                    <p>weight</p>
                </div>
                <div>
                    <div>${transformMeasures(json.height)} cm</div>
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

    const render = `${buttonToBack}
        <div id="pokemonData">
        ${pokemonPerfil}
        ${infoPokemons}
        </div>`

    sectionPokemons.innerHTML = render

}

const toBack = () => {
    showPokemons(lastPokemonTypePicked)
}

const transformMeasures = (value) => {
    return parseFloat(value).toFixed(2).replace(".", ",") || '0,00'
}

init()