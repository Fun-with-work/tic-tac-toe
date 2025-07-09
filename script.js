let boardElement = document.getElementsByClassName("display-board");
let tile = document.getElementsByClassName("tile");
const tileRow1 = document.getElementsByClassName("row1");
const tileRow2 = document.getElementsByClassName("row2");
const tileRow3 = document.getElementsByClassName("row3");
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let startButton = document.getElementById("start");

// let score_board = document.getElementsByClassName("scoreboard");

player1.addEventListener("click", player1_name);
player2.addEventListener("click", player2_name);

function player1_name() {
    let person1 = prompt("Enter name for player 1", "Player 1");
    if (person1 == null || person1 === "") {
        alert("cancelled");
    } else {
        player1.value = person1;
    }
}

function player2_name() {
    let person2 = prompt("Enter name for player 2", "Player 2");
    if (person2 == null || person2 === "") {
        alert("cancelled");
    } else {
        player2.value = person2;
    }
}

// let wins1 = document.createElement("ul");

let players = {
    X: '❌',
    O: '🟣',
    EMPTY: ' ',
};

const game = (function () {
    let logicalBoard = [
        [players.EMPTY, players.EMPTY, players.EMPTY,],
        [players.EMPTY, players.EMPTY, players.EMPTY,],
        [players.EMPTY, players.EMPTY, players.EMPTY,],
    ];

    let gameBoard = {
        htmlTiles: [
            Array.from(tileRow1),
            Array.from(tileRow2),
            Array.from(tileRow3),
        ],

        currentPlayer: players.X,
        gameOver: false,
    };
    // console.log(gameBoard.htmlTiles);


    displayBoard = () => {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                gameBoard.htmlTiles[r][c].textContent = logicalBoard[r][c];
            }
        }

        // console.log(`
        //     ${gameBoard.htmlTiles[0][0]}  | ${logicalBoard[0][1]} | ${logicalBoard[0][2]}     (0) (1) (2)
        //     ---+---+---
        //     ${logicalBoard[1][0]}  | ${logicalBoard[1][1]} | ${logicalBoard[1][2]}     (0) (1) (2)
        //     ---+---+---
        //     $logicalBoard[2][0]}  | ${logicalBoard[2][1]} | ${logicalBoard[2][2]}
        //     `);
    };

    const checkWin = () => {
        for (let i = 0; i < 3; i++) {
            if (logicalBoard[i][0] === gameBoard.currentPlayer && logicalBoard[i][1] === gameBoard.currentPlayer && logicalBoard[i][2] === gameBoard.currentPlayer &&
            gameBoard.currentPlayer != players.EMPTY
            ) {
                return true;
            }
        }

        for (let j = 0; j < 3; j++) {
            if (logicalBoard[0][j] === gameBoard.currentPlayer && logicalBoard[1][j] === gameBoard.currentPlayer && logicalBoard[2][j] === gameBoard.currentPlayer &&
            gameBoard.currentPlayer != players.EMPTY 
            ) {
                return true;
            }
        }

        if (
            (logicalBoard[0][0] === gameBoard.currentPlayer && logicalBoard[1][1] === gameBoard.currentPlayer && logicalBoard[2][2] === gameBoard.currentPlayer) ||
            (logicalBoard[0[2] === gameBoard.currentPlayer && logicalBoard[1][1] === gameBoard.currentPlayer && logicalBoard[2][0] === gameBoard.currentPlayer)
        ) {
            return true;
        }

        return false;
    };

    const checkDraw = () => {
        for (let i = 0; i < 3; i++) {
            for (j = 0; j < 3; J++) {

                if (logicalBoard[i][j] === players.EMPTY) {
                    return false;
                }
            }
        }
        return true;
    };

    let switchPlayer = () => {
        gameBoard.currentPlayer = (gameBoard.currentPlayer === players.X) ? players.O : players.X;
    };


    startButton.addEventListener("click", resetGame);

    function resetGame() {
        logicalBoard = [
            [players.EMPTY, players.EMPTY, players.EMPTY,],
            [players.EMPTY, players.EMPTY, players.EMPTY,],
            [players.EMPTY, players.EMPTY, players.EMPTY,],
        ] ;

        gameBoard.currentPlayer = players.X;
        gameBoard.gameOver = false;
        displayBoard();
        console.log("Game board cleared and reset! Players X's turn.");
    }

    function tileListeners() {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                (function(row, col) {
                    gameBoard.htmlTiles[row][col].addEventListener('click', () => makeYourMove(row, col));
                })(r, c);
            }
        }
    }

    const makeYourMove = (row, col) => {
        if (gameBoard.gameOver) {
            console.log("Game over. Call game.beginGame() to start again.");
            return;
        }

        if (isNaN(row) || isNaN(col) || row < 0 || row > 2 || col < 0 || col > 2) {
            console.error("Invalid input. Please enter a row or column number between 0 and 2.");
            return;
        }

        if (gameBoard.htmlTiles[row][col] !== ' ') {
            console.log(`Spot (${row}, ${col} ) is already taken. Please choose an empty spot.`);
            return;
        }

        gameBoard.htmlTiles[row][col] = gameBoard.currentPlayer;
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