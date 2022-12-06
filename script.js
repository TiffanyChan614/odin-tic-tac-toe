// GameBoard module
const GameBoard = (() => {
    let board = [['', '', ''],
                ['', '', ''],
                ['', '', '']];

    const getBoard = () => board;

    const setBoard = (row, col, mark) => board[row][col] = mark;

    const isEmpty = (row, col) => board[row][col] === '';

    const checkRowWin = () => {
        let isWin;
        for (let i = 0; i < board.length; i++) {
            isWin = true;
            for (let j = 0; j < board[i].length - 1; j++) {
                if (board[i][j] !== board[i][j+1] || isEmpty(i, j)) {
                    isWin = false;
                }
            }
            if (isWin) {
                return isWin;
            }
        }
        return false;
    };

    const checkColWin = () => {
        let isWin;
        for (let i = 0; i < board[0].length; i++) {
            isWin = true;
            for (let j = 0; j < board.length - 1; j++) {
                if (board[j][i] !== board[j+1][i] || isEmpty(j, i)) {
                    isWin = false;
                }
            }
            if (isWin) {
                return isWin;
            }
        }
        return false;
    }

    const checkDiagWin = () => {
        let isWin = true;
        for (let i = 0; i < board.length - 1; i++) {
            if (board[i][i] !== board[i+1][i+1] || isEmpty(i, i)) {
                isWin = false;
            }
        }
        if (isWin) {
            return isWin;
        }

        isWin = true;
        for(let i = 0; i < board.length - 1; i++) {
            if (board[board.length-1-i][i] !== board[board.length-2-i][i+1] || isEmpty(board.length-1-i, i)) {
                isWin = false;
            }
        }
        if (isWin) {
            return isWin;
        }
        return false;
    }

    const checkWin = () => {
        return checkRowWin() || checkColWin() || checkDiagWin();
    }

    return {getBoard, setBoard, checkWin, isEmpty};

}) ();

// DisplayController module
const DisplayController = (() => {
    const board_elem = document.querySelector(".board");

    const displayBoard = (board) => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const cell = document.querySelector(`#cell-${i}${j}`);
                cell.textContent = board[i][j];
            }
        }
    }

    const generateBoard = (board) => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const cell_elem = document.createElement("div");
                cell_elem.className = "cell";
                cell_elem.id = `cell-${i}${j}`;
                board_elem.appendChild(cell_elem);
            }
        }
    }

    const getCellNum = (cell_elem) => {
        let id = cell_elem.id;
        return id.replace(/[^0-9]/g, '');
    };

    const fillCell = (cell_elem, mark) => {
        cell_elem.textContent = mark;
    }

    return {displayBoard, generateBoard, getCellNum, fillCell};
}) ();

// Player factory
const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return {getName, getMark};
}

// GameFlow module
const GameFlow = (() => {
    let player1 = Player("Tiff", 'X');
    let player2 = Player("Anson", 'O');
    let curr_player = player1;

    const move = () => {
        const cells = document.querySelectorAll(".cell");
        Array.from(cells).forEach(cell =>
            cell.addEventListener('click', clickEventHandler));
    };

    const clickEventHandler = (e) => {
        let cell_num = DisplayController.getCellNum(e.target);
        let row = cell_num[0];
        let col = cell_num[1];
        if (GameBoard.isEmpty(row, col)) {
            GameBoard.setBoard(row, col, curr_player.getMark());
            DisplayController.fillCell(e.target, curr_player.getMark());
            DisplayController.displayBoard(GameBoard.getBoard());
            if (GameBoard.checkWin()){
                console.log(curr_player.getName() + " wins");
            }
            else {
                curr_player = switchPlayer(curr_player);
            }
        }
    };

    const switchPlayer = (curr_player) => {
        return curr_player === player1? player2 : player1;
    }

    DisplayController.generateBoard(GameBoard.getBoard());
    DisplayController.displayBoard(GameBoard.getBoard());
    move();

}) ();
