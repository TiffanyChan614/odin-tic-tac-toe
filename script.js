// GameBoard module
const GameBoard = (() => {
    let board = [['', '', ''],
                ['', '', ''],
                ['', '', '']];

    const initBoard = () => {
        board = [['', '', ''],
                ['', '', ''],
                ['', '', '']];
    };

    const getBoard = () => board;

    const setCell = (row, col, mark) => board[row][col] = mark;

    const isEmpty = (row, col) => board[row][col] === '';

    const checkBoardFull = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === '') {
                    return false;
                }
            }
        }
        return true;
    }

    const checkRowWin = () => {
        let is_win;
        for (let i = 0; i < board.length; i++) {
            is_win = true;
            for (let j = 0; j < board[i].length - 1; j++) {
                if (board[i][j] !== board[i][j+1] || isEmpty(i, j)) {
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
                if (board[j][i] !== board[j+1][i] || isEmpty(j, i)) {
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
            if (board[i][i] !== board[i+1][i+1] || isEmpty(i, i)) {
                is_win = false;
            }
        }
        if (is_win) {
            return is_win;
        }

        is_win = true;
        for(let i = 0; i < board.length - 1; i++) {
            if (board[board.length-1-i][i] !== board[board.length-2-i][i+1] || isEmpty(board.length-1-i, i)) {
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

    return {initBoard, getBoard, setBoard: setCell, checkWin, isEmpty, checkBoardFull};

}) ();

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

    const displayBoard = (board) => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const cell = document.querySelector(`#cell-${i}${j}`);
                cell.textContent = board[i][j];
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
    }) ();

    const getCellNum = (cell_elem) => {
        let id = cell_elem.id;
        return id.replace(/[^0-9]/g, '');
    };

    const fillCell = (cell_elem, mark) => {
        cell_elem.textContent = mark;
    };

    const displayGameScreen = () => {
        game_screen.style.display = "block";
        menu.style.display = "none";
        end_screen.style.display = "none";
        displayBoard(GameBoard.getBoard());
    };

    const displayMenuScreen = () => {
        menu.style.display = "block";
        game_screen.style.display = "none";
        end_screen.style.display = "none";
    };

    const displayEndScreen = (result, winner) => {
        end_screen.style.display = "block";
        controls.style.display = "none";
        if (result === 'w') {
            end_msg.textContent = winner.getName() + " wins!";
        }
        else {
            end_msg.textContent = "It's a draw!";
        }
    };

    const displayTwoPlayersSetting = () => {
        two_players_setting.style.display = "block";
        one_player_setting.style.display = "none";
    }

    const displayOnePlayerSetting = () => {
        two_players_setting.style.display = "none";
        one_player_setting.style.display = "block";
    }

    const resetInputField = () => {
        const player1_name = document.querySelector("#player1-name");
        const player2_name = document.querySelector("#player2-name");
        const player_name = document.querySelector("#player-name");
        player1_name.value = "Player 1";
        player2_name.value = "Player 2";
        player_name.value = "player";
    }

    return {displayBoard, getCellNum, fillCell, displayGameScreen,
        displayMenuScreen, displayEndScreen, displayTwoPlayersSetting, displayOnePlayerSetting, resetInputField};
}) ();

// Player factory
const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return {getName, getMark};
}

// GameFlow module
const GameFlow = (() => {
    let player1, player2, curr_player, game_mode, player1_mark, player2_mark;

    const cellEventHandler = (e) => {
        let cell_num = DisplayController.getCellNum(e.target);
        let row = cell_num[0];
        let col = cell_num[1];
        if (GameBoard.isEmpty(row, col)) {
            GameBoard.setBoard(row, col, curr_player.getMark());
            DisplayController.fillCell(e.target, curr_player.getMark());
            DisplayController.displayBoard(GameBoard.getBoard());
            if (GameBoard.checkWin()) {
                DisplayController.displayEndScreen('w', curr_player);
            }
            else if (GameBoard.checkBoardFull()) {
                DisplayController.displayEndScreen('d');
            }
            else {
                curr_player = switchPlayer(curr_player);
            }
        }
    };

    const switchPlayer = (curr_player) => {
        return curr_player === player1? player2 : player1;
    }

    const move = (() => {
        const cells = document.querySelectorAll(".cell");
        Array.from(cells).forEach(cell =>
            cell.addEventListener('click', cellEventHandler));
    }) ();

    const getPlayer = () => {
        if (game_mode == 2) {
            const player1_name = document.querySelector("#player1-name");
            const player2_name = document.querySelector("#player2-name");
            player1 = Player(player1_name.value, player1_mark);
            player2 = Player(player2_name.value, player2_mark);
        }
        else if (game_mode == 1) {
            const player_name = document.querySelector("#player-name");
            player1 = Player(player_name.value, player1_mark);
            player2 = Player("Computer", player2_mark);
        }
    }

    const anotherGame = () => {
        getPlayer();
        initGame();
        DisplayController.displayMenuScreen();
        DisplayController.resetInputField();
    }

    const newGame = () => {
        getPlayer();
        initGame();
        DisplayController.displayGameScreen();
        DisplayController.resetInputField();
    }

    const newRound = () => {
        initGame();
        DisplayController.displayGameScreen();
    }

    const initGame = () => {
        curr_player = player1;
        GameBoard.initBoard();
    }

    const setUpStartBtn = (() => {
        const start_btn = document.querySelector("#start");
        start_btn.addEventListener('click', newGame);
    }) ();

    const setUpNewRoundBtn = (() => {
        const new_round_btn = document.querySelector("#new-round");
        new_round_btn.addEventListener('click', newRound);
    }) ();

    const setUpNewGameBtn = (() => {
        const new_game_btn = document.querySelector("#new-game");
        new_game_btn.addEventListener('click', anotherGame);
    }) ();

    const setUpResetBtn = (() => {
        const reset_btn = document.querySelector("#reset");
        reset_btn.addEventListener('click', newRound);
    }) ();

    const setUpReturnBtn = (() => {
        const return_btn = document.querySelector("#return");
        return_btn.addEventListener('click', anotherGame);
    }) ();

    const setUpPlayerMode = (() => {
        const two_players_btn = document.querySelector("#two-players");
        const one_player_btn = document.querySelector("#one-player");
        two_players_btn.addEventListener('click', () => {
            if (game_mode != 2) {
                game_mode = 2;
                two_players_btn.classList.add("selected");
                DisplayController.displayTwoPlayersSetting();
                if (one_player_btn.classList.contains("selected")) {
                    one_player_btn.classList.remove("selected");
                }
            }
        });
        one_player_btn.addEventListener('click', () => {
            if (game_mode != 1) {
                game_mode = 1;
                one_player_btn.classList.add("selected");
                DisplayController.displayOnePlayerSetting();
                if (two_players_btn.classList.contains("selected")) {
                    two_players_btn.classList.remove("selected");
                }
            }
        })
    }) ();

    const toggleMark = (btn1, btn2) => {
        btn1.classList.add("selected");
        if (btn2.classList.contains("selected")) {
            btn2.classList.remove("selected");
        }
    }

    const setUpOnePlayerMark = (() => {
        const x_mark_btn = document.querySelector("#x-mark");
        const o_mark_btn = document.querySelector("#o-mark");
        x_mark_btn.addEventListener('click', () => {
            player1_mark = 'X';
            player2_mark = 'O';
            toggleMark(x_mark_btn, o_mark_btn);
        })
        o_mark_btn.addEventListener('click', () => {
            player1_mark = 'O';
            player2_mark = 'X';
            toggleMark(o_mark_btn, x_mark_btn);
        })
    }) ();

    const setUpTwoPlayersMark = (() => {
        const x_mark_btn1 = document.querySelector("#player1-x-mark");
        const x_mark_btn2 = document.querySelector("#player2-x-mark");
        const o_mark_btn1 = document.querySelector("#player1-o-mark");
        const o_mark_btn2 = document.querySelector("#player2-o-mark");

        const mark_variation1 = () => {
            player1_mark = 'X';
            player2_mark = 'O';
            toggleMark(x_mark_btn1, o_mark_btn1);
            toggleMark(o_mark_btn2, x_mark_btn2);
        }

        const mark_variation2 = () => {
            player1_mark = 'O';
            player2_mark = 'X';
            toggleMark(o_mark_btn1, x_mark_btn1);
            toggleMark(x_mark_btn2, o_mark_btn2);
        }

        x_mark_btn1.addEventListener('click', mark_variation1);

        x_mark_btn2.addEventListener('click', mark_variation2);

        o_mark_btn1.addEventListener('click', mark_variation2);

        o_mark_btn2.addEventListener('click', mark_variation1);
    }) ();

}) ();
