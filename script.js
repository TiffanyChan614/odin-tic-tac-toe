// GameBoard module
const GameBoard = (() => {
    let board = [['x', 'x', 'o'],
                ['', '', 'o'],
                ['', 'o', '']];
    const getBoard = () => board;

    // const move = (player) => {
    //     const
    //     board[row][col] = player.getMark();
    // }
    return {getBoard};
}) ();

// DisplayController module
const DisplayController = (() => {
    const displayBoard = (board) => {
        const board_elem = document.querySelector(".board");
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const cell_elem = document.createElement("div");
                cell_elem.className = "cell";
                cell_elem.id = `cell-${i}${j}`;
                board_elem.appendChild(cell_elem);
                const cell = document.querySelector(`#cell-${i}${j}`);
                cell.textContent = board[i][j];
            }
        }
    }
    return {displayBoard};
}) ();

// Player factory
const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return {getName, getMark};
}

// GameFlow module
const GameFlow = (() => {
    DisplayController.displayBoard(GameBoard.getBoard());
    let player1 = Player("Tiff", 'X');
    let player2 = Player("Anson", 'O');
    let currPlayer = player1;
}) ();
