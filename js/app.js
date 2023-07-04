"use strict";

let id = 0;  // Se utiliza para saber el nº de pokemon a adivinar
let cantidadAcertados = 0;  // Se utiliza para saber cuantos pokemons fueron adivinados
let cantidadEncuestados = 0;  // Se utiliza para saber cuantos pokemons se intentaron adivinar
const text = document.getElementById("resultText")
const img = document.getElementById("imgpokemon")
const puntaje = document.getElementById("puntaje")


let currentPokemon;

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

function validate(pokeInput) {
    if (pokeInput.length < 1) {
        alert("Enter a Value");
        return;
    }
    if (!currentPokemon) {
        alert("No pokemon selected. Click Restart to choose a pokemon.");
        return;
    }
    let [aciertos, encuestados]  = getGuessed();
    cantidadEncuestados++;

    console.log(currentPokemon.name)

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
    } else {
        responseMessage =  `Failed, it's ${currentPokemon.name}`;
        setTimeout( () => {
            restart()
        }, 5000);
    }
    text.innerHTML = responseMessage;
    setScore(aciertos, encuestados)
    localStorage.setItem('cantidadEncuestados', String(++encuestados));
}

function getGuessed() {
    let aciertos = localStorage.getItem('cantidadAcertados')
    let encuestados = localStorage.getItem('cantidadEncuestados')
    aciertos = aciertos == null ? 0 : aciertos;
    encuestados = encuestados == null ? 0 : encuestados;
    return [aciertos, encuestados];
}

function setScore(aciertos, encuestados){
    console.log('Setting score')
    puntaje.innerHTML = `Puntaje ${aciertos} de ${encuestados}`;
    puntaje.className = ((aciertos / encuestados) < 0.5 ?
                    "puntajeBajo" :
                    "");
}