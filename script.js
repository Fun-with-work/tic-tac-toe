let boardElement = document.getElementsByClassName("display-board");
let message = document.getElementById("message");
let tally = document.getElementsByClassName("tally");
// let tally1 = document.getElementById("tally1");
// let tally2 = document.getElementById("tally2");
// let tally3 = document.getElementById("tally3");
// let tally4 = document.getElementById("tally4");
// let tally5 = document.getElementById("tally5");
let tile = document.getElementsByClassName("tile");
const tileRow1 = document.getElementsByClassName("row1");
const tileRow2 = document.getElementsByClassName("row2");
const tileRow3 = document.getElementsByClassName("row3");
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let startButton = document.getElementById("start");
let winPlayer1 = document.getElementById("win1");
let winPlayer2 = document.getElementById("win2");
// let lossesPlayer2 = document.getElementById("loss2");
let totalScore1 = document.getElementById("total1");
let totalScore2 = document.getElementById("total2");
let nextGame = document.getElementById("next-game");

let players = {
    X: '❌',
    O: '🟣',
    w1: 0,
    w2: 0,
    playerXName : "Player 1",
    playerOName : "Player 2",
    EMPTY: ' ',
};

winPlayer1.textContent = players.w1;
winPlayer2.textContent = players.w2;

function player1_name() {
    let person1 = prompt("Enter name for player 1", "Player 1");
    if (person1 == null || person1 === "") {
        alert("cancelled");
    } else {
        player1.value = person1 + " " + "❌";
        players.playerXName = person1;
    }
}

function player2_name() {
    let person2 = prompt("Enter name for player 2", "Player 2");
    if (person2 == null || person2 === "") {
        alert("cancelled");
    } else {
        player2.value = person2 + " " + "🟣";
        players.playerOName = person2;
    }
}


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

    displayBoard = () => {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                gameBoard.htmlTiles[r][c].textContent = logicalBoard[r][c];
            }
        }
    };

    const checkWin = () => {
        for (let i = 0; i < 3; i++) {
            if (logicalBoard[i][0] === gameBoard.currentPlayer && logicalBoard[i][1] === gameBoard.currentPlayer && logicalBoard[i][2] === gameBoard.currentPlayer &&
                gameBoard.currentPlayer != players.EMPTY
            ) {
                const winnerName = (gameBoard.currentPlayer === players.X)? players.playerXName :players.playerOName;
                message.textContent = `Player ${winnerName} ${gameBoard.currentPlayer} is the winner. Press next game to play again.`;
                if (gameBoard.currentPlayer === players.X) {
                    players.w1 += 1;
                } else {
                    players.w2 += 1
                };
                winPlayer1.textContent = players.w1;
                winPlayer2.textContent = players.w2;

                console.log("Player X wins:", players.w1);
                console.log("Player O wins:", players.w2);

                if (players.w1 >= 3) {
                    message.textContent = `GAME ENDED. Player ${players.playerXName} has won this set. Press start to play a new set of games.`
                    gameBoard.gameOver = true;
                } else if (players.w2 >= 3) {
                    message.textContent = `GAME ENDED. Player ${players.playerOName} has won this set. Press start to play a new set of games.`
                    gameBoard.gameOver = true;
                }
                return true;
            }}

            for (let j = 0; j < 3; j++) {
                if (logicalBoard[0][j] === gameBoard.currentPlayer && logicalBoard[1][j] === gameBoard.currentPlayer && logicalBoard[2][j] === gameBoard.currentPlayer &&
                    gameBoard.currentPlayer != players.EMPTY
                ) {
                    const winnerName = (gameBoard.currentPlayer === players.X)? players.playerXName: players.playerOName;
                    message.textContent = `Player ${winnerName} ${gameBoard.currentPlayer} is the winner. Press next game to play again.`;
                    if (gameBoard.currentPlayer === players.X) {
                        players.w1 += 1;
                    } else {
                        players.w2 += 1
                    };
                    winPlayer1.textContent = players.w1;
                    winPlayer2.textContent = players.w2;
                    console.log("Player X wins:", players.w1);
                    console.log("Player O wins:", players.w2);

                    if (players.w1 >= 3) {
                        message.textContent = `GAME ENDED. Player ${players.playerXName} has won this set. Press start to play a new set of games.`;
                        gameBoard.gameOver = true;
                    } else if (players.w2 >= 3) {
                        message.textContent = `GAME ENDED. ${players.playerOName} is the winner. Press next game to play again.`;
                        gameBoard.gameOver = true;
                    }
                    return true;
                }}

            if ( (logicalBoard[0][0] === gameBoard.currentPlayer && logicalBoard[1][1] === gameBoard.currentPlayer && logicalBoard[2][2] === gameBoard.currentPlayer && gameBoard.currentPlayer != players.EMPTY) ||
                (logicalBoard[0][2] === gameBoard.currentPlayer && logicalBoard[1][1] === gameBoard.currentPlayer && logicalBoard[2][0] === gameBoard.currentPlayer && gameBoard.currentPlayer != players.EMPTY)
            ) {
                const winnerName = (gameBoard.currentPlayer === players.X)? players.playerXName: players.playerOName;
                message.textContent = `Player ${winnerName} ${gameBoard.currentPlayer} is the winner. Press next game to play again.`;
                if (gameBoard.currentPlayer === players.X) {
                    players.w1 += 1;
                } else {
                    players.w2 += 1
                };

                winPlayer1.textContent = players.w1;
                winPlayer2.textContent = players.w2;
                console.log(players.w1);
                console.log(players.w2);

                if (players.w1 >= 3) {
                    message.textContent = `GAME ENDED. Player ${players.playerXName} has won this set. Press start to play a new set of games.`;
                    gameBoard.gameOver = true;
                } else if (players.w2 >= 3) {
                    message.textContent = `GAME ENDED. Player ${players.playerOName} has won this set. Press start to play again.`;
                    gameBoard.gameOver = true;
                }
                return true;
            }
            return false;
        };

        const checkDraw = () => {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {

                    if (logicalBoard[i][j] === players.EMPTY) {
                        return false;
                    }
                }
            }
            message.textContent= ("The game is a tie. Press next game to play again.");
            return true;
        };

        let switchPlayer = () => {
            gameBoard.currentPlayer = (gameBoard.currentPlayer === players.X) ? players.O : players.X;
        };

        function resetGame() {
            tally.textContent = "gameBoard.currentPlayer";
            logicalBoard = [
                [players.EMPTY, players.EMPTY, players.EMPTY,],
                [players.EMPTY, players.EMPTY, players.EMPTY,],
                [players.EMPTY, players.EMPTY, players.EMPTY,],
            ];
            gameBoard.currentPlayer = players.X;
            gameBoard.gameOver = false;
            message.textContent = ("Playing the next game. To play a new set, press start");
            displayBoard();
            console.log("Game board cleared and reset! Players X's turn.");
        }

        function tileListeners() {
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    (function (row, col) {
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

            if (logicalBoard[row][col] !== players.EMPTY) {
                console.log(`Spot (${row}, ${col} ) is already taken. Please choose an empty spot.`);
                return;
            }

            logicalBoard[row][col] = gameBoard.currentPlayer;
            displayBoard();

            if (checkWin()) {
                console.log(`🎉 Player ${gameBoard.currentPlayer} wins! Congratulations! 🎉 `);
                gameBoard.gameOver = true;
            } else if (checkDraw()) {
                console.log("It's a draw! 🤝");
                gameBoard.gameOver = true;
            } else {
                switchPlayer();
                console.log(`It's Player ${gameBoard.currentPlayer}'s turn`);
            }
        };

        function startGame() {
            resetGame();
            tileListeners();
            console.log(`Game started! Player ${gameBoard.currentPlayer}'s turn.`);
        }

        function clearScore() {
            winPlayer1.textContent = 0;
            winPlayer2.textContent = 0;
        }

        startButton.addEventListener("click", startGame);
        startButton.addEventListener("click", player1_name);
        startButton.addEventListener("click", player2_name);
        startButton.addEventListener("click", clearScore);

        nextGame.addEventListener("click", newGame);

        function newGame() {
            if (players.w1 > 2) {
                message.textContent = (`GAME ENDED. Player ${gameBoard.currentPlayer} has won this set. Press start to play a new set of games.`)
            } else if (players.w2 > 2) {
                message.textContent = ("GAME ENDED. Player " + gameBoard.currentPlayer + " has won this set. Press start to play a new set of games.")
            } else
                startGame();
            return {
                startGame: startGame,
            };

        }
    })();