const  $rockSelect = document.getElementById("rock"),
    $paperSelect = document.getElementById("paper"),
    $scissorSelect = document.getElementById("scissor"),
    
    $roundStats = document.getElementById("rounds-stats"),
    $roundActualy = document.getAnimations("round-actualy"),

    $buttonPlayMenu = document.getElementById("play"),
    $buttonPlayRound = document.getElementById("next-round"),
    $buttonReturnMenu = document.getElementById("back-menu"),
    $buttonRestart = document.getElementById("restart"),

    $cpuSelect = document.getElementById("game-selected-cpu"),
    $playerSelect = document.getElementById("game-selected-player"),
    $resultBoard = document.getElementById("result-board");


$buttonPlayMenu.addEventListener("click", ()=>{
    console.log(gameData());
})

class PLAYER {
    name;
    handSelect;

    JUGADOR(name){
        this.name = name;

    }
}

class GAME {
    rounds;
    playerWins;
    cpuWins;
    actualRound;


}

class CPU {

}