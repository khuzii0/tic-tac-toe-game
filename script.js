// Mode switch Light\Dark

let turnModeBtn = document.querySelector("#turn-mode-btn");
let root = document.documentElement;
let lightMode = true;
const modeChange = () => {
  if (lightMode) {
    root.style.setProperty("--back-color", "#101820");
    root.style.setProperty("--box-color", "#FEE715");
    root.style.setProperty("--text-color", "#dff2f7");
    root.style.setProperty("--other-color", "#007cf1");
    lightMode = false;
    turnModeBtn.innerHTML = "Turn Light Mode";
  } else {
    root.style.removeProperty("--back-color", "#FDF6F6");
    root.style.removeProperty("--box-color", "#C5001A");
    root.style.removeProperty("--text-color", "black");
    root.style.removeProperty("--other-color", "#0e11d1");
    lightMode = true;
    turnModeBtn.innerHTML = "Turn Dark Mode";
  }
};
turnModeBtn.addEventListener("click", modeChange);


let boxes = document.querySelectorAll(".box");
let winnerSection = document.querySelector("#winner-announce");
let winner = document.querySelector(".winner");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game-btn");
let checkAutoPlay = document.querySelector("#check-autoplay");
let remainingMoves = document.getElementsByClassName("enabled");
let playerMention = document.querySelector("#player-mention");
let boxTextBlink;
let timeoutPending;

let turnX = true;
let count = 0;

let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let allBoxesDisabled = () => {
  for (let box of boxes) {
    box.classList.add("disabled");
    box.classList.remove("enabled");
  }
};


// Find winners logic


const FIND_WINNER = () => {
  for (let pattern of winPatterns) {
    let val1 = boxes[pattern[0]].innerText;
    let val2 = boxes[pattern[1]].innerText;
    let val3 = boxes[pattern[2]].innerText;

    if (val1 != "" && val2 != "" && val3 != "") {
      if (val1 === val2 && val2 === val3) {
        winner.innerText = `Congratulations ${val1}! \n You won the game🎉🎉🎉`;
        winnerSection.classList.remove("hide");
        allBoxesDisabled();
      }
    }
  }
};


// auto play last move and find results (logic) 

const LAST_MOVE_AUTO_PLAY = () => {
  if (count === 8) {
    for (const move of remainingMoves) {
      move.style.color = "red";
      if(turnX){
        move.innerText = "X";
        boxTextBlink = setInterval(() => {
          move.innerText = move.innerText === "X" ? "" : "X"
        }, 800);
      }
      else{
        move.innerText = "O";
        boxTextBlink = setInterval(() => {
          move.innerText = move.innerText === "O" ? "" : "O"
        }, 800);
      }
      FIND_WINNER();
        if (winnerSection.classList.contains("hide")) {
          winnerSection.classList.remove("hide");
          winner.innerText = "Game withdrawed \n plz restart game ";
          allBoxesDisabled();
        }
    }
  }
};
for (let box of boxes) {
  // Player turn

  box.addEventListener("click", () => {
    count++;
    if (turnX) {
      box.innerText = "X";
      box.classList.add("disabled");
      box.classList.remove("enabled");
      turnX = false;
      playerMention.innerText = `Turn : player O`;
    } else {
      box.innerText = "O";
      box.classList.add("disabled");
      box.classList.remove("enabled");
      turnX = true;
      playerMention.innerText = `Turn : player X`;
    }

    // Find winners

    FIND_WINNER();

      // when no winners found
      if(checkAutoPlay.checked === false){
        if (count === 9 && winnerSection.classList.contains("hide")) {
          winnerSection.classList.remove("hide");
          winner.innerText = `Game withdrawed \n plz restart game`;
        }
      }
      // auto play last move and find results

      else if (checkAutoPlay.checked === true){

        LAST_MOVE_AUTO_PLAY();
      }
  });
}

// Reset or New game start

let resetGame = () => {
  for (let box of boxes) {
    box.classList.remove("disabled");
    box.classList.add("enabled");
    box.innerText = "";
    box.style.color = "";
  }
  clearInterval(boxTextBlink);
  count = 0;
  turnX = true;
  playerMention.innerText =  `First Turn : player X`
  winnerSection.classList.add("hide");
};
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
