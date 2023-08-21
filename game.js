function init(player, OPPONENT) {
  //select canvas
  const canvas = document.getElementById("cvs");
  const ctx = canvas.getContext("2d");

  //board variables

  let board = [];
  const COLUMN = 3;
  const ROW = 3;
  const SPACE_SIZE = 150;

  //Store player moves in a 1 dimensional array
  let gameData = new Array(9);

  //by default the first player to play is the human
  let currentPlayer = player.man;

  //load x and o images
  const xImage = new Image();
  xImage.src = "img/X.png";

  const oImage = new Image();
  oImage.src = "img/O.png";

  //winner combinations
  const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //for game over check
  let GAME_OVER = false;

  //draw the board
  function drawBoard() {
    //giving every space a unique id so that we know wher to put so we know where to put the player's move on the gameData array
    let id = 0;
    for (let i = 0; i < ROW; i++) {
      board[i] = [];
      for (let j = 0; j < COLUMN; j++) {
        board[i][j] = id;
        id++;

        //draw the spaces
        ctx.strokeStyle = "#000";
        ctx.strokeRect(j * SPACE_SIZE, i * SPACE_SIZE, SPACE_SIZE, SPACE_SIZE); //strokeRect(x,y,width,height)
      }
    }
  }
  drawBoard();

  //on player click
  canvas.addEventListener("click", function (event) {
    //if it is gameover stop
    if (GAME_OVER) return;
    //X & Y position of mouse click relative to the canvas
    let X = event.clientX - canvas.getBoundingClientRect().x;
    let Y = event.clientY - canvas.getBoundingClientRect().y;

    //calculating the i and j of the clicked SPACE
    let i = Math.floor(Y / SPACE_SIZE);
    let j = Math.floor(X / SPACE_SIZE);
    //math.floor is used to get and integer value

    //get id of the space the player clicked on
    let id = board[i][j];

    //prevent the players from playing in the same space twice
    if (gameData[id]) return;

    //store the players move to gameData
    gameData[id] = currentPlayer;

    //draw the move on board
    drawOnBoard(currentPlayer, i, j);

    //check if the play wins
    if (isWinner(gameData, currentPlayer)) {
      showGameOver(currentPlayer);
      GAME_OVER = true;
      return;
    }

    //check if tie
    if (isTie(gameData)) {
      showGameOver("Tie");
      GAME_OVER = true;
      return;
    }

    if (OPPONENT == "computer") {
      //get id of the space using minimax algorithm
      let id = minimax(gameData, player.computer).id;

      //store the players move to gameData
      gameData[id] = player.computer;

      //get i and j of the space
      let space = getIJ(id);

      //draw the move on board
      drawOnBoard(player.computer, space.i, space.j);

      //check if the play wins
      if (isWinner(gameData, player.computer)) {
        showGameOver(player.computer);
        GAME_OVER = true;
        return;
      }

      //check if tie
      if (isTie(gameData)) {
        showGameOver("Tie");
        GAME_OVER = true;
        return;
      }
    } else {
      //give turn to other player
      currentPlayer = currentPlayer == player.man ? player.friend : player.man;
    }
  });

  function minimax(gameData, PLAYER) {
    //BASE
    if(isWinner(gameData, player.computer)) return{evaluation : +10};
    if(isWinner(gameData, player.man)) return{evaluation : -10};
    if(isTie(gameData)) return{evaluation : 0};
  }
  function getEmptySpaces(gameData) {
    let EMPTY = [];

    for (let id = 0; id < gameData.length; i++) {
      if (!gameData[id]) EMPTY.push(id);
    }

    return EMPTY;
  }

  //get i and j of a space

  function getIJ(id) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if(board[i][j] == id) return {i:i,j:j}
      }
    }
  }

  //check for the winner
  function isWinner(gameData, player) {
    for (let i = 0; i < COMBOS.length; i++) {
      let won = true;
      for (let j = 0; j < COMBOS[i].length; j++) {
        let id = COMBOS[i][j];
        won = gameData[id] == player && won;
      }
      if (won) {
        return true;
      }
    }
    return false;
  }

  //check for tie game
  function isTie(gameData) {
    let isBoardFill = true;
    for (let i = 0; i < gameData.length; i++) {
      isBoardFill = gameData[i] && isBoardFill;
    }
    if (isBoardFill) {
      return true;
    }
    return false;
  }

  //show game over
  function showGameOver(player) {
    let message = player == "tie" ? "NO WINNER" : "THE WINNER IS:";
    let imgSrc = `img/${player}.png`;

    gameOverElement.innerHTML = `
    <h1>${message}</h1>
    <img class = "winner-img" src = ${imgSrc} </img>
    <div class = "play" onClick = "location.reload()">PLAY AGAIN</div>
    `;

    gameOverElement.classList.remove("hide");
  }

  //draw on board
  function drawOnBoard(player, i, j) {
    let img = player == "X" ? xImage : oImage;

    //the x and y position of the image are the x any of the clicked space
    ctx.drawImage(img, j * SPACE_SIZE, i * SPACE_SIZE);
  }
}
