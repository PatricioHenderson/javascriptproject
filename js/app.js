"use strict";

let numero = 0;  // Se utiliza para saber el nº de pokemon a adivinar
let cantidadAcertados = 0;  // Se utiliza para saber cuantos pokemons fueron adivinados
let cantidadEncuestados = 0;  // Se utiliza para saber cuantos pokemons se intentaron adivinar
const text = document.getElementById("resultText")
const img = document.getElementById("imgpokemon")
const puntaje = document.getElementById("puntaje")


function restart() {
    text.innerHTML = "";
    img.innerHTML = "";
    numero = Math.floor(Math.random() * pokemons.length);
    img.src = pokemons[numero]["thumbnail"]
}

function validate(pokeInput) {
    if (pokeInput.length < 1 ){
        alert("Enter a Value");
        return;
    } 
    cantidadEncuestados++;
    const pokeName = pokemons[numero]["name"]
    const pokeNameLower = pokeName.toLowerCase()
    
    const responseMessage = (pokeInput.toLowerCase() === pokeNameLower ? 
                            `Congratulations, it's ${pokeName}` :
                            `Failed, it's ${pokeName}` )
    text.innerHTML = responseMessage
    

    if (pokeInput.toLowerCase() === pokeNameLower){    
        cantidadAcertados++;
    }

    puntaje.innerHTML = `Puntaje ${cantidadAcertados} de ${cantidadEncuestados}`
    puntaje.className = ((cantidadAcertados / cantidadEncuestados) < 0.5 ?
                    "puntajeBajo" :
                    "")   
}
