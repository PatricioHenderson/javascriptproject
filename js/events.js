

const send = document.getElementById('send')
const reload = document.getElementById('reload')
let input = document.querySelector('input[type="text"][placeholder="Nombre de este Pokémon"]');


document.addEventListener("DOMContentLoaded", function() {
    restart();
});


// console.log(reload)
// reload.addEventListener("click", restart);
reload.onclick = restart
send.onclick = function() {
    validate(input.value);
  };
  
