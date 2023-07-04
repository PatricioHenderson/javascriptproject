

const send = document.getElementById('send')
const reload = document.getElementById('reload')
let input = document.querySelector('input[type="text"][placeholder="Nombre de este Pokémon"]');


document.addEventListener("DOMContentLoaded", function() {
    restart();
    let [aciertos, encuestados] = getGuessed();
    setScore(aciertos, encuestados)
});

// reload.addEventListener("click", restart);
reload.onclick = restart
send.onclick = function() {
    validate(input.value);
  };

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        validate(input.value);
    }
});