const button = document.getElementById("guess-button");     
const again = document.getElementById("try-again");
const input = document.getElementById("guess-input");
const GRID = document.getElementById("grid");
const value = input.value;
let intentos = 6;
let diccionario = ['ABETO','AVION', 'BACHE', 'BICHO', 'BUENO', 'CABRA', 
                    'CALMA', 'CAMPO', 'CANTO', 'CARRO', 'CLARA', 'CLAVO', 'CALVO',
                    'ERROR', 'GORRO', 'GRAVE', 'HIELO', 'METRO', 'MONTE', 'NOTAS', 
                    'OPERA', 'PELEA', 'PERRO', 'PODER', 'RELOJ', 'SUCIO', 'SIETE',
                    'TABLA', 'TENIS', 'VERDE', 'VOLAR', 'YOGUR', 'ZORRO', 'ZURDO'];
const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
console.log(palabra);
const confettiDiv = document.getElementById('confetti');
input.focus;

window.addEventListener('load', init);

button.addEventListener("click", jugar);

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        jugar();
    }
});

again.addEventListener('click', () => {
    location.reload();
})

function init(){
    confettiDiv.style.display = 'none';
}

/* Termina el juego con un mensaje, deshabilita botones
y casilla para ingresar elementos */
function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje + '<button id="try-again">Jugar de nuevo!</button>';
}

/* Lee el valor contenido en el input */
function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase(); 
    return intento;
}

function jugar(){
    //Aca ya tenemos la palabra ingresada por usuario
    const INTENTO = leerIntento();    
    input.value = ''; 
    if(INTENTO.length === 5){
        //Se obtiene y crean grillas        
        const GRID = document.getElementById("grid");
        const ROW = document.createElement('div');
        ROW.className = 'row';
        //Se analiza la palabra letra a letra
        for (let i in palabra){
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            //Si las letras son iguales y posicionada en el mismo lugar, verde
            if (INTENTO[i]===palabra[i]){
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#79b851';
            } 
            //Si las letras pertenecen a la palabra, se ponen en amarillo
            else if( palabra.includes(INTENTO[i]) ) { 
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#f3c237';
            } 
            //Si no pertenecen a la palabra, se ponen en gris
            else {      
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#a4aec4';
            }
            //Se agregan la casilla a la pantalla
            ROW.appendChild(SPAN);            
        }
        //Se agrega fila completa
        GRID.appendChild(ROW);
        //Se restan los intentos disponibles
        intentos--;
        input.focus();
        //Si la palabra es igual a lo ingresado, se gana
        if (INTENTO === palabra ) {
            terminar("<h2>GANASTE!</h2>");  
            confettiDiv.style.display = 'block'; 
            again.style.display = 'block';
        }
        //Se pierde el juego
        else if (intentos==0){
            terminar("<h2>PERDISTE! :'(</h2>");
            again.style.display = 'block';
        }
    }
    else{
        let contenedor = document.getElementById('guesses');
        contenedor.innerHTML = '<h2 id = "guesses">Intente de nuevo, la palabra debe tener 5 letras!!</h2>';
        setTimeout(() => {
            contenedor.innerHTML = '<h2 id = "guesses"></h2>';
          }, 5000);        
    }
}

