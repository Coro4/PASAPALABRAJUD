//total preguntas del juego
const TOTAL_PREGUNTAS = 26;
//tiempo del juego
const TIEMPO_DEL_JUEGO = 300;
//estructura para almacenar las preguntas
const bd_juego = [
  {
    id:'A',
    pregunta:"COMENÇA per A. Figureta que ens il·lumina el sostre de l'habitació.",
    respuesta:"ASTRONAUTA"
  },
  {
    id:'B',
    pregunta:"COMENÇA per B. 'Tipus' de la beguda preferida de la Petita Jud.",
    respuesta:"BLANC"
  },
  {
    id:'C',
    pregunta:"COMENÇA per C. Municipi proper a la nostra platja de confiança.",
    respuesta:"CALONGE"
  },
  {
    id:'D',
    pregunta:"COMENÇA per D. Al llit, no se'ns dona massa bé.",
    respuesta:"DORMIR"
  },
  {
    id:'E',
    pregunta:"COMENÇA per E. N'hauriem de fer més.",
    respuesta:"ESPORT"
  },
  {
    id:'F',
    pregunta:"COMENÇA per F. Títol de la nostra obra d'art.",
    respuesta:"FUMADA"
  },
  {
    id:'G',
    pregunta:"COMENÇA per G. Superfície sobre la qual ens agrada patinar.",
    respuesta:"GEL"
  },
  {
    id:'H',
    pregunta:"COMENÇA per H. Cançó preferida de la Petita Jud de l'àlbum que tenim en bucle.",
    respuesta:"HURACAN"
  },
  {
    id:'I',
    pregunta:"CONTÉ la I. A casa la Petita Jud no n'hi ha.",
    respuesta:"PERSIANES"
  },
  {
    id:'J',
    pregunta:"COMENÇA per J. Petita o no, com li diuen al pibón que fa anys avui.",
    respuesta:"JUD"
  },
  {
    id:'K',
    pregunta:"COMENÇA per K. Tenim una baralla de cartes per explorar-lo.",
    respuesta:"KAMASUTRA"
  },
  {
    id:'L',
    pregunta:"COMENÇA per L: No hi era quan vam anar a la bombolla.",
    respuesta:"LLUNA"
  },
  {
    id:'M',
    pregunta:"COMENÇA per M. Diuen que la Petita Jud té els ulls d'aquest color.",
    respuesta:"MARIHUANA"
  },
  {
    id:'N',
    pregunta:"COMENÇA per N. De colors, projectada sostre, dona mil voltes als leds.",
    respuesta:"NEBULA"
  },
  {
    id:'O',
    pregunta:"COMENÇA per O. La Petita Jud en fa una de brutal, amb i sense colònia.",
    respuesta:"OLOR"
  },
  {
    id:'P',
    pregunta:"COMENÇA per P. Dolç preferit de la petita Petita Jud.",
    respuesta:"PUXULATA"
  },
  {
    id:'Q',
    pregunta:"COMENÇA per Q. En vam pintar un cadascú.",
    respuesta:"QUADRE"
  },
  {
    id:'R',
    pregunta:"COMENÇA per R. Li debem una.",
    respuesta:"ROSALEN"
  },
  {
    id:'S',
    pregunta:"COMENÇA per S. Dels menjars preferits de la Petita Jud, especialment a la banyera.",
    respuesta:"SUSHI"
  },
  {
    id:'T',
    pregunta:"COMENÇA per T. Estil musical que li agrada molt a la Petita Jud per sortir de festa.",
    respuesta:"TECNO"
  },
  {
    id:'U',
    pregunta:"COMENÇA per U. La Petita Jud està a punt d'acabar-la.",
    respuesta:"UNIVERSITAT"
  },
  {
    id:'V',
    pregunta:"COMENÇA per V. Castellanisme d'un MUST a l'habitació de la Petita Jud, que se les fundeix. (EN SINGULAR)",
    respuesta:"VELA"
  },
  {
    id:'W',
    pregunta:"COMENÇA per W. Expressió anglesa de 4 paraules que li fa molta gràcia a la Petita Jud.",
    respuesta:"WHAT THE ACTUAL FUCK"
  },
  {
    id:'X',
    pregunta:"COMENÇA per X. Munchies que ens encanten.",
    respuesta:"XUXES"
  },
  {
    id:'Y',
    pregunta:"CONTÉ la Y. Local d'on és 'la piba'.",
    respuesta:"GYM"
  },
  {
    id:'Z',
    pregunta:"COMENÇA per Z. La nostra constel·lació preferida.",
    respuesta:"ZORRA"
  },
]

//preguntas que ya han sido contestadas. Si estan en 0 no han sido contestadas
var estadoPreguntas = []
// Asumiendo que estadoPreguntas se declara en alguna parte de tu código
// Inicialización de estadoPreguntas con 0 (sin responder) para todas las preguntas
estadoPreguntas = new Array(TOTAL_PREGUNTAS).fill(0);

//variable que mantiene el num de pregunta acual
var numPreguntaActual = -1;

// Obtener el elemento del cronómetro
const timer = document.getElementById("tiempo");
// Establecer el tiempo inicial en 60 segundos
let timeLeft = TIEMPO_DEL_JUEGO;
var countdown;

//boton comenzar
var comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", function(event) {
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();
  cargarPregunta();
});

//Creamos el circúlo con las letras de la A a la Z
const container = document.querySelector(".container");
for (let i = 1; i <= TOTAL_PREGUNTAS; i++) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.textContent = String.fromCharCode(i + 96);
  circle.id = String.fromCharCode(i + 96).toUpperCase();
  container.appendChild(circle);

  const angle = ((i - 1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
  const x = Math.round(178 + 200 * Math.cos(angle));
  const y = Math.round(178 + 200 * Math.sin(angle));
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
}


//Función que carga la pregunta
function cargarPregunta(){
  numPreguntaActual++;
  //controlo si he llegado al final de las preguntas, para comenzar de nuevo
  if(numPreguntaActual>=TOTAL_PREGUNTAS){
    numPreguntaActual=0;
  }

  if(estadoPreguntas.indexOf(0)>=0){ //Controlo que todavía hallan preguntas por contestar
    while(estadoPreguntas[numPreguntaActual]==1 || estadoPreguntas[numPreguntaActual]==2){
      numPreguntaActual++;
      if(numPreguntaActual>=TOTAL_PREGUNTAS){
        numPreguntaActual=0;
      }
    }
  
    document.getElementById("letra-pregunta").textContent = bd_juego[numPreguntaActual].id
    document.getElementById("pregunta").textContent = bd_juego[numPreguntaActual].pregunta
    var letra =  bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.add("pregunta-actual");
  }
  else{
    clearInterval(countdown);
    mostrarPantallaFinal();
  }

  respuesta.value="";
}

//detecto cada vez que hay un cambio de tecla en el input
var respuesta = document.getElementById("respuesta");
respuesta.addEventListener("keyup", function(event) {
  //detecto si la tecla presionada es ENTER
  if (event.keyCode === 13) {
    if(respuesta.value==""){
      alert("Contesta o passa a la següent pregunta!");
      return;
    }
    //obtengo la respuesta ingresada
    var txtRespuesta = respuesta.value;
    controlarRespuesta(txtRespuesta.toUpperCase());
  }
});

//Función que controla la respuesta
function controlarRespuesta(txtRespuesta){
  //controlo si la respuesta es correcta
  if(txtRespuesta == bd_juego[numPreguntaActual].respuesta){
    //alert("Respuesta correcta")
    //cantidadAcertadas++;

    //actualizo el estado de las pregunta actual a 1, indicando que ya esta respondida correctamente
    estadoPreguntas[numPreguntaActual] = 1;
    var letra =  bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");
    document.getElementById(letra).classList.add("bien-respondida");

  }else{
    //alert("respuesta incorrecta")
    //actualizo el estado de las pregunta actual a 2, indicando que ya esta respondida y es un fallo
    estadoPreguntas[numPreguntaActual] = 2;
    //cantidadFalladas++;
    var letra =  bd_juego[numPreguntaActual].id;
    //quito l clase del estilo de pregunta actual
    document.getElementById(letra).classList.remove("pregunta-actual");
    //agrego la clase del estilo de pregunta mal respondida
    document.getElementById(letra).classList.add("mal-respondida");
  }
  respuesta.value="";
  cargarPregunta();
}

//botón para pasar de pregunta sin contestar
var pasar = document.getElementById("pasar");
pasar.addEventListener("click", function(event) {
  var letra =  bd_juego[numPreguntaActual].id;
  document.getElementById(letra).classList.remove("pregunta-actual");

  cargarPregunta();
});

//botón para ingresar respuesta
var responder = document.getElementById("responder");
responder.addEventListener("click", function(event) {
  //obtengo la respuesta ingresada
  var txtRespuesta = respuesta.value;
  controlarRespuesta(txtRespuesta.toUpperCase());
});

// Crear la función que se encargará de actualizar el cronómetro cada segundo
function largarTiempo(){
  // Limpia el intervalo existente antes de iniciar uno nuevo
  clearInterval(countdown); // <--- Agrega esta línea

  countdown = setInterval(() => {
    timeLeft--; // Decrementa primero el tiempo restante

    if (timeLeft <= 0) {
      timer.innerText = "0"; // Asegura que el cronómetro muestre 0
      clearInterval(countdown);
      mostrarPantallaFinal();
    } else {
      timer.innerText = timeLeft; // Actualiza el cronómetro si aún hay tiempo
    }
  }, 1000);
}

//muestro la pantlla final
function mostrarPantallaFinal(){
  var cantidadAcertadas = 0;
  var cantidadFalladas = 0;
  var cantidadPasadas = 0;
  for (let i = 0; i < estadoPreguntas.length; i++) {
    if (estadoPreguntas[i] === 0) { // Sin responder
      cantidadPasadas++;
    } else if (estadoPreguntas[i] === 1) {
      cantidadAcertadas++;
    } else if (estadoPreguntas[i] === 2) {
      cantidadFalladas++;
    }
  }
  
  if (cantidadAcertadas<=20){
    document.getElementById("score").textContent = "Pots fer-ho millor ;)";
  } else if (cantidadAcertadas==26){
    document.getElementById("score").textContent = "OLÉ! FINIKITAO :) PER MOLTS ANYS PETITA JUD! FELIÇOS 23 <3";
  } else {
    document.getElementById("score").textContent = "Força bé per la teva edat.";
  }

  // Actualiza el DOM con los conteos
  document.getElementById("Aciertos").textContent = cantidadAcertadas;
  document.getElementById("Fallos").textContent = cantidadFalladas;
  document.getElementById("SinResponder").textContent = cantidadPasadas;
  
  document.getElementById("pantalla-juego").style.display =  "none";
  document.getElementById("pantalla-juego2").style.display = "none";
  document.getElementById("pantalla-final").style.display =  "block";
}

//boton para recomenzar el juego
var recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function(event) {
  numPreguntaActual = -1;
  timeLeft = TIEMPO_DEL_JUEGO;
  timer.innerText = timeLeft;
  //cantidadAcertadas = 0;
  estadoPreguntas = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  //quito las clases de los circulos
  var circulos = document.getElementsByClassName("circle");
  for(i=0;i<circulos.length;i++){
    circulos[i].classList.remove("pregunta-actual");
    circulos[i].classList.remove("bien-respondida");
    circulos[i].classList.remove("mal-respondida");
  }

  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-juego2").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  respuesta.value="";

  largarTiempo();
  cargarPregunta();
});


//boton para finikitar los fallos y preguntas pasadas 
var finikitar = document.getElementById("finikitar");
finikitar.addEventListener("click", function(event) {
  console.log("Estado de preguntas antes de cargar:", estadoPreguntas);
  numPreguntaActual2 = -1;
  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-juego2").style.display = "block";
  respuesta.value="";
  //quito las clases de los circulos y les asigno de nuevo
  var circulos2 = document.getElementsByClassName("circle2");
  for(let i = 0; i < circulos2.length; i++) {
    circulos2[i].classList.remove("pregunta-actual", "bien-respondida", "mal-respondida"); // Limpia clases primero
    if (estadoPreguntas[i] === 1) {
      circulos2[i].classList.add("bien-respondida");
    } else if (estadoPreguntas[i] === 2) {
      circulos2[i].classList.add("mal-respondida");
    }
    console.log("Aplicando clase a la letra:", circulos2[i]);
    var elemento = document.getElementById(circulos2[i]);
    console.log("Elemento seleccionado para", circulos2[i], ":", elemento);
    if (elemento) {
      // Si el elemento existe, procede a agregar o remover clases
    } else {
      console.log("No se encontró el elemento para la letra:", circulos2[i]);
    }

  }
  cargarPregunta2();
});

//Creamos el circúlo con las letras de la A a la Z
const container2 = document.querySelector(".container2");
for (let i = 1; i <= TOTAL_PREGUNTAS; i++) {
  const circle2 = document.createElement("div");
  circle2.classList.add("circle2");
  circle2.textContent = String.fromCharCode(i + 96);
  circle2.id = String.fromCharCode(i + 96).toUpperCase();
  container2.appendChild(circle2);

  const angle = ((i - 1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
  const x = Math.round(178 + 200 * Math.cos(angle));
  const y = Math.round(178 + 200 * Math.sin(angle));
  circle2.style.left = `${x}px`;
  circle2.style.top = `${y}px`;
}

//Función que carga la pregunta
function cargarPregunta2(){
  numPreguntaActual2++;
  //controlo si he llegado al final de las preguntas, para comenzar de nuevo
  if(numPreguntaActual2>=TOTAL_PREGUNTAS){
    numPreguntaActual2=0;
  }
  if(estadoPreguntas.indexOf(0)>=0 || estadoPreguntas.indexOf(2)>=0){ //Controlo que todavía hallan preguntas por contestar
    while(estadoPreguntas[numPreguntaActual2]==1){
      numPreguntaActual2++;
      if(numPreguntaActual2>=TOTAL_PREGUNTAS){
        numPreguntaActual2=0;
      }
    }
    document.getElementById("letra-pregunta2").textContent = bd_juego[numPreguntaActual2].id
    document.getElementById("pregunta2").textContent = bd_juego[numPreguntaActual2].pregunta
    var circulos2 = document.getElementsByClassName("circle2");
    circulos2[numPreguntaActual2].classList.remove("pregunta-actual", "bien-respondida", "mal-respondida");
    circulos2[numPreguntaActual2].classList.add("pregunta-actual");
    //var letra2 =  bd_juego[numPreguntaActual].id;
    //document.getElementById(letra2).classList.add("pregunta-actual");
  } else{
    mostrarPantallaFinal();
  }
  respuesta2.value="";
}

//detecto cada vez que hay un cambio de tecla en el input
var respuesta2 = document.getElementById("respuesta2");
respuesta2.addEventListener("keyup", function(event) {
  //detecto si la tecla presionada es ENTER
  if (event.keyCode === 13) {
    if(respuesta2.value==""){
      alert("Contesta o passa a la següent pregunta!");
      return;
    }
    //obtengo la respuesta ingresada
    var txtRespuesta2 = respuesta2.value;
    controlarRespuesta2(txtRespuesta2.toUpperCase());
  }
});

//botón para ingresar respuesta
var responder2 = document.getElementById("responder2");
responder2.addEventListener("click", function(event) {
  //obtengo la respuesta ingresada
  var txtRespuesta2 = respuesta2.value;
  controlarRespuesta2(txtRespuesta2.toUpperCase());
});


// Esta función se encarga de verificar si la respuesta es correcta
function controlarRespuesta2(txtRespuesta2){
  if(txtRespuesta2 == bd_juego[numPreguntaActual2].respuesta.toUpperCase()){ // Asegúrate de comparar ambos en mayúsculas
    estadoPreguntas[numPreguntaActual2] = 1; // Indica que la pregunta fue respondida correctamente
    var circulos2 = document.getElementsByClassName("circle2");
    circulos2[numPreguntaActual2].classList.remove("pregunta-actual");
    circulos2[numPreguntaActual2].classList.add("bien-respondida"); // Asegúrate de agregar esta clase para mostrar visualmente el éxito
    // Mueve a la siguiente pregunta o muestra la pantalla final si todas las preguntas han sido respondidas
    cargarPregunta2();
  }else{
    // Maneja la respuesta incorrecta aquí, por ejemplo, mostrando un mensaje al usuario
    alert("Torna-ho a intentar. Tu pots ;)");
  }
  // Limpiar el campo de texto después de cada respuesta
  respuesta2.value="";
}
