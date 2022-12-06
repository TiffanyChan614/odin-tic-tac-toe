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

    return {initBoard, getBoard, setBoard: setCell, checkWin, isEmpty};

}) ();

// DisplayController module
const DisplayController = (() => {
    const board_elem = document.querySelector(".board");
    const game_screen = document.querySelector(".game-screen");
    const menu = document.querySelector(".menu");
    const end_screen = document.querySelector(".end-screen");
    const winner_msg = document.querySelector(".winner");

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

    const displayEndScreen = (winner) => {
        end_screen.style.display = "block";
        winner_msg.textContent = winner.getName() + " wins!";
    };

    const resetInputField = () => {
        const input_fields = document.querySelectorAll("input");
        for (let field of input_fields) {
            field.value = "";
        }
    }

    return {displayBoard, getCellNum, fillCell, displayGameScreen,
        displayMenuScreen, displayEndScreen, resetInputField};
}) ();

// Player factory
const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return {getName, getMark};
}

// GameFlow module
const GameFlow = (() => {
    let player1, player2, curr_player;

    const move = () => {
        const cells = document.querySelectorAll(".cell");
        Array.from(cells).forEach(cell =>
            cell.addEventListener('click', cellEventHandler));
    };

    const cellEventHandler = (e) => {
        let cell_num = DisplayController.getCellNum(e.target);
        let row = cell_num[0];
        let col = cell_num[1];
        if (GameBoard.isEmpty(row, col)) {
            GameBoard.setBoard(row, col, curr_player.getMark());
            DisplayController.fillCell(e.target, curr_player.getMark());
            DisplayController.displayBoard(GameBoard.getBoard());
            if (GameBoard.checkWin()){
                DisplayController.displayEndScreen(curr_player);
            }
            else {
                curr_player = switchPlayer(curr_player);
            }
        }
    };

    const setUpStartBtn = (() => {
        const start_btn = document.querySelector("#start");
        start_btn.addEventListener('click', () => {
            getPlayer();
            initGame();
            DisplayController.displayGameScreen();
            DisplayController.resetInputField();
        })
    }) ();

    const setUpNewRoundBtn = (() => {
        const new_round_btn = document.querySelector("#new-round");
        new_round_btn.addEventListener('click', () => {
            initGame();
            DisplayController.displayGameScreen();
        })
    }) ();

    const setUpNewGameBtn = (() => {
        const new_game_btn = document.querySelector("#new-game");
        new_game_btn.addEventListener('click', () => {
            getPlayer();
            initGame()
            DisplayController.displayMenuScreen();
            DisplayController.resetInputField();
        });
    }) ();

    const initGame = () => {
        curr_player = player1;
        GameBoard.initBoard();
    }

    const getPlayer = () => {
        const player1_name = document.querySelector("#player1-name");
        const player2_name = document.querySelector("#player2-name");
        player1 = Player(player1_name.value, 'X');
        player2 = Player(player2_name.value, 'O');
    }

    const switchPlayer = (curr_player) => {
        return curr_player === player1? player2 : player1;
    }

    move();

}) ();
