// project tic tac toe

let gameBoard = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

const playerX = 'X';
const playerO = 'O';

let currentPlayer = playerX;

let displayBoard = () => {
    console.clear();
    console.log(`
        ${gameBoard[0][0]} | ${gameBoard[0][1]} | ${gameBoard[0][2]}
        ---+---+---
        ${gameBoard[1][0]} | ${gameBoard[1][1]} | ${gameBoard[1][2]}
        ---+---+---
        ${gameBoard[2][0]} | ${gameBoard[2][1]} | ${gameBoard[2][2]}
        `);
}

let checkWin = () => {
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i][0] ===currentPlayer && gameBoard[i][1] === currentPlayer && gameBoard[i][2] === currentPlayer) {
            return true;
        }
    }

    for (let j = 0; j < 3; j++) {
        if (gameBoard[j][0] === currentPlayer && gameBoard[j][1] === currentPlayer && gameBoard[j][2] === currentPlayer) {
            return true;
        }
    }

    if (
        (gameBoard[0][0] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][2] === currentPlayer) ||
        (gameBoard[0][2] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][0] === currentPlayer)
    ) {
        return true;
    }

    return false;
}



