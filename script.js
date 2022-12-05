// GameBoard module
const GameBoard = (() => {
    let board = [['X', 'X', 'O'],
                ['', '', 'O'],
                ['', 'O', '']];

    const getBoard = () => board;

    const checkRowWin = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length - 1; j++) {
                if (board[i][j] !== board[i][j+1]) {
                    return false;
                }
            }
            return true;
        }
    };

    // const checkColWin = () => {

    // }

    return {getBoard, checkRowWin};

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

    return {displayBoard, generateBoard, getCellNum};
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
    let cell_clicked;

    const move = () => {
        const cells = document.querySelectorAll(".cell");
        Array.from(cells).forEach(cell =>
            cell.addEventListener('click', (e) => {clickEventHandler(e)}), {once: true});
    };

    const clickEventHandler = (e) => {
        console.log('click', e.target);;
        let cell_num = DisplayController.getCellNum(e.target);
        let row = cell_num[0];
        let col = cell_num[1];
        if (GameBoard.getBoard()[row][col] === '') {
            cell_clicked = true;
            GameBoard.getBoard()[row][col] = curr_player.getMark();
            e.target.textContent = curr_player.getMark();
            DisplayController.displayBoard(GameBoard.getBoard());
            curr_player = switchPlayer(curr_player);
        }
    };

    const switchPlayer = (curr_player) => {
        return curr_player === player1? player2 : player1;
    }

    DisplayController.generateBoard(GameBoard.getBoard());
    DisplayController.displayBoard(GameBoard.getBoard());
    move();

}) ();
