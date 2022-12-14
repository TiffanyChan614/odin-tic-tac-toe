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
  const congrats_msg = document.querySelector(".congrats-msg");

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

  const displayEndScreen = (winner) => {
    overlay.style.display = "block";
    end_screen.style.display = "flex";
    controls.style.display = "none";
    if (winner) {
      end_msg.textContent = winner.getName() + " wins!";
      winner.setScore(winner.getScore() + 1);
    } else {
      end_msg.textContent = "It's a draw!";
    }
  };

  const displayScoreBoard = (player1, player2, game_mode) => {
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
    if (game_mode === 1 && winner === player2) {
      console.log("You lose!");
      congrats_msg.textContent = "If you learn from a loss you have not lost.";
      congrats_msg.style.fontSize = "1.8rem";
    }
    if (winner) {
      score_difference.textContent = `${winner.getName()} wins by
            ${Math.abs(player1.getScore() - player2.getScore())} score`;
    } else {
      score_difference.textContent = "It's a win-win!";
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

  const displayGameSetting = (game_mode) => {
    if (game_mode === 2) {
      two_players_setting.style.display = "flex";
      one_player_setting.style.display = "none";
      advanced_setting.style.display = "block";
    } else if (game_mode === 1) {
      two_players_setting.style.display = "none";
      one_player_setting.style.display = "flex";
      advanced_setting.style.display = "block";
    }
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
    displayGameSetting,
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
  return { getName, getMark, getScore, setScore };
};

const HumanPlayer = (name, mark) => {
  let player = Player(name, mark);
  const getName = player.getName;
  const getMark = player.getMark;
  const getScore = player.getScore;
  const setScore = player.setScore;
  const getType = () => "human";
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
  return { getName, getMark, getScore, setScore, getType, makeMove };
};

const EasyAIPlayer = (name, mark) => {
  let player = Player(name, mark);
  const getName = player.getName;
  const getMark = player.getMark;
  const getScore = player.getScore;
  const setScore = player.setScore;
  const getType = () => "ai";
  const makeMove = () => {
    // console.log("ai move");
    let board = GameBoard.getBoard();
    let randomRow, randomCol;
    do {
      randomRow = Math.floor(Math.random() * board.length);
      randomCol = Math.floor(Math.random() * board.length);
    } while (!GameBoard.isEmpty(randomRow, randomCol));
    GameBoard.setBoard(randomRow, randomCol, mark);
    console.log(board);
    DisplayController.fillCell(randomRow, randomCol, mark);
  };
  return { getName, getMark, getScore, setScore, getType, makeMove };
};

// const MediumAIPlayer = (name, mark) => {
//   let player = Player(name, mark);
//   const getName = player.getName;
//   const getMark = player.getMark;
//   const getScore = player.getScore;
//   const setScore = player.setScore;
//   const makeMove = () => {
//     // console.log("ai move");
//     let board = GameBoard.getBoard();
//     let randomRow, randomCol;
//     do {
//       randomRow = Math.floor(Math.random() * board.length);
//       randomCol = Math.floor(Math.random() * board.length);
//     } while (!GameBoard.isEmpty(randomRow, randomCol));
//     GameBoard.setBoard(randomRow, randomCol, mark);
//     console.log(board);
//     DisplayController.fillCell(randomRow, randomCol, mark);
//   };
//   return { getName, getMark, getScore, setScore, makeMove };
// };

const GameStat = (() => {
  let player1, player2, game_mode, ai_difficulty;
  let round = 1;

  const getPlayer1 = () => player1;
  const setPlayer1 = (player) => (player1 = player);
  const getPlayer2 = () => player2;
  const setPlayer2 = (player) => (player2 = player);
  const getGameMode = () => game_mode;
  const setGameMode = (new_game_mode) => (game_mode = new_game_mode);
  const getAiDifficulty = () => ai_difficulty;
  const setAiDifficulty = (new_ai_difficulty) =>
    (ai_difficulty = new_ai_difficulty);
  const getRound = () => round;
  const increaseRound = () => round++;
  const resetGame = () => {
    player1 = undefined;
    player2 = undefined;
    game_mode = undefined;
    ai_difficulty = undefined;
    round = 1;
  };

  return {
    getPlayer1,
    getPlayer2,
    setPlayer1,
    setPlayer2,
    getGameMode,
    setGameMode,
    getAiDifficulty,
    setAiDifficulty,
    getRound,
    increaseRound,
    resetGame,
  };
})();

const GameFlow = (() => {
  let curr_player, player1_mark, player2_mark, start_player;

  const checkGameEnd = () => {
    if (GameBoard.checkWin()) {
      DisplayController.displayEndScreen(curr_player);
      return {
        game_end: true,
        winner: curr_player,
      };
    } else if (GameBoard.checkBoardFull()) {
      DisplayController.displayEndScreen(null);
      return {
        game_end: true,
        winner: null,
      };
    }
    return {
      game_end: false,
      winner: null,
    };
  };

  const handleTurnEnd = (game_state) => {
    if (!game_state.game_end) {
      curr_player = switchPlayer(curr_player);
      DisplayController.displayPlayer(curr_player);
    } else {
      setNextRoundStartPlayer(game_state.winner);
    }
  };

  const setNextRoundStartPlayer = (winner) => {
    if (winner) console.log("winner: ", winner.getName());
    if (winner) {
      start_player = switchPlayer(winner);
    } else {
      start_player = switchPlayer(start_player);
    }
    curr_player = start_player;
  };

  const aiMove = () => {
    let game_state;
    setTimeout(() => {
      curr_player.makeMove();
      game_state = checkGameEnd();
      handleTurnEnd(game_state);
    }, 500);
    return game_state;
  };

  const playerMoveHandler = (e) => {
    let cell_num = e.target.id.replace(/[^0-9]/g, "");
    curr_player.makeMove(cell_num[0], cell_num[1]);
    let game_state = checkGameEnd();
    console.log(game_state);
    if (!game_state.game_end) {
      curr_player = switchPlayer(curr_player);
      DisplayController.displayPlayer(curr_player);
      if (GameStat.getGameMode() === 1) {
        game_state = aiMove();
        console.log(game_state);
      }
    } else {
      console.log("Game end");
      setNextRoundStartPlayer(game_state.winner);
    }
  };

  const playerMove = () => {
    if (curr_player && curr_player.getType() === "ai") {
      aiMove();
    }
    const cells = document.querySelectorAll(".cell");
    Array.from(cells).forEach((cell) => {
      cell.addEventListener("click", playerMoveHandler);
    });
  };

  const switchPlayer = (curr_player) => {
    let next_player =
      curr_player === GameStat.getPlayer1()
        ? GameStat.getPlayer2()
        : GameStat.getPlayer1();
    return next_player;
  };

  const getPlayer = () => {
    if (!player1_mark || !player2_mark) {
      return false;
    } else {
      if (GameStat.getGameMode() === 2) {
        const player1_name = document.querySelector("#player1-name");
        const player2_name = document.querySelector("#player2-name");
        GameStat.setPlayer1(HumanPlayer(player1_name.value, player1_mark));
        GameStat.setPlayer2(HumanPlayer(player2_name.value, player2_mark));
      } else if (GameStat.getGameMode() === 1) {
        const player_name = document.querySelector("#player-name");
        GameStat.setPlayer1(HumanPlayer(player_name.value, player1_mark));
        if (GameStat.getAiDifficulty() === 1) {
          GameStat.setPlayer2(EasyAIPlayer("Easy Peasy AI", player2_mark));
        }
      }
      return true;
    }
  };

  const setUpControlButtons = (() => {
    const initSetting = () => {
      GameStat.resetGame();
      player1_mark = undefined;
      player2_mark = undefined;
    };

    const initBoard = () => {
      GameBoard.initBoard();
      DisplayController.resetCell();
    };

    const initDisplay = () => {
      DisplayController.displayPlayer(curr_player);
      DisplayController.displayRound(GameStat.getRound());
      DisplayController.displayScore(
        GameStat.getPlayer1(),
        GameStat.getPlayer2()
      );
      DisplayController.displayGameScreen();
      DisplayController.resetInputField();
      DisplayController.clearSelectedClass();
    };

    const backToMenu = () => {
      initSetting();
      DisplayController.displayMenuScreen();
    };

    const showScoreBoard = () => {
      DisplayController.displayScoreBoard(
        GameStat.getPlayer1(),
        GameStat.getPlayer2(),
        GameStat.getGameMode()
      );
    };

    const initGame = () => {
      if (getPlayer()) {
        curr_player = GameStat.getPlayer1();
        start_player = curr_player;
        initBoard();
        initDisplay();
        playerMove();
      }
    };

    const reset = () => {
      initBoard();
      DisplayController.displayPlayer(curr_player);
      DisplayController.displayScore(
        GameStat.getPlayer1(),
        GameStat.getPlayer2()
      );
      DisplayController.displayGameScreen();
      playerMove();
    };

    const setUpStartBtn = (() => {
      const start_btn = document.querySelector("#start");
      start_btn.addEventListener("click", () => {
        initGame();
      });
    })();

    const setUpNewRoundBtn = (() => {
      const new_round_btn = document.querySelector("#new-round");
      new_round_btn.addEventListener("click", () => {
        reset();
        GameStat.increaseRound();
        DisplayController.displayBoard(GameStat.getRound());
      });
    })();

    const setUpReturnBtn = (() => {
      const return_btn = document.querySelectorAll(".return");
      return_btn.forEach((btn) => btn.addEventListener("click", backToMenu));
    })();

    const setUpResetBtn = (() => {
      const reset_btn = document.querySelector("#reset");
      reset_btn.addEventListener("click", () => {
        curr_player = start_player;
        reset();
      });
    })();

    const setUpEndGameBtn = (() => {
      const end_game_btn = document.querySelectorAll(".end-game");
      end_game_btn.forEach((btn) =>
        btn.addEventListener("click", showScoreBoard)
      );
    })();
  })();

  const setUpGameMode = (() => {
    const one_player_btn = document.querySelector("#one-player");
    const two_players_btn = document.querySelector("#two-players");

    const toggleGameMode = (game_mode, btnOn, btnOff) => {
      if (GameStat.getGameMode() != game_mode) {
        GameStat.setGameMode(game_mode);
        // console.log(GameStat.getGameMode());
        btnOn.classList.add("selected");
        DisplayController.displayGameSetting(game_mode);
        if (btnOff.classList.contains("selected")) {
          btnOff.classList.remove("selected");
        }
      }
    };

    one_player_btn.addEventListener("click", () =>
      toggleGameMode(1, one_player_btn, two_players_btn)
    );

    two_players_btn.addEventListener("click", () =>
      toggleGameMode(2, two_players_btn, one_player_btn)
    );
  })();

  const setUpMark = (() => {
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
  })();

  const setUpDifficulty = (() => {
    const difficulty_btns = document.querySelectorAll(".difficulty-btn");
    difficulty_btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.textContent === "Easy") {
          GameStat.setAiDifficulty(1);
        } else if (btn.textContent === "Medium") {
          GameStat.setAiDifficulty(2);
        } else if (btn.textContent === "Hard") {
          GameStat.setAiDifficulty(3);
        }
      });
    });
  })();
})();
