// DECLARACION DE VARIABLES GLOBALES
const $sections = document.getElementsByClassName("section"),
  $inputName = document.getElementById("name"),
  $inputRounds = document.getElementById("round"),
  game = {
    playerName: " ",
    playerHand: -1,
    playerWins: 0,
    cpuWins: 0,
    actualRound: -1
  };

// VALOR DEL INPUT NOMBRE A MAYUSCULAS
$inputName.onkeyup = ()=> $inputName.value = $inputName.value.toUpperCase();

// VALIDACION DE CANTIDAD DE RONDAS
$inputRounds.onkeyup = ()=> {
  if(!$inputRounds.checkValidity()){
    alert("La cantidad de rondas deben estar entre 1 y 99");
    $inputRounds.value = 10;
  }
};

// VALIDACION DEL NOMBRE Y COMIENZO DEL JUEGO
document.getElementById("play").onclick = ()=> {
  if(!$inputName.value != " ") {
    alert("El nombre de jugador no puede estar vacio");
  }
  else {
    $sections[0].classList.add("none");
    $sections[1].classList.remove("none");
    game.playerName = $inputName.value;
    titleRounds();
  } 
};

// TOMA LA MANO DE LA PROXIMA RONDA Y LA AGREGA AL OBJ PLAYER
const $select = document.getElementsByClassName("game-next_round-hand");
function playerSelection(e) {
  for (let i = 0; i < $select.length; i++) {
    $select[i].classList.remove("selected")
  }
  $select[e].classList.add("selected")
  game.playerHand = e
}
$select[0].onclick = ()=> playerSelection(0)
$select[1].onclick = ()=> playerSelection(1)
$select[2].onclick = ()=> playerSelection(2)

// CARGA LAS RONDAS EN EL HEADER Y FLECHA DE LA VUELTA ATRAS
function titleRounds() {
  document.getElementById("header-game").innerHTML = '<div onclick="backMenu()"><svg width="44" height="37" viewBox="0 0 44 37" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M43.2 15.7349H8.98065L21.3982 3.3173L18.0809 0L0 18.0809L18.0809 36.1619L21.3982 32.8446L8.98065 20.427H43.2V15.7349Z" fill="white"/></svg></div><h2>RONDA ' + (game.actualRound += 1) + '</h2>'
}

// RETORNA UN NUMERO ENTRE 0 Y 2 QUE REPRESENTA LA SELECCION DE LA CPU
function cpuSelection() {
  let e = Math.floor((Math.random() * 3));
  return e
}

// MUESTRA LOS RESULTADOS DE LA RONDA ACTUAL 
function showRound() {
  let svgVS = '<svg width="635" height="392" viewBox="0 0 635 392" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M0.200001 5.99997H137L157.4 264L282.2 5.99997H341.6L164 387H22.4L0.200001 5.99997ZM512.759 116.4C513.959 110.4 514.559 102.2 514.559 91.8C514.559 85.8 514.159 80 513.359 74.4C512.559 68.4 511.159 63.2 509.159 58.8C507.159 54 504.159 50.4 500.159 48C496.159 45.2 490.959 43.8 484.559 43.8C477.359 43.8 470.759 45.4 464.759 48.6C458.759 51.8 453.359 56 448.559 61.2C444.159 66 440.559 71.8 437.759 78.6C435.359 85 434.159 91.8 434.159 99C434.159 109.4 436.759 117.4 441.959 123C447.559 128.6 454.759 133.2 463.559 136.8C472.359 140.4 482.359 143.4 493.559 145.8C504.759 148.2 516.359 151 528.359 154.2C538.359 157 548.359 160.6 558.359 165C568.359 169.4 577.159 175.4 584.759 183C592.759 190.2 599.159 199.8 603.959 211.8C608.759 223.4 611.159 238 611.159 255.6C611.159 280.8 606.159 302 596.159 319.2C586.159 336.4 572.359 350.4 554.759 361.2C537.159 372 516.159 379.8 491.759 384.6C467.759 389.4 441.559 391.8 413.159 391.8C384.359 391.8 360.759 390 342.359 386.4C324.359 382.4 310.159 378.2 299.759 373.8C287.359 368.6 278.159 362.6 272.159 355.8L292.559 273.6H398.159C397.759 277.2 397.359 282.2 396.959 288.6C396.559 294.6 396.359 299.4 396.359 303C396.359 307.8 396.959 312.8 398.159 318C399.359 323.2 401.159 328 403.559 332.4C406.359 336.8 410.159 340.4 414.959 343.2C419.759 346 425.759 347.4 432.959 347.4C440.959 347.4 447.959 345.6 453.959 342C460.359 338.4 465.559 334 469.559 328.8C473.959 323.2 477.159 317.2 479.159 310.8C481.559 304 482.759 297.4 482.759 291C482.759 282.2 480.559 274.8 476.159 268.8C472.159 262.8 466.559 257.8 459.359 253.8C452.159 249.4 443.759 245.8 434.159 243C424.959 239.8 415.359 236.6 405.359 233.4C395.759 230.6 385.559 227.2 374.759 223.2C364.359 219.2 354.759 213.6 345.959 206.4C337.159 199.2 329.759 190.2 323.759 179.4C318.159 168.2 315.359 154 315.359 136.8C315.359 111.2 321.759 89.8 334.559 72.6C347.759 55 364.159 40.8 383.759 30C403.759 19.2 425.559 11.6 449.159 7.19999C472.759 2.39998 495.159 -2.43187e-05 516.359 -2.43187e-05C544.359 -2.43187e-05 568.359 3.39998 588.359 10.2C608.759 16.6 624.159 24.2 634.559 33L612.359 116.4H512.759Z"/></svg>',
  handDIV,
  statsDIV,
  cpu = cpuSelection();

  if(winnerRound(cpu) == 1){
    game.playerWins += 1;
    handDIV = '<div class="game-selected">' + hand(game.playerHand) + svgVS + hand(cpu) + '</div>';
  }
  else if(winnerRound(cpu) == -1) {
    game.cpuWins += 1;
     handDIV = '<div class="game-selected">' + hand(game.playerHand) + svgVS + hand(cpu) + "</div>";
   }
  else {
    handDIV = '<div class="game-selected">' + hand(game.playerHand) + svgVS + hand(cpu) + '</div>';
  }

  statsDIV = '<div class="game-stats"><p>' + game.playerName + '</p><p>' + game.playerWins + ' | ' + game.cpuWins + '</p><p>CPU</p></div>';  
  document.getElementById("container-game").innerHTML = statsDIV + handDIV;
}

// RETORNA UN DIV CON LA SELECCION
function hand(hand) {
  let rockDIV = '<div class="game-selected-player"><img src="assets/rock.png" alt=""><label for="">Piedra</label></div>',
  paperDIV = '<div class="game-selected-player"><img src="assets/paper.png" alt=""><label for="">Papel</label></div>',
  scissorDIV = '<div class="game-selected-player"><img src="assets/scissor.png" alt=""><label for="">Tijera</label></div>';
  if(hand == 0) {
    return rockDIV;
  }
  else if(hand == 1) {
    return paperDIV;
  }
  else if(hand == 2) {
    return scissorDIV;
  }
}

// PASAR A LA SIGUENTE RONDA
document.getElementById("next-round").onclick = ()=> {
  if(game.playerHand < 0){
    alert("Seleccione una mano antes de empezar la ronda")
  }
  else {
    if(game.actualRound < $inputRounds.value){
      titleRounds();
      showRound();
    }
    else {
      showWinner();
    }
  }
};

// RETORNA 1 SI EL GANADOR DE LA RONDAS ES EL JUGADOR -1 SI ES LA CPU y 0 SI HAY EMPATE
function winnerRound(cpu){
  if(game.playerHand == 0){//el usuario eligio piedra 
    if(cpu == 1) {//si la maquina eligio papel 
        console.log(cpu, game.playerHand, "cpu Win");
        return -1//cpu win
    }
    else if(cpu == 2){//si la maquina eligio tijera
      console.log(cpu, game.playerHand, "player Win");
      return 1// player win
    }
    else {//si la maquina eligio piedra
      console.log(cpu, game.playerHand, "empate");
      return 0// empate
    } 
  } 
  if(game.playerHand == 1){//el usuario eligio papel 
    if(cpu == 2) {//si la maquina eligio tijera 
        console.log(cpu, game.playerHand, "cpu Win");
        return -1//cpu win
    }
    else if(cpu == 0){//si la maquina eligio piedra
      console.log(cpu, game.playerHand, "player Win");
      return 1// player win
    }
    else {//si la maquina eligio papel
      console.log(cpu, game.playerHand, "empate");
      return 0// empate
    } 
  } 
  if(game.playerHand == 2){//el usuario eligio tijera 
    if(cpu == 0) {//si la maquina eligio piedra 
        console.log(cpu, game.playerHand, "cpu Win");
        return -1//cpu win
    }
    else if(cpu == 1){//si la maquina eligio papel
      console.log(cpu, game.playerHand, "player Win");
      return 1// player win
    }
    else {//si la maquina eligio tijera
      console.log(cpu, game.playerHand, "empate");
      return 0// empate
    } 
  } 
}

// MUESTRA AL GANADOR CALCULANDO LAS VICTORIAS
function showWinner(){
  const $resultBoard = document.getElementById("result-board");
  if(game.playerWins > game.cpuWins) {
    $resultBoard.innerHTML = '<h2>' + game.playerName + ' ES EL GANADOR</h2>' + '<div class="result-board-score"><p>' + game.playerName + ' - ' + game.playerWins + '</p><p>CPU - ' + game.cpuWins + '</p></div>'
  }
  else if(game.playerWins < game.cpuWins){
    $resultBoard.innerHTML = '<h2>CPU ES EL GANADOR</h2>' + '<div class="result-board-score"><p>' + game.playerName + ' - ' + game.playerWins + '</p><p>CPU - ' + game.cpuWins + '</p></div>'
  }
  else {
    $resultBoard.innerHTML = '<h2>ES UN EMPATE</h2>' + '<div class="result-board-score"><p>' + game.playerName + ' - ' + game.playerWins + '</p><p>CPU - ' + game.cpuWins + '</p></div>'
  }
  
  $sections[2].classList.remove("none");
  $sections[1].classList.add("none");
}

// RESETEA LOS DATOS DEL JUGADOR Y VUELVE A LA PANTALLA DE INICIO 
function backMenu() {
  $sections[2].classList.add("none");
  $sections[1].classList.add("none");
  $sections[0].classList.remove("none");
  (game.playerName = " "), (game.playerHand = -1), (game.playerWins = 0), (game.cpuWins = 0), (game.actualRound = -1);
  document.getElementById("container-game").innerHTML = " "
}

// BOTONES MENU FINAL
// VUELVE AL MENU
document.getElementById("back-menu").onclick = ()=> backMenu();

// REINICIA EL JUEGO CON LOS DATOS YA CARGADOS 
document.getElementById("restart").onclick = ()=> {
  $sections[2].classList.add("none");
  $sections[1].classList.remove("none");
  game.playerHand= -1,
  game.playerWins= 0,
  game.cpuWins= 0,
  game.actualRound= -1
  document.getElementById("container-game").innerHTML = " "
}