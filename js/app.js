"use strict";

let id = 0;  // Se utiliza para saber el nº de pokemon a adivinar
let cantidadAcertados = 0;  // Se utiliza para saber cuantos pokemons fueron adivinados
let cantidadEncuestados = 0;  // Se utiliza para saber cuantos pokemons se intentaron adivinar
const text = document.getElementById("resultText")
const img = document.getElementById("imgpokemon")
const puntaje = document.getElementById("puntaje")
// // Variables used to modify info from pokemon card
// const pokeCard = document.querySelector('#data-poke-card');
// const pokeName = document.querySelector('#data-poke-name');
// const pokeId = document.querySelector('#data-poke-id');
// const pokeTypes = document.querySelector('#data-poke-types');
// const pokeStats = document.querySelector('#data-poke-stats');


let currentPokemon;
let currentPokemonStats;
/**
 * The function "startProcess" validates user input and fetches the stats of a Pokemon if the input is
 * valid. This is the main function of the program
 * @param pokeInput - The `pokeInput` parameter is the input provided by the user, which is expected to
 * be a string representing a Pokémon name or ID.
 */

async function startProcess(pokeInput) {
    const validationResult = validate(pokeInput);

    if (validationResult.valid) {
      const pokemonId = validationResult.id;
      currentPokemonStats = await fetchPokemon(pokemonId);
      fillCard(currentPokemonStats)
    }
}

/**
 * The function `fillCard` takes in a `currentPokemonStats` object and updates the HTML elements on the
 * page with the corresponding data.
 * @param currentPokemonStats - The `currentPokemonStats` parameter is an object that contains
 * information about a specific Pokemon. It has the following properties:
 */
function fillCard(currentPokemonStats) {
    const card = document.querySelector('#skills-description')
    card.style = ""
    const pokeName = document.querySelector('#data-poke-name');
    // const pokeCard = document.querySelector('#data-poke-card');
    const pokeId = document.querySelector('#data-poke-id');
    const pokeTypes = document.querySelector('#data-poke-types');
    const pokeStats = document.querySelector('#data-poke-stats');
    
    pokeName.textContent = currentPokemonStats.name;
    pokeId.textContent = currentPokemonStats.index;
    
    const typeElement = document.createElement("div");
    typeElement.classList.add("type");
    typeElement.textContent = currentPokemonStats.type;
    pokeTypes.innerHTML = `<ul style="list-style: none;">${currentPokemonStats.types.map(type => `<li>${type}</li>`).join('')}</ul>`;
    pokeTypes.appendChild(typeElement);
    
    pokeStats.innerHTML = "";
    for (const attribute in currentPokemonStats.attributes) {
        const statElement = document.createElement("div");
        statElement.classList.add("stat");
        statElement.textContent = `${attribute}: ${currentPokemonStats.attributes[attribute]}`;
        pokeStats.appendChild(statElement);
    }
}



/**
 * The function fetchPokemon fetches data about a specific Pokemon from the PokeAPI and returns an
 * object containing the Pokemon's stats.
 * @param pokemonId - The `pokemonId` parameter is the ID of the Pokemon that you want to fetch. It is
 * used to construct the URL for the API request.
 * @returns an instance of the `PokemonStats` class, which is created using the data fetched from the
 * PokeAPI.
 */
async function fetchPokemon(pokemonId){
    const parsedId = parseInt(pokemonId, 10); // Eliminar los ceros a la izquierda
    const url = `https://pokeapi.co/api/v2/pokemon/${parsedId}`;
    const response = await fetch(url, {});
    const data = await response.json();
    currentPokemonStats = new PokemonStats(data);
    return currentPokemonStats   
}

// ----------------------- Validating input starts -----------------------
/**
 * The function "validate" checks if the user input matches the current Pokemon's name and returns a
 * validation result along with the Pokemon's ID.
 * @param pokeInput - The `pokeInput` parameter is the user's input for guessing the name of a Pokemon.
 * @returns The function `validate` returns an object with two properties: `valid` and `id` if the
 * input is correct, and it returns `false` if the input is incorrect.
 */
function validate(pokeInput) {
    if (pokeInput.length < 1) {
        alert("Enter a Value");
        return false;
    }
    if (!currentPokemon) {
        alert("No pokemon selected. Click Restart to choose a pokemon.");
        return false;
    }
    let [aciertos, encuestados]  = getGuessed();
    cantidadEncuestados++;

    const pokeNameLower = currentPokemon.name.toLowerCase();
    let responseMessage;

    if (pokeInput.toLowerCase() === pokeNameLower) {    
        cantidadAcertados++;
        localStorage.setItem('cantidadAcertados' , String(++aciertos) );
        img.style.filter = "contrast(100%)";
        responseMessage =  `Congratulations, it's ${currentPokemon.name}`;
        setTimeout( () => {
            restart()
        }, 5000);
        text.innerHTML = responseMessage;
        setScore(aciertos, encuestados)
        localStorage.setItem('cantidadEncuestados', String(++encuestados));
        return { valid: true, id: currentPokemon.id };
    } else {
        responseMessage =  `Failed, it's ${currentPokemon.name}`;
        setTimeout( () => {
            restart()
        }, 5000);
        text.innerHTML = responseMessage;
        setScore(aciertos, encuestados) 
        localStorage.setItem('cantidadEncuestados', String(++encuestados));
        return false;
    }
}

/**
 * The restart function resets the input, text, and image elements, selects a random Pokemon from a
 * JSON data set, and updates the image source and filter.
 * @returns the currentPokemon object.
 */
function restart() {
    let jsonDataParsed = JSON.parse(jsonData);
    let id = Math.floor(Math.random() * jsonDataParsed.length);
    input.value = ''
    text.innerHTML = "";
    img.innerHTML = "";
    
    currentPokemon = new Pokemon(jsonDataParsed[id]);

    img.src = currentPokemon.thumbnail;
    img.style.filter = "contrast(0%)";

    return currentPokemon;
}


/**
 * The function "getGuessed" retrieves the number of correct guesses and the total number of
 * participants from local storage.
 * @returns an array containing the number of "aciertos" (correct guesses) and the number of
 * "encuestados" (surveyed participants) stored in the local storage.
 */
function getGuessed() {
    let aciertos = localStorage.getItem('cantidadAcertados')
    let encuestados = localStorage.getItem('cantidadEncuestados')
    aciertos = aciertos == null ? 0 : aciertos;
    encuestados = encuestados == null ? 0 : encuestados;
    return [aciertos, encuestados];
}

/**
 * The function "setScore" updates the score displayed on the webpage based on the number of correct
 * answers and the total number of respondents.
 * @param aciertos - The parameter "aciertos" represents the number of correct answers or successes in
 * a survey or quiz.
 * @param encuestados - The parameter "encuestados" represents the total number of respondents or
 * participants in a survey or quiz.
 */
function setScore(aciertos, encuestados){
    puntaje.innerHTML = `Puntaje ${aciertos} de ${encuestados}`;
    puntaje.className = ((aciertos / encuestados) < 0.5 ?
                    "puntajeBajo" :
                    "");
}

// ----------------------- Validating input ends -----------------------