// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //

//Identificando elementos:

const nombreJugador = document.querySelector("body input[type='text']"); 
const numPartidas = document.querySelector("body input[type='number']");
const opcionesJugador = document.getElementById("jugador");
const historial = document.getElementById("historial");
const maquina = document.getElementById("maquina"); 

const total = document.getElementById("total");
const actual = document.getElementById("actual"); 

const botones = document.querySelectorAll("button");
const botonJugar = botones[0];
const botonYa = botones[1];
const botonReset = botones[2]; 

//Variables de estado:

let contadorActual = 1; 
let numTotal;
let indiceJugador;
let indiceMaquina; 
let seleccionado = false; 
let resultadoJugador;
let resultadoMaquina; 


//----------Main: ----------------


botonJugar.addEventListener("click", ()=>{

    validaNombreJugador(nombreJugador);
    validaNumPartidas(numPartidas);
    
    if(validaNombreJugador(nombreJugador) && validaNumPartidas(numPartidas)){
        actual.textContent = contadorActual; 
        cargaOpciones(); 
        seleccionaImg();

        botonYa.addEventListener("click", resultadoPartida); 

    } else {
        alert("Comprueba los datos \"nombre\" y/o \"partidas\" "); 
    }

});

botonReset.addEventListener("click", ()=>{
    location.reload();
}); 

//-----------Fin Main--------------


//Creando función de validación del nombre:
function validaNombre(nombre){

    const regex = /^(?![0-9])\w{3,}/;

    const resultado = regex.test(nombre);

    return resultado; 
}

//Creando función para añadir o elminar estilo fondoRojo al nombre: 
function validaNombreJugador(nombre){
    if(!validaNombre(nombre.value)){
        nombreJugador.classList.add("fondoRojo");
        return false;
    } else {
        nombreJugador.classList.remove("fondoRojo"); 
        nombreJugador.disabled = true; 
        return true;
    }
}

//Creando función para validar el numero de partidas:
function validaNumPartidas(numero){
    if(parseInt(numero.value) < 1){
        numPartidas.classList.add("fondoRojo");
        return false;
        
    }else{
        numPartidas.classList.remove("fondoRojo"); 
        total.textContent = numero.value;
        numTotal = parseInt(numero.value);  
        numPartidas.disabled = true; 
        return true; 
    }
}

//Creando función para eliminar los pingüinos y añadir las opciones:
function cargaOpciones(){

    let imgPingu = document.querySelectorAll("#jugador img"); 

    for(let i = 0; i < imgPingu.length; i++){
        imgPingu[i].remove(); 
    }

    const piedraJugador = document.createElement("img");
    const papelJugador = document.createElement("img");
    const tijeraJugador = document.createElement("img");

    piedraJugador.src = "img/piedraJugador.png";
    papelJugador.src = "img/papelJugador.png"; 
    tijeraJugador.src = "img/tijeraJugador.png";

    opcionesJugador.appendChild(piedraJugador); 
    opcionesJugador.appendChild(papelJugador); 
    opcionesJugador.appendChild(tijeraJugador); 

}

//Creando función de selección y asignación

function seleccionaImg(){

    const opcionJugador = document.querySelectorAll("#jugador img"); 

    console.log(opcionJugador); 

    for(let i = 0; i < opcionJugador.length; i++){
        opcionJugador[i].addEventListener("click",(e)=>{
            
            if(!seleccionado){
                
                opcionJugador[i].classList.remove("noSeleccionado"); 
                opcionJugador[i].classList.add("seleccionado");
            

                    for(let j = 0; j < opcionJugador.length; j++){

                        if(opcionJugador[j] !== e.target){
                            opcionJugador[j].classList.remove("seleccionado");
                            opcionJugador[j].classList.add("noSeleccionado"); 
                        } else{
                            resultadoJugador = posibilidades[j];
                            indiceJugador = j; 
                            console.log(resultadoJugador);
                        }
                    }
                seleccionado = true;
                return; 
            }                        
        });        
    }    
}

//Creando la function para la opción de la máquina 

function opcionAleatoria(){

    const imgMaquina = document.querySelector("#maquina img"); 

    if(imgMaquina){
        imgMaquina.remove();
    }

    const piedraPC = document.createElement("img");
    const papelPC = document.createElement("img");
    const tijeraPC = document.createElement("img");
    piedraPC.src = "img/piedraOrdenador.png";
    papelPC.src = "img/papelOrdenador.png";
    tijeraPC.src = "img/tijeraOrdenador.png"; 

    indiceMaquina = Math.floor(Math.random()*posibilidades.length);

    switch(posibilidades[indiceMaquina]){

        case("piedra"):
            maquina.appendChild(piedraPC);
            resultadoMaquina = posibilidades[0];
            break;

        case("papel"):
            maquina.appendChild(papelPC);
            resultadoMaquina = posibilidades[1];
            indiceMaquina = 1; 
            break;

        case("tijera"):
            maquina.appendChild(tijeraPC);
            resultadoMaquina = posibilidades[2];
            indiceMaquina = 2;
            break;

        default:
            break; 
    }

    console.log(resultadoMaquina);    
}

function comparaResultados(){

    let resultadoTirada = document.createElement("li")

    if(indiceJugador == indiceMaquina){
        resultadoTirada.textContent = "¡Empate!";
        resultadoTirada.style.backgroundColor = "orange";
        historial.appendChild(resultadoTirada);  
    }else{
        if(indiceMaquina > indiceJugador){
            resultadoTirada.textContent = "gana la máquina";
            resultadoTirada.style.backgroundColor = "red";
            historial.appendChild(resultadoTirada);
        }else{
            resultadoTirada.textContent = "gana el jugador";
            resultadoTirada.style.backgroundColor = "blue";
            historial.appendChild(resultadoTirada); 
        }
    }

    console.log(indiceJugador);
    console.log(indiceMaquina); 
}


//function de comparación de resultados y volcado de datos

function resultadoPartida(){
    
    opcionAleatoria(); 
    
     

    if (contadorActual >= numTotal) {
        comparaResultados();

        //Se crea "li" de final de partida
        const finPartida = document.createElement("li");
        finPartida.textContent = "FIN DE LA PARTIDA";
        finPartida.style.color = "red";
        finPartida.style.fontWeight = "bold";
        historial.appendChild(finPartida); 

        //Se deshabilita el botón YA por llegar al finald el jeugo
        botonYa.disabled = true; 

    } else{

        //Se actualiza el contador de partida en marcha 
        contadorActual++;
        actual.textContent = contadorActual;
        

        //Se cambia la variable de estado para habilitar la selección 
        seleccionado = false; 

        //Se llama a la funcion de comparación
        comparaResultados();

    }

}




