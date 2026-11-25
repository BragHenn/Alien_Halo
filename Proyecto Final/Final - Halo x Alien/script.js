const canvas = document.getElementById("miLienzo");
const ctx = canvas.getContext("2d");

//Array de escenas
// 0 = Hangar
// 1 = Pasillo
// 2 = Cápsula de escape
// 3 = Hipersueño

const escena =[ //Sistema de escenas

    {
        nombre: "hangar",
        dibujar: dibujarHangar
    },
    {
        nombre: "pasillo",
        dibujar: dibujarPasillo
    },
    {
        nombre: "capsula",
        dibujar: dibujarCapsula
    },
    {
        nombre:"hipersueño",
        dibujar: dibujarHipersueno
    }
];

//POV
let camaraX = 900; //Posición default del POV

const mundoAncho = 2500; //Mundo entero
const vistaAncho = 700; //Campo visual que captura solo una región del Mundo entero

const esfera = {x: 900, y: 300,radio: 40};
const esfera2 = {x: 300, y: 148,radio: 20};
const esfera3 = {x: 1349, y: 234,radio: 80};

let escenaActual = 0; //Variable de estado que indica cual esta activa
//let estado = escena[escenaActual]; 

//Llamada de vectrores Escenarios

const hangar = new Image();

hangar.src = "assets/Hangar vs1.svg";


//Funciones de escenarios  ------------------------------------------------------
function dibujarHangar(){
    
    ctx.fillStyle = "#131317";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(120,40);
    ctx.lineTo(125, 65);
    ctx.lineTo(200, 35);
    ctx.closePath();

    ctx.fill();
    ctx.fillStyle = "#dacf92";

    
    ctx.drawImage(hangar,-camaraX,0, mundoAncho,400);
    
    ctx.fillStyle = "white";

    ctx.font = "20px Arial";

    ctx.fillText("Camara: " + camaraX,20,40);

    POV();
}

function dibujarPasillo(){

    ctx.fillStyle = "#1a4633";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(esfera.x - camaraX,esfera.y,30,0,Math.PI*2);
    ctx.fillStyle = "#195b57";
    ctx.fill();

    POV();
}


function dibujarCapsula(){

    ctx.fillStyle = "rgb(17, 28, 55)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(esfera2.x - camaraX,esfera2.y,30,0,Math.PI*2);
    ctx.fillStyle = "#89c521";
    ctx.fill();

    POV();

}

function dibujarHipersueno(){
    ctx.fillStyle = "#421749";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(esfera3.x - camaraX,esfera3.y,30,0,Math.PI*2);
    ctx.fillStyle = "#2101a0";
    ctx.fill();

    POV();
}


function POV(){

    // ctx.fillStyle = "#303030";

    // ctx.fillRect(0,150,canvas.width,100);

    // for(let x = 0; x < mundoAncho; x += 100){

    //     ctx.strokeStyle = "#555";

    //     ctx.beginPath();
    //     ctx.moveTo(x - camaraX,150);
    //     ctx.lineTo(x - camaraX,250);
    //     ctx.stroke();

    //     camaraX = Math.max(0,camaraX);

    //     camaraX = Math.min(camaraX,mundoAncho - vistaAncho);
    //}
}


function renderizarEscena(){
    ctx.clearRect(0,0, canvas.width, canvas.height);

    escena[escenaActual].dibujar();

    requestAnimationFrame(renderizarEscena);
}


//Evento Mouse - Cambio de página -----------------------------------------
canvas.addEventListener("dblclick", cambioPagina);

function cambioPagina(event){
    
    if(escenaActual < escena.length - 1){
        escenaActual++;
    }
}


//Eventos Teclas - POV de protagonista -----------------------------------------------------------
window.addEventListener("keydown", presionarTecla);

function presionarTecla(event) {

    //Evento Tecla R - Restart
    if (event.key === "r") {
        location.reload();
    }

    //Evento Tecla Der - Mov a la derecha
    if(event.key === "ArrowRight"){
        camaraX += 20;
    }

    //Evento Tecla Izq - Mov a la izquierda
    if(event.key === "ArrowLeft"){
        camaraX -= 20;
    }

}
renderizarEscena();