// GameBoard module
const GameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const initBoard = () => {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };

  const getBoard = () => board;

  const setCell = (row, col, mark) => (board[row][col] = mark);

  const isEmpty = (row, col) => board[row][col] === "";

  const checkBoardFull = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") {
          return false;
        }
      }
    }
    return true;
  };

  const checkRowWin = () => {
    let is_win;
    for (let i = 0; i < board.length; i++) {
      is_win = true;
      for (let j = 0; j < board[i].length - 1; j++) {
        if (board[i][j] !== board[i][j + 1] || isEmpty(i, j)) {
          is_win = false;
        }
      }
      if (is_win) {
        return is_win;
      }
    }
    return false;
  };

  const checkColWin = () => {
    let is_win;
    for (let i = 0; i < board[0].length; i++) {
      is_win = true;
      for (let j = 0; j < board.length - 1; j++) {
        if (board[j][i] !== board[j + 1][i] || isEmpty(j, i)) {
          is_win = false;
        }
      }
      if (is_win) {
        return is_win;
      }
    }
    return false;
  };

  const checkDiagWin = () => {
    let is_win = true;
    for (let i = 0; i < board.length - 1; i++) {
      if (board[i][i] !== board[i + 1][i + 1] || isEmpty(i, i)) {
        is_win = false;
      }
    }
    if (is_win) {
      return is_win;
    }

    is_win = true;
    for (let i = 0; i < board.length - 1; i++) {
      if (
        board[board.length - 1 - i][i] !== board[board.length - 2 - i][i + 1] ||
        isEmpty(board.length - 1 - i, i)
      ) {
        is_win = false;
      }
    }
    if (is_win) {
      return is_win;
    }
    return false;
  };

  const checkWin = () => {
    return checkRowWin() || checkColWin() || checkDiagWin();
  };

  return {
    initBoard,
    getBoard,
    setBoard: setCell,
    checkWin,
    isEmpty,
    checkBoardFull,
  };
})();

// DisplayController module
const DisplayController = (() => {
  const board_elem = document.querySelector(".board");
  const game_screen = document.querySelector(".game-screen");
  const menu = document.querySelector(".menu");
  const end_screen = document.querySelector(".end-screen");
  const end_msg = document.querySelector(".end-msg");
  const controls = document.querySelector(".controls");
  const two_players_setting = document.querySelector(".two-players-setting");
  const one_player_setting = document.querySelector(".one-player-setting");
  const advanced_setting = document.querySelector(".advanced-setting");
  const player1_name = document.querySelector("#player1-name");
  const player2_name = document.querySelector("#player2-name");
  const player_name = document.querySelector("#player-name");
  const player_turn = document.querySelector(".player-turn");
  const round_p = document.querySelector(".round");
  const player1_score = document.querySelector("#player1-score");
  const player2_score = document.querySelector("#player2-score");
  const player1_display = document.querySelector("#player1-display");
  const player2_display = document.querySelector("#player2-display");
  const overlay = document.querySelector(".overlay");
  const scoreboard = document.querySelector(".scoreboard");
  const scoreboard_name1 = document.querySelector(
    ".player1-total .player-name"
  );
  const scoreboard_name2 = document.querySelector(
    ".player2-total .player-name"
  );
  const scoreboard_score1 = document.querySelector(".player1-total .end-score");
  const scoreboard_score2 = document.querySelector(".player2-total .end-score");
  const score_difference = document.querySelector(".score-difference");

  const displayBoard = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        const cell = document.querySelector(`#cell-${i}${j}`);
        cell.textContent = board[i][j];
        if (i === 0) {
          cell.style.borderTop = "none";
        }
        if (j === 0) {
          cell.style.borderLeft = "none";
        }
        if (i === board.length - 1) {
          cell.style.borderBottom = "none";
        }
        if (j === board.length - 1) {
          cell.style.borderRight = "none";
        }
      }
    }
  };

  const generateBoard = (() => {
    let board = GameBoard.getBoard();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell_elem = document.createElement("div");
        cell_elem.className = "cell";
        cell_elem.id = `cell-${i}${j}`;
        board_elem.appendChild(cell_elem);
      }
    }
  })();

  const resetCell = () => {
    const cells = document.querySelectorAll(".cell");
    for (let cell of cells) {
      if (cell.classList.contains("x")) {
        cell.classList.remove("x");
      }
      if (cell.classList.contains("o")) {
        cell.classList.remove("o");
      }
    }
  };

  const getCellNum = (cell_elem) => {
    let id = cell_elem.id;
    return id.replace(/[^0-9]/g, "");
  };

  const fillCell = (row, col, mark) => {
    const cell_elem = document.querySelector(`#cell-${row}${col}`);
    cell_elem.textContent = mark;
    if (mark === "x") {
      cell_elem.classList.add("x");
    } else {
      cell_elem.classList.add("o");
    }
  };

  const displayGameScreen = () => {
    game_screen.style.display = "flex";
    controls.style.display = "flex";
    menu.style.display = "none";
    end_screen.style.display = "none";
    scoreboard.style.display = "none";
    overlay.style.display = "none";
    displayBoard(GameBoard.getBoard());
  };

  const displayMenuScreen = () => {
    overlay.style.display = "none";
    menu.style.display = "flex";
    game_screen.style.display = "none";
    end_screen.style.display = "none";
    scoreboard.style.display = "none";
    advanced_setting.style.display = "none";
  };

  const displayEndScreen = (result, winner) => {
    overlay.style.display = "block";
    end_screen.style.display = "flex";
    controls.style.display = "none";
    if (result === "w") {
      end_msg.textContent = winner.getName() + " wins!";
      winner.setScore(winner.getScore() + 1);
    } else {
      end_msg.textContent = "It's a draw!";
    }
  };

  const displayScoreBoard = (player1, player2) => {
    scoreboard.style.display = "flex";
    end_screen.style.display = "none";
    overlay.style.display = "block";
    scoreboard_name1.textContent = `${player1.getName()}`;
    scoreboard_name2.textContent = `${player2.getName()}`;
    scoreboard_score1.textContent = `${player1.getScore()}`;
    scoreboard_score2.textContent = `${player2.getScore()}`;
    let winner;
    if (player1.getScore() > player2.getScore()) {
      winner = player1;
    } else if (player2.getScore() > player1.getScore()) {
      winner = player2;
    } else {
      winner = null;
    }
    if (winner) {
      score_difference.textContent = `${winner.getName()} wins by
            ${Math.abs(player1.getScore() - player2.getScore())} score`;
    } else {
      score_difference.textContent = "It's a win-win situation";
    }
  };

  const displayPlayer = (player) => {
    player_turn.textContent = player.getName() + "'s turn!";
  };

  const displayRound = (round) => {
    round_p.textContent = "Round " + round;
  };

  const displayScore = (player1, player2) => {
    player1_display.textContent = player1.getName();
    player2_display.textContent = player2.getName();
    player1_score.textContent = player1.getScore();
    player2_score.textContent = player2.getScore();
  };

  const displayTwoPlayersSetting = () => {
    two_players_setting.style.display = "flex";
    one_player_setting.style.display = "none";
    advanced_setting.style.display = "block";
  };

  const displayOnePlayerSetting = () => {
    two_players_setting.style.display = "none";
    one_player_setting.style.display = "flex";
    advanced_setting.style.display = "block";
  };

  const resetInputField = () => {
    player1_name.value = "Player 1";
    player2_name.value = "Player 2";
    player_name.value = "Player";
  };

  const clearSelectedClass = () => {
    const selected = document.querySelectorAll(".selected");
    for (let field of selected) {
      field.classList.remove("selected");
    }
  };

  return {
    displayBoard,
    resetCell,
    getCellNum,
    fillCell,
    displayPlayer,
    displayRound,
    displayScore,
    displayGameScreen,
    displayMenuScreen,
    displayEndScreen,
    displayScoreBoard,
    displayTwoPlayersSetting,
    displayOnePlayerSetting,
    resetInputField,
    clearSelectedClass,
  };
})();

// Player factory
const Player = (name, mark, score = 0) => {
  const getName = () => name;
  const getMark = () => mark;
  const getScore = () => score;
  const setScore = (new_score) => (score = new_score);
  const makeMove = (...args) => {
    // console.log("human move");
    let position = args;
    let row = position[0];
    let col = position[1];
    if (GameBoard.isEmpty(row, col)) {
      GameBoard.setBoard(row, col, mark);
      DisplayController.fillCell(row, col, mark);
      return true;
    } else {
      return false;
    }
  };
  return { getName, getMark, getScore, setScore, makeMove };
};

const EasyAIPlayer = (name, mark, score = 0) => {
  const { getName } = Player(name, mark);
  const { getMark } = Player(name, mark);
  const getScore = () => score;
  const setScore = (new_score) => (score = new_score);
  const makeMove = () => {
    // console.log("ai move");
    let board = GameBoard.getBoard();
    let randomRow, randomCol;
    do {
      randomRow = Math.floor(Math.random() * board.length);
      randomCol = Math.floor(Math.random() * board.length);
    } while (!GameBoard.isEmpty(randomRow, randomCol));
    GameBoard.setBoard(randomRow, randomCol);
    DisplayController.fillCell(randomRow, randomCol, mark);
  };
  return { getName, getMark, getScore, setScore, makeMove };
};

// GameFlow module
const GameFlow = (() => {
  let player1,
    player2,
    curr_player,
    game_mode,
    player1_mark,
    player2_mark,
    computer_player,
    aiDifficulty;
  let round = 1;

  const checkGameEnd = () => {
    if (GameBoard.checkWin()) {
      console.log(curr_player + "wins");
      DisplayController.displayEndScreen("w", curr_player);
      return true;
    } else if (GameBoard.checkBoardFull()) {
      DisplayController.displayEndScreen("d");
      return true;
    }
    return false;
  };

  const moveHandler = (e) => {
    let cell_num = e.target.id.replace(/[^0-9]/g, "");
    curr_player.makeMove(cell_num[0], cell_num[1]);
    if (!checkGameEnd()) {
      curr_player = switchPlayer(curr_player);
      if (game_mode == 1) {
        setTimeout(() => {
          curr_player.makeMove();
          checkGameEnd();
          curr_player = switchPlayer(curr_player);
        }, 500);
      }
    }
  };

  const switchPlayer = (curr_player) => {
    let next_player = curr_player === player1 ? player2 : player1;
    DisplayController.displayPlayer(next_player);
    return next_player;
  };

  const playerMove = (() => {
    const cells = document.querySelectorAll(".cell");
    Array.from(cells).forEach((cell) =>
      cell.addEventListener("click", moveHandler)
    );
  })();

  const getPlayer = () => {
    if (!player1_mark || !player2_mark) {
      return false;
    } else {
      if (game_mode == 2) {
        const player1_name = document.querySelector("#player1-name");
        const player2_name = document.querySelector("#player2-name");
        player1 = Player(player1_name.value, player1_mark);
        player2 = Player(player2_name.value, player2_mark);
      } else if (game_mode == 1) {
        const player_name = document.querySelector("#player-name");
        player1 = Player(player_name.value, player1_mark);
        if (aiDifficulty == "Easy") {
          player2 = EasyAIPlayer(computer_player, player2_mark);
        }
      }
      return true;
    }
  };

  const backToMenu = () => {
    initSetting();
    DisplayController.displayMenuScreen();
  };

  const showScoreBoard = () => {
    DisplayController.displayScoreBoard(player1, player2);
  };

  const newGame = () => {
    if (getPlayer()) {
      initGame();
      DisplayController.displayPlayer(player1);
      DisplayController.displayRound(round);
      DisplayController.displayScore(player1, player2);
      DisplayController.displayGameScreen();
      DisplayController.resetInputField();
      DisplayController.clearSelectedClass();
    }
  };

  const reset = () => {
    initGame();
    DisplayController.displayPlayer(player1);
    DisplayController.displayScore(player1, player2);
    DisplayController.displayGameScreen();
  };

  const initSetting = () => {
    player1 = undefined;
    player2 = undefined;
    player1_mark = undefined;
    player2_mark = undefined;
    game_mode = undefined;
    round = 1;
    computer_player = undefined;
  };

  const initGame = () => {
    curr_player = player1;
    GameBoard.initBoard();
    DisplayController.resetCell();
  };

  const setUpStartBtn = (() => {
    const start_btn = document.querySelector("#start");
    start_btn.addEventListener("click", newGame);
  })();

  const setUpNewRoundBtn = (() => {
    const new_round_btn = document.querySelector("#new-round");
    new_round_btn.addEventListener("click", () => {
      reset();
      round++;
      DisplayController.displayRound(round);
    });
  })();

  const setUpReturnBtn = (() => {
    const return_btn = document.querySelectorAll(".return");
    return_btn.forEach((btn) => btn.addEventListener("click", backToMenu));
  })();

  const setUpResetBtn = (() => {
    const reset_btn = document.querySelector("#reset");
    reset_btn.addEventListener("click", reset);
  })();

  const setUpEndGameBtn = (() => {
    const end_game_btn = document.querySelectorAll(".end-game");
    end_game_btn.forEach((btn) =>
      btn.addEventListener("click", showScoreBoard)
    );
  })();

  const setUpGameMode = (() => {
    const two_players_btn = document.querySelector("#two-players");
    const one_player_btn = document.querySelector("#one-player");
    two_players_btn.addEventListener("click", () => {
      if (game_mode != 2) {
        game_mode = 2;
        two_players_btn.classList.add("selected");
        DisplayController.displayTwoPlayersSetting();
        if (one_player_btn.classList.contains("selected")) {
          one_player_btn.classList.remove("selected");
        }
      }
    });
    one_player_btn.addEventListener("click", () => {
      if (game_mode != 1) {
        game_mode = 1;
        one_player_btn.classList.add("selected");
        DisplayController.displayOnePlayerSetting();
        if (two_players_btn.classList.contains("selected")) {
          two_players_btn.classList.remove("selected");
        }
      }
    });
  })();

  const toggleMark = (btn1, btn2) => {
    btn1.classList.add("selected");
    if (btn2.classList.contains("selected")) {
      btn2.classList.remove("selected");
    }
  };

  const setUpOnePlayerMark = (() => {
    const x_mark_btn = document.querySelector("#x-mark");
    const o_mark_btn = document.querySelector("#o-mark");
    x_mark_btn.addEventListener("click", () => {
      player1_mark = x_mark_btn.textContent;
      player2_mark = o_mark_btn.textContent;
      toggleMark(x_mark_btn, o_mark_btn);
    });
    o_mark_btn.addEventListener("click", () => {
      player1_mark = o_mark_btn.textContent;
      player2_mark = x_mark_btn.textContent;
      toggleMark(o_mark_btn, x_mark_btn);
    });
  })();

  const setUpTwoPlayersMark = (() => {
    const x_mark_btn1 = document.querySelector("#player1-x-mark");
    const x_mark_btn2 = document.querySelector("#player2-x-mark");
    const o_mark_btn1 = document.querySelector("#player1-o-mark");
    const o_mark_btn2 = document.querySelector("#player2-o-mark");

    const mark_variation1 = () => {
      player1_mark = x_mark_btn1.textContent;
      player2_mark = o_mark_btn2.textContent;
      toggleMark(x_mark_btn1, o_mark_btn1);
      toggleMark(o_mark_btn2, x_mark_btn2);
    };

    const mark_variation2 = () => {
      player1_mark = o_mark_btn1.textContent;
      player2_mark = x_mark_btn2.textContent;
      toggleMark(o_mark_btn1, x_mark_btn1);
      toggleMark(x_mark_btn2, o_mark_btn2);
    };

    x_mark_btn1.addEventListener("click", mark_variation1);

    x_mark_btn2.addEventListener("click", mark_variation2);

    o_mark_btn1.addEventListener("click", mark_variation2);

    o_mark_btn2.addEventListener("click", mark_variation1);
  })();

  const setUpDifficultyBtn = (() => {
    const difficultyBtns = document.querySelectorAll(".difficulty-btn");
    difficultyBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.textContent == "Easy") {
          computer_player = "Easy peasy AI";
          aiDifficulty = "Easy";
        }
      });
    });
  })();
})();
