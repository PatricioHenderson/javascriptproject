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