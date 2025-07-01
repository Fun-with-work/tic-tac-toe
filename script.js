let board = document.getElementsByClassName("display-board");
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");


// let score_board = document.getElementsByClassName("scoreboard");

player1.addEventListener("click", player1_name);
player2.addEventListener("click", player2_name);

function player1_name() {
    let person1 = prompt("Enter name for player 1", "Player 1");
    if (person1 == null || person1 ==" ") {
        alert("cancelled");
    } else { 
        player1.value = person1;
    }

}

function player2_name() {
let person2 = prompt("Enter name for player 2", "Player 2");
    if (person2 == null || person2 ==" ") {
        alert("cancelled");
    } else { 
        player2.value = person2;
    }}

let wins1 = document.createElement("ul");




let players ={
    X : '❌',
    O : '🟣',
};

let gameBoard = {
    board :[
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ],
    currentPlayer : players.X,
    gameOver : false,
}; 

// player_1.textContent= 'Aneela';

board.textContent = '🟣';

const game = (function () {

    displayBoard = () => {
        console.clear();
        console.log(`
            ${gameBoard.board[0][0]}  | ${gameBoard.board[0][1]} | ${gameBoard.board[0][2]}     (0) (1) (2)
            ---+---+---
            ${gameBoard.board[1][0]}  | ${gameBoard.board[1][1]} | ${gameBoard.board[1][2]}     (0) (1) (2)
            ---+---+---
            ${gameBoard.board[2][0]}  | ${gameBoard.board[2][1]} | ${gameBoard.board[2][2]}
            Rows & Columns (0-2)
            `);
    }

    let checkWin = () => {
        for (let i = 0; i < 3; i++) {
            if (gameBoard.board[i][0] === gameBoard.currentPlayer && gameBoard.board[i][1] === gameBoard.currentPlayer && gameBoard.board[i][2] === gameBoard.currentPlayer) {
                return true;
            }
        }

        for (let j = 0; j < 3; j++) {
            if (gameBoard.board[0][j] === gameBoard.currentPlayer && gameBoard.board[1][j] === gameBoard.currentPlayer && gameBoard.board[2][j] === gameBoard.currentPlayer) {
                return true;
            }
        }

        if (
            (gameBoard.board[0][0] === gameBoard.currentPlayer && gameBoard.board[1][1] === gameBoard.currentPlayer && gameBoard.board[2][2] === gameBoard.currentPlayer) ||
            (gameBoard.board[0][2] === gameBoard.currentPlayer && gameBoard.board[1][1] === gameBoard.currentPlayer && gameBoard.board[2][0] === gameBoard.currentPlayer)
        ) {
            return true;
        }

        return false;
    }

    let checkDraw = () => {
        for (let i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (gameBoard.board[i][j] === " ") {
                    return false
                }
            }
        }
        return true;
    }

    let switchPlayer = () => {
        gameBoard.currentPlayer = (gameBoard.currentPlayer === players.X) ? players.O : players.X;
    }

    let resetGame = () => {
        gameBoard.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
        gameBoard.currentPlayer = players.X;
        gameBoard.gameOver = false;
        console.log("Game has reset. To play again, enter game.beginGame() and have fun!");
    }

    let makeYourMove = (row, col) => {
        if (gameBoard.gameOver) {
            console.log("Game over. Call game.beginGame() to start again.");
            return;
        }

        if (isNaN(row) || isNaN(col) || row < 0 || row > 2 || col < 0 || col > 2) {
            console.error("Invalid input. Please enter a row or column number between 0 and 2.");
            return;
        }

        if (gameBoard.board[row][col] !== ' ') {
            console.log(`Spot (${row}, ${col} ) is already taken. Please choose an empty spot.`);
            return;
        }

        gameBoard.board[row][col] = gameBoard.currentPlayer;
        displayBoard();

        if (checkWin()) {
            console.log(`🎉 Player ${gameBoard.currentPlayer} wins! Congratulations! 🎉 `);
            gameBoard.gameOver = true;
        } else if (checkDraw()) {
            console.log("It's a draw! 🤝");
            gameBoard.gameOver = true;
        } else { 
            switchPlayer();
        console.log(`It's Player ${gameBoard.currentPlayer}'s turn. Use game.makeYourMove(row, col)`);
        }
    }

        function startGame() {
            resetGame();
            displayBoard();
            console.log(`Game started! Player ${gameBoard.currentPlayer}'s turn. Use game.makeYourMove(row, col)`);
            console.log("Example: game.makeYourMove(0, 0)");
        }


        return {
            startGame: startGame,
            makeYourMove: makeYourMove,

    };

})();