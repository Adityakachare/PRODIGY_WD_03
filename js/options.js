//SELECT ELEMENTS FROM index.html
//queryselector is used for DOM manipulation spcifically for css classes

const options = document.querySelector(".options");
const gameOverElement = document.querySelector(".gameover");

//SELECT BUTTONS FROM index.html from the options class

const computerBtn = options.querySelector(".computer");
const friendBtn = options.querySelector(".friend");
const xBtn = options.querySelector(".x");
const oBtn = options.querySelector(".o");
const playBtn = options.querySelector(".play");

//variab;e to store user options
let OPPONENT;
const player = new Object();

//Event listener for all the buttons

computerBtn.addEventListener("click", function () {
  OPPONENT = "computer";
  switchActive(friendBtn, computerBtn);
});

friendBtn.addEventListener("click", function () {
  OPPONENT = "friend";
  switchActive(computerBtn, friendBtn);
});

xBtn.addEventListener("click", function () {
  player.man = "X";
  player.computer = "O";
  player.friend = "O";

  switchActive(oBtn, xBtn);
});

oBtn.addEventListener("click", function () {
  player.man = "O";
  player.computer = "X";
  player.friend = "X";

  switchActive(xBtn, oBtn);
});

playBtn.addEventListener("click", function () {
  //to check if the player has chosen an opponent or not
  if (!OPPONENT) {
    computerBtn.style.backgroundColor = "#f00";
    friendBtn.style.backgroundColor = "#f00";

    return; //will prevent the code from futher execution
  }

  //to check if the player has chosen a symbol or not
  if (!player.man) {
    xBtn.style.backgroundColor = "#f00";
    oBtn.style.backgroundColor = "#f00";

    return; //will prevent the code from futher execution
  }


  //RUN THE GAME
  init(player, OPPONENT);
  options.classList.add("hide");
});

//switch active class between two options: computer & friend
function switchActive(off, on) {
  off.classList.remove("active");
  on.classList.add("active");
}
