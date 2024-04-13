// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //

//Identificando elementos:
const nombreJugador = document.querySelector("body input[type='text']"); 
const numPartidas = document.querySelector("body input[type='number']");
const opcionesJugador = document.getElementById("jugador");
const historial = document.getElementById("historial");
historial.style.listStyle = "none"; //Aquí elimino los puntitos de los "li" que no me gustan
const maquina = document.getElementById("maquina");


const total = document.getElementById("total");
const actual = document.getElementById("actual"); 

const botones = document.querySelectorAll("button");
const botonJugar = botones[0];
const botonYa = botones[1];
const botonReset = botones[2]; 

//Variables de estado:
let contadorActual = 0; 
let numTotal;
let indiceJugador;
let indiceMaquina; 
let seleccionado = false; 
let resultadoJugador;
let resultadoMaquina; 


//----------Main: ----------------

//Se detecta el evento click en el boton ¡JUGAR!
botonJugar.addEventListener("click", ()=>{
    
    //Se llaman a las funciones de validación de los campos nombre y num. de partidas
    validaNombreJugador(nombreJugador);
    validaNumPartidas(numPartidas);
    
    //Si pasan las validaciones al pulsar ¡JUGAR! el programa continua
    if(validaNombreJugador(nombreJugador) && validaNumPartidas(numPartidas)){
        //Inicia la primera partida poniendo el contador a 1 y volcandolo en el span actual.
        contadorActual++; 
        actual.textContent = contadorActual; 

        //Se llaman a las funciones que cargan las imagenes del juego y recogeran los datos que marca el usuario.
        cargaOpciones(); 
        seleccionaImg();

        //Se detecta el click de usuario en el botón YA para llamar a resultadoPartida(), y que la app 
        //Vaya volcando los resultados en el historial.
        botonYa.addEventListener("click", resultadoPartida); 

    } else {
        //Se añade un alert si el usuario no pasa la validación de ususario y num. de partidas
        //No lo piden las especs pero es más intuitivo así.
        alert("Comprueba los datos \"nombre\" y/o \"partidas\" "); 
    }

});

//Se llama a restableceJuego() al clickar en el botón RESET
botonReset.addEventListener("click", ()=>{
    restableceJuego();
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


//Función para eliminar la imagenes de la sección #jugador:
function eliminaDefaultImgs(){
    let imgPingu = document.querySelectorAll("#jugador img"); 

    for(let i = 0; i < imgPingu.length; i++){
        imgPingu[i].remove(); 
    }
}

//Creando función para eliminar los pingüinos y añadir las opciones del usuario:
function cargaOpciones(){

    eliminaDefaultImgs();

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


//Creando función de selección del usuario y guardar la selección:
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

//Creando la function para que la máquina tome una opción aleatoria:
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

//Creando la función que compara el resultado escogio por el user contra la opción aleatoria de la máquina:
function comparaResultados(){

    let resultadoTirada = document.createElement("li");
    resultadoTirada.style.width = "25%"; 

    if(indiceJugador == indiceMaquina){
        resultadoTirada.textContent = "¡Empate!";
        resultadoTirada.style.backgroundColor = "#FFD580";
        historial.appendChild(resultadoTirada);  
    }else{
        if((indiceJugador + 1) % 3 === indiceMaquina) {

            resultadoTirada.textContent = "Gana la máquina";
            resultadoTirada.style.backgroundColor = "#FFCCCB";
            historial.appendChild(resultadoTirada);

        }else{

            resultadoTirada.textContent = "Gana " + nombreJugador.value;
            resultadoTirada.style.backgroundColor = "lightgreen";
            historial.appendChild(resultadoTirada); 
           
        }
    }

    console.log(indiceJugador);
    console.log(indiceMaquina); 
}


//Función de control de partidas y finalización del juego: 
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

//Creando función para reestablecer el juego al clickar en RESET:
function restableceJuego(){
    numPartidas.disabled = false;
    numPartidas.value = 0;
    contadorActual = 0;
    actual.textContent = contadorActual;
    total.textContent = 0; 
    botonYa.disabled = false; 

    imgsPorDefecto(); 
}

//Función para volver a cargar las imágenes por defecto al llamar a restableceJuego():
function imgsPorDefecto(){

    eliminaDefaultImgs();

    const contenedor = document.getElementById("jugador"); 
    
    for(let i = 0; i < 3; i++){
        const imgDefecto = document.createElement("img");
        imgDefecto.src = "img/defecto.png";
        contenedor.appendChild(imgDefecto); 
    }   

    const imgMaquina = document.querySelector("#maquina img"); 
    imgMaquina.remove();
    const imgDefecto = document.createElement("img");
    imgDefecto.src = "img/defecto.png";
    maquina.appendChild(imgDefecto); 

}





