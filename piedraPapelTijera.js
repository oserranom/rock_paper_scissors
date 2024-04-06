// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //

//Identificando elementos:

const nombreJugador = document.querySelector("body input[type='text']"); 

const numPartidas = document.querySelector("body input[type='number']");

const total = document.getElementById("total");
const actual = document.getElementById("actual"); 

const botones = document.querySelectorAll("button");
const botonJugar = botones[0];
const botonYa = botones[1];
const botonReset = botones[2]; 


//Main:
//Comienzo partida:

nombreJugador.addEventListener("blur", validaNombreJugador);
numPartidas.addEventListener("blur", validaNumPartidas);


//Creando función de validación del nombre:
function validaNombre(nombre){

    const regex = /^(?![0-9])\w{3,}/;

    const resultado = regex.test(nombre);

    return resultado; 
}

//Creando función para añadir o elminar estilo fondoRojo al nombre: 
function validaNombreJugador(e){
    if(!validaNombre(e.target.value)){
        nombreJugador.classList.add("fondoRojo");
    } else {
        nombreJugador.classList.remove("fondoRojo"); 
    }
}

//Creando función para validar el numero de partidas:
function validaNumPartidas(e){
    if(parseInt(e.target.value) < 1){
        numPartidas.classList.add("fondoRojo");
        
    }else{
        numPartidas.classList.remove("fondoRojo"); 
        total.textContent = e.target.value; 
    }
}




