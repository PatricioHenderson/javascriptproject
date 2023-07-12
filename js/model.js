"use strict";

class Pokemon {
    constructor(obj) {
        console.log(obj);
        let thumbnail = "https://raw.githubusercontent.com/InoveAlumnos/pokemon_assets_js/main/assets/";
        this.id = this.formatId(obj.id);
        this.name = obj.name;
        this.thumbnail = thumbnail + this.id + ".png";
    }

    formatId(id) {
        let formattedId = String(id);
        while (formattedId.length < 3) {
            formattedId = "0" + formattedId;
        }
        return formattedId;
    }
}


class PokemonStats {
    constructor(obj){
        this.name = obj.name;
        this.index = obj.id
        this.types = obj.types.map(type => type.type.name);
        this.attributes = {
            HP: obj.stats[0].base_stat,
            attack: obj.stats[1].base_stat,
            defense: obj.stats[2].base_stat,
            specialDefense: obj.stats[3].base_stat,
            speed: obj.stats[5].base_stat
        };
    } 
}