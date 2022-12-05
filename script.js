// GameBoard module
const GameBoard = (() => {
    let board = [['x', 'x', 'o'],
                ['', '', 'o'],
                ['', 'o', '']];
    const getBoard = () => board;

    const move = (player) => {
        const cells = document.querySelectorAll(".cell");
        Array.from(cells).forEach(cell => {
            cell.addEventListener('click', (e) => {
                console.log('click', e.target);
                let cell_num = getCellNum(e.target);
                let row = cell_num[0];
                let col = cell_num[1];
                if (board[row][col] === '') {
                    board[row][col] = player.getMark();
                    e.target.textContent = player.getMark();
                    DisplayController.displayBoard(GameBoard.getBoard());
                }
            });
        })
    }

    const getCellNum = (cell_elem) => {
        let id = cell_elem.id;
        return id.replace(/[^0-9]/g, '');
    }

    return {getBoard, move};
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

    return {displayBoard, generateBoard};
}) ();

// Player factory
const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return {getName, getMark};
}

// GameFlow module
const GameFlow = (() => {
    DisplayController.generateBoard(GameBoard.getBoard());
    DisplayController.displayBoard(GameBoard.getBoard());
    let player1 = Player("Tiff", 'X');
    let player2 = Player("Anson", 'O');
    let currPlayer = player1;
    GameBoard.move(currPlayer);
}) ();
