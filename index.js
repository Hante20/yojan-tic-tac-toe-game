var player1 = "X";
var player2 = "O";
var cells = $(".cell");
var cell = document.querySelectorAll(".cell");
var turn = 0;
var tie = 0;
var twoPlayerMode = false;
var botMode = false;
var noviceBotMode = false;
var geniusBotMode = false;
var playerWin = false;
let corner = [0, 2, 6, 8];
let edge = [1, 3, 4];

// $(".mode-btn").on("click", function(){
//     alert("button clicked")
// });

$(".mode-two-player").on("click", function () {
  $(".intro").addClass("remove");
  $(".tic-tac-toe").removeClass("inactive");
  $(".disps").removeClass("inactive");
  $(".intro").css("z-index", -5);

  twoPlayerMode = true;
  gameStart();
  $(".mode-two-player").off("click");
});

$(".mode-bot").on("click", function () {
  $(".intro").addClass("remove");
  $(".tic-tac-toe").removeClass("inactive");
  $(".disps").removeClass("inactive");
  $(".intro").css("z-index", -5);

  botMode = true;
  gameStart();
  $(".mode-bot").off("click");
});

$(".mode-geniusBot").on("click", function () {
  $(".intro").addClass("remove");
  $(".tic-tac-toe").removeClass("inactive");
  $(".disps").removeClass("inactive");
  $(".intro").css("z-index", -5);

  geniusBotMode = true;
  gameStart();
  $(".mode-geniusBot").off("click");
});

function gameStart() {
  //initial starting of the game
  if (twoPlayerMode) {
    cells.on("click", function () {
      if (turn == 0) {
        $(this).text(player1);
        cells.css("visibility", "visible");
        $(this).off("click");
        playSound();
        turn++;
      } else if (turn == 1) {
        $(this).text(player2);
        $(this).css("visibility", "visible");
        $(this).off("click");
        turn--;
        playSound();
      }
      checkWin();
      checkTie(tie);
      console.log(tie);
    });
  } else if (botMode) {
    //bot mode statements

    cells.on("click", function () {
      if ($(this).text() != "X" && $(this).text() != "O") {
        var emptyCells = [];
        if (turn == 0) {
          $(this).text(player1);
          cells.css("visibility", "visible");
          $(this).off("click");
          turn++;
          playSound();
          checkWin();
        }
        if (!playerWin) {
          for (let i = 0; i < 9; i++) {
            if (cell[i].innerHTML != "X" && cell[i].innerHTML != "O") {
              // console.log(turn);
              emptyCells.push(i);
            }
          }

          turn--;
          if (emptyCells.length != 0) {
            let x = Math.floor(Math.random() * emptyCells.length);
            setTimeout(function () {
              document.querySelectorAll(".cell")[emptyCells[x]].innerHTML =
                player2;
                setTimeout(function(){
                    playSound();
                },200);
              checkWin();
            }, 500);
            // console.log(cell[emptyCells[x]]);
          }
          // console.log(emptyCells);
          // console.log(turn);
        }

        checkTie(tie);
        //   console.log(tie);
      }
    });
  } else if (noviceBotMode) {
    //novice bot's thought statements
  } else if (geniusBotMode) {
    //genius bot's code
    let depth = 0;
    let firstMove;
    cells.on("click", function () {
      if ($(this).text() != "X" && $(this).text() != "O") {
        var emptyCells = [];
        if (turn == 0) {
          $(this).text(player1);
          cells.css("visibility", "visible");
          $(this).off("click");
          turn++;
          depth++;
          playSound();
          checkWin();
          checkTie(tie);
        }
        if (!playerWin) {
          setTimeout(function () {
            if (depth < 2) {
              for (let i = 0; i < 9; i++) {
                if (cells.text()[i] == "X") {
                  firstMove = i;
                }
              }
              if (corner.includes(firstMove)) {
                document.querySelectorAll(".cell")[4].innerHTML = player2;
              } else if (edge.includes(firstMove)) {
                document.querySelectorAll(".cell")[0].innerHTML = player2;
              } else if (firstMove == 5) {
                document.querySelectorAll(".cell")[2].innerHTML = player2;
              } else if (firstMove == 7) {
                document.querySelectorAll(".cell")[1].innerHTML = player2;
              }
              depth++;
              turn--;
              setTimeout(function(){
                playSound();
            },200);
              checkWin();
              checkTie(tie);
            } else {
              for (let i = 0; i < 9; i++) {
                if (cell[i].innerHTML != "X" && cell[i].innerHTML != "O") {
                  // console.log(turn);
                  emptyCells.push(i);
                }
              }
            //   console.log(emptyCells);
              let nextMove = bestMove(emptyCells, turn);
              turn--;
                document.querySelectorAll(".cell")[nextMove].innerHTML = player2;
                setTimeout(function(){
                    playSound();
                },200);
              checkWin();
              checkTie(tie);

              // console.log(turn);
            }
          }, 500);
        }

        // console.log(tie);
      }
    });
  }
}

//this function will be called when the game restarts causing a infinite loop of the function satements
function twoPlayerGameRestart() {
  //for last
  console.log("game restarted");

  cells.on("click", function () {
    playerWin = false;
    if (turn == 0) {
      $(this).text(player1);
      cells.css("visibility", "visible");
      $(this).off("click");
      turn++;
      playSound();
    } else if (turn == 1) {
      $(this).text(player2);
      $(this).css("visibility", "visible");
      $(this).off("click");
      turn--;
      playSound();
    }
    checkWin();
    // console.log(tie);
    checkTie(tie);
  });
}

function botGameRestart() {
  cells.on("click", function () {
    if ($(this).text() != "X" && $(this).text() != "O") {
      playerWin = false;
      var emptyCells = [];
      if (turn == 0) {
        $(this).text(player1);
        cells.css("visibility", "visible");
        $(this).off("click");
        turn++;
        playSound();
        checkWin();
      }
      console.log("game restarted");
      console.log(playerWin);
      if (!playerWin) {
        for (let i = 0; i < 9; i++) {
          if (cell[i].innerHTML != "X" && cell[i].innerHTML != "O") {
            // console.log(turn);
            emptyCells.push(i);
          }
        }

        turn--;
        if (emptyCells.length != 0) {
          let x = Math.floor(Math.random() * emptyCells.length);
          setTimeout(function () {
            document.querySelectorAll(".cell")[emptyCells[x]].innerHTML =
              player2;
              setTimeout(function(){
                playSound();
            },200);
              
            checkWin();
          }, 500);
        }
        // console.log(emptyCells);
        // console.log(turn);
      }

      checkTie(tie);
      // console.log(tie);
    }
  });
}

function geniusBotGameRestart() {
  let depth = 0;
  let firstMove;
//   console.log("restarted");
//   console.log(depth);
  cells.on("click", function () {
    if($(this).text() != 'X' && $(this).text() != 'O')
    {
    playerWin = false;
    var emptyCells = [];
    if (turn == 0) {
      $(this).text(player1);
      cells.css("visibility", "visible");
      $(this).off("click");
      turn++;
      depth++;
      playSound();
      checkWin();
      checkTie(tie);
    }
    if (!playerWin) {
      setTimeout(function () {
        if (depth < 2) {
          for (let i = 0; i < 9; i++) {
            if (cells.text()[i] == "X") {
              firstMove = i;
            }
          }
          if (corner.includes(firstMove)) {
            document.querySelectorAll(".cell")[4].innerHTML = player2;
          } else if (edge.includes(firstMove)) {
            document.querySelectorAll(".cell")[0].innerHTML = player2;
          } else if (firstMove == 5) {
            document.querySelectorAll(".cell")[2].innerHTML = player2;
          } else if (firstMove == 7) {
            document.querySelectorAll(".cell")[1].innerHTML = player2;
          }
          depth++;
          turn--;
          setTimeout(function(){
            playSound();
        },200);
          checkWin();
          checkTie(tie);
        } else {
          for (let i = 0; i < 9; i++) {
            if (cell[i].innerHTML != "X" && cell[i].innerHTML != "O") {
              // console.log(turn);
              emptyCells.push(i);
            }
          }
          console.log(emptyCells);
          let nextMove = bestMove(emptyCells, turn);
          turn--;
          document.querySelectorAll(".cell")[nextMove].innerHTML = player2;
          setTimeout(function(){
            playSound();
        },200);
          checkWin();
          checkTie(tie);

          // console.log(turn);
        }
      }, 500);
    }

    // console.log(tie);
}
  });
}

function bestMove(checkBoard, forTurn) {
  let bestval = 1000;
  let optimalMove = 0;
  let initialBoard = checkBoard;
  let Max;
  if (forTurn == 1) {
    Max = true;
  } else {
    Max = false;
  }

  for (let i = 0; i < initialBoard.length; i++) {
    document.querySelectorAll(".cell")[initialBoard[i]].innerHTML =
      forTurn == 0 ? "X" : "O";
    checkBoard = [];
    for (let j = 0; j < 9; j++) {
      if (cell[j].innerHTML != "X" && cell[j].innerHTML != "O") {
        checkBoard.push(j);
      }
    }
    // console.log("O's move board");
    // console.log(checkBoard);

    let moveVal = miniMax(checkBoard, Max);
    // console.log(i);

    // console.log(initialBoard);
    // console.log(index);
    document.querySelectorAll(".cell")[initialBoard[i]].innerHTML =
      "<p>" + initialBoard[i] + "</p>";
    $(".cell p").addClass("invisible");

    if (moveVal < bestval) {
      bestval = moveVal;
      // console.log(i);
      optimalMove = initialBoard[i];
      // console.log(optimalMove+"is optimal move");
      // console.log(bestval);
    }
  }
  return optimalMove;
}

//checks if the value is minimizing or maximizing
function miniMax(board, is_max) {
  let player = "X";
  let opponent = "O";
  let score = checkWinforMiniMax(board);
  let init = board;
  let a = 0;
  // console.log(is_max+" board");
  // console.log(board);
  if (score == 1) {
    return score;
  } else if (score == -1) {
    return score;
  } else if (score == 0) {
    return score;
  }

  if (is_max) {
    let BestScore = -1000;
    for (let i = 0; i < init.length; i++) {
      // console.log(board[i]);
      document.querySelectorAll(".cell")[init[i]].innerHTML = player;
      board = [];
      for (let i = 0; i < 9; i++) {
        if (cell[i].innerHTML != "X" && cell[i].innerHTML != "O") {
          // console.log(turn);
          board.push(i);
        }
      }
      BestScore = Math.max(BestScore, miniMax(board, !is_max));
      //undo the move statements
      // console.log(a);
      document.querySelectorAll(".cell")[init[a]].innerHTML =
        "<p>" + init[a] + "</p>";
      $(".cell p").addClass("invisible");
      a++;
    }

    return BestScore;
  } else {
    let BestScore = 1000;
    for (let i = 0; i < init.length; i++) {
      // console.log(board[i]);
      document.querySelectorAll(".cell")[init[i]].innerHTML = opponent;
      board = [];
      for (let i = 0; i < 9; i++) {
        if (cell[i].innerHTML != "X" && cell[i].innerHTML != "O") {
          board.push(i);
        }
      }
      BestScore = Math.min(BestScore, miniMax(board, !is_max));
      //undo the move statements
      // console.log(a);
      document.querySelectorAll(".cell")[init[a]].innerHTML =
        "<p>" + init[a] + "</p>";
      $(".cell p").addClass("invisible");
      a++;
    }

    return BestScore;
  }
}

function checkWinforMiniMax(boardCheck) {
  if (
    cells.text()[0] === cells.text()[1] &&
    cells.text()[1] === cells.text()[2]
  ) {
    if (cells.text()[0] === "X") {
      return 1;
    } else {
      return -1;
    }
  } else if (
    cells.text()[0] === cells.text()[4] &&
    cells.text()[4] === cells.text()[8]
  ) {
    if (cells.text()[0] === "X") {
      //change the win status of x;
      return 1;
    } else {
      //change the win status of o;
      return -1;
    }
  } else if (
    cells.text()[2] === cells.text()[4] &&
    cells.text()[4] === cells.text()[6]
  ) {
    if (cells.text()[2] === "X") {
      //change the win status of x;
      return 1;
    } else {
      //change the win status of o;
      return -1;
    }
  } else if (
    cells.text()[0] === cells.text()[3] &&
    cells.text()[3] === cells.text()[6]
  ) {
    if (cells.text()[0] === "X") {
      //change the win status of x;
      return 1;
    } else {
      //change the win status of o;
      return -1;
    }
  } else if (
    cells.text()[2] === cells.text()[5] &&
    cells.text()[5] === cells.text()[8]
  ) {
    if (cells.text()[2] === "X") {
      //change the win status of x;
      return 1;
    } else {
      //change the win status of o;
      return -1;
    }
  } else if (
    cells.text()[6] === cells.text()[7] &&
    cells.text()[7] === cells.text()[8]
  ) {
    if (cells.text()[6] === "X") {
      //change the win status of x;
      return 1;
    } else {
      //change the win status of o;
      return -1;
    }
  } else if (
    cells.text()[3] === cells.text()[4] &&
    cells.text()[4] === cells.text()[5]
  ) {
    if (cells.text()[3] === "X") {
      //change the win status of x;
      return 1;
    } else {
      //change the win status of o;
      return -1;
    }
  } else if (
    cells.text()[1] === cells.text()[4] &&
    cells.text()[4] === cells.text()[7]
  ) {
    if (cells.text()[4] === "X") {
      //change the win status of x;
      return 1;
    } else {
      //change the win status of o;
      return -1;
    }
  } else if (boardCheck.length == 0) {
    return 0;
  }
}

//checks the win and restarts the game
function checkWin() {
  if (
    cells.text()[0] === cells.text()[1] &&
    cells.text()[1] === cells.text()[2]
  ) {
    if (cells.text()[0] === "X") {
      $(".disps .stats").text("Win: X");
      winSound();
    } else {
      $(".disps .stats").text("Win: O");
      lostSound();
    }
    swapPlayers();
  } else if (
    cells.text()[0] === cells.text()[4] &&
    cells.text()[4] === cells.text()[8]
  ) {
    if (cells.text()[0] === "X") {
      //change the win status of x;
      $(".disps .stats").text("Win: X");
      winSound();
    } else {
      //change the win status of o;
      $(".disps .stats").text("Win: O");
      lostSound();
    }
    swapPlayers();
  } else if (
    cells.text()[2] === cells.text()[4] &&
    cells.text()[4] === cells.text()[6]
  ) {
    if (cells.text()[2] === "X") {
      //change the win status of x;
      $(".disps .stats").text("Win: X");
      winSound();
    } else {
      //change the win status of o;
      $(".disps .stats").text("Win: O");
      lostSound();
    }
    swapPlayers();
  } else if (
    cells.text()[0] === cells.text()[3] &&
    cells.text()[3] === cells.text()[6]
  ) {
    if (cells.text()[0] === "X") {
      //change the win status of x;
      $(".disps .stats").text("Win: X");
      winSound();
    } else {
      //change the win status of o;
      $(".disps .stats").text("Win: O");
      lostSound();
    }
    swapPlayers();
  } else if (
    cells.text()[2] === cells.text()[5] &&
    cells.text()[5] === cells.text()[8]
  ) {
    if (cells.text()[2] === "X") {
      //change the win status of x;
      $(".disps .stats").text("Win: X");
      winSound();
    } else {
      //change the win status of o;
      $(".disps .stats").text("Win: O");
      lostSound();
    }
    swapPlayers();
  } else if (
    cells.text()[6] === cells.text()[7] &&
    cells.text()[7] === cells.text()[8]
  ) {
    if (cells.text()[6] === "X") {
      //change the win status of x;
      $(".disps .stats").text("Win: X");
      winSound();
    } else {
      //change the win status of o;
      $(".disps .stats").text("Win: O");
      lostSound();
    }
    swapPlayers();
  } else if (
    cells.text()[3] === cells.text()[4] &&
    cells.text()[4] === cells.text()[5]
  ) {
    if (cells.text()[3] === "X") {
      //change the win status of x;
      $(".disps .stats").text("Win: X");
      winSound();
    } else {
      //change the win status of o;
      $(".disps .stats").text("Win: O");
      lostSound();
    }
    swapPlayers();
  } else if (
    cells.text()[1] === cells.text()[4] &&
    cells.text()[4] === cells.text()[7]
  ) {
    if (cells.text()[4] === "X") {
      //change the win status of x;
      $(".disps .stats").text("Win: X");
      winSound();
    } else {
      //change the win status of o;
      $(".disps .stats").text("Win: O");
      lostSound();
    }
    swapPlayers();
  }
  if (!playerWin) {
    tie++;
    // console.log(tie);
  }
}

//checks for tie and restarts the game
function checkTie(clicks) {
  if (clicks == 9) {
    $(".disps p").text("Game Tie");
    tieSound();
    //Swap the players
    swapPlayers();
  }
}

//swap the players for the next round when game restarts
function swapPlayers() {
  playerWin = true;
  tie = 0;
  if (twoPlayerMode) {
    var temp = player1;
    player1 = player2;
    player2 = temp;
  }
  restart();
}

//restarts the game
function restart() {
  setTimeout(function () {
    for (let i = 0; i < 9; i++) {
      document.querySelectorAll(".cell")[i].innerHTML = "<p>" + i + "</p>";
      $(".cell p").addClass("invisible");
      $(".player1").text(player1);
      $(".player2").text(player2);
    }
  }, 2000);
  turn = 0;
  // console.log(player1);
  // console.log(player2);
  cells.off("click");

  // twoPlayerMode = false;
  if (twoPlayerMode) {
    twoPlayerGameRestart();
  } else if (botMode) {
    //loop the game using function
    botGameRestart();
  } else if (geniusBotMode) {
    geniusBotGameRestart();
  }
}
function playSound()
{
    let audio = new Audio("sounds/select-sound.mp3");
    audio.play();
}

function winSound()
{
    let audio = new Audio("sounds/yay.mp3");
    audio.play();
}

function lostSound()
{
    let audio = new Audio("sounds/negative_beeps.mp3");
    audio.play();
}
function tieSound()
{
    let audio = new Audio("sounds/failure.mp3");
    audio.play();
}
