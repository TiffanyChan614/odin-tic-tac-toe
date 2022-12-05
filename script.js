// GameBoard module
const GameBoard = (() => {
    let board = [['x', 'x', 'o'],
                ['', '', 'o'],
                ['', 'o', '']];
    const getBoard = () => {
        return board;
    }

    return {getBoard};
}) ();

// DisplayController module
const DisplayController = (() => {
    const displayBoard = (board) => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const cell = document.querySelector(`#cell-${i}${j}`);
                cell.textContent = board[i][j];
            }
        }
    }
    return {displayBoard};
}) ();

DisplayController.displayBoard(GameBoard.getBoard());
