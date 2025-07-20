let boardElement = document.getElementsByClassName("display-board");
let message = document.getElementById("message");
let gameTallyDisplays = [
    document.getElementById("tally1"),
    document.getElementById("tally2"),
    document.getElementById("tally3"),
    document.getElementById("tally4"),
    document.getElementById("tally5")
];
let tile = document.getElementsByClassName("tile");
const tileRow1 = document.getElementsByClassName("row1");
const tileRow2 = document.getElementsByClassName("row2");
const tileRow3 = document.getElementsByClassName("row3");
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let startButton = document.getElementById("start");
let winPlayer1 = document.getElementById("win1");
let winPlayer2 = document.getElementById("win2");
let totalScore1 = document.getElementById("total1");
let totalScore2 = document.getElementById("total2");
let nextGame = document.getElementById("next-game");

let originalGameTally = ["game 1", "game 2", "game 3", "game 4", "game 5"];

let players = {
    X: '❌',
    O: '🟣',
    w1: 0,
    w2: 0,
    playerXName: "Player 1",
    playerOName: "Player 2",
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

    let gameResults = [];
    let currentGameNumber = 0;

    let gameBoard = {
        htmlTiles: [
            Array.from(tileRow1),
            Array.from(tileRow2),
            Array.from(tileRow3),
        ],

        currentPlayer: players.X,
        gameOver: false,
        setOver: false,
    };

    const displayBoard = () => {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                gameBoard.htmlTiles[r][c].textContent = logicalBoard[r][c];
            }
        }
    };

    const updateTallyDisplay = () => {
        for (i = 0; i < gameTallyDisplays.length; i++) {
            if (gameTallyDisplays[i]) {
                if (gameResults[i]) {
                    gameTallyDisplays[i].textContent = gameResults[i];
                } else {
                    gameTallyDisplays[i].textContent = originalGameTally[i];
                }
            }
        }

        winPlayer1.textContent = players.w1;
        winPlayer2.textContent = players.w2;
    };

    const checkWin = () => {
        const winningPlayer = gameBoard.currentPlayer;

        const isWin = (
            (logicalBoard[0][0] === winningPlayer && logicalBoard[0][1] === winningPlayer && logicalBoard[0][2] === winningPlayer) ||
            (logicalBoard[1][0] === winningPlayer && logicalBoard[1][1] === winningPlayer && logicalBoard[1][2] === winningPlayer) ||
            (logicalBoard[2][0] === winningPlayer && logicalBoard[2][1] === winningPlayer && logicalBoard[2][2] === winningPlayer) ||
            (logicalBoard[0][0] === winningPlayer && logicalBoard[1][0] === winningPlayer && logicalBoard[2][0] === winningPlayer) ||
            (logicalBoard[0][1] === winningPlayer && logicalBoard[1][1] === winningPlayer && logicalBoard[2][1] === winningPlayer) ||
            (logicalBoard[0][2] === winningPlayer && logicalBoard[1][2] === winningPlayer && logicalBoard[2][2] === winningPlayer) ||
            (logicalBoard[0][0] === winningPlayer && logicalBoard[1][1] === winningPlayer && logicalBoard[2][2] === winningPlayer) ||
            (logicalBoard[0][2] === winningPlayer && logicalBoard[1][1] === winningPlayer && logicalBoard[2][0] === winningPlayer)
        ) && winningPlayer != players.EMPTY;

        if (isWin) {
            const winnerName = (winningPlayer === players.X) ? players.playerXName : players.playerOName;
            
            const winnerColor = (winningPlayer === players.X) ? '#f7485e' : 'purple';
            message.innerHTML = `<span style= "color: ${winnerColor};"> ${winnerName}  ${winningPlayer} is the winner!</span> Press 'Next Game' to continue.`;

            gameResults[currentGameNumber] = winningPlayer;
            if (winningPlayer === players.X) {
                players.w1 += 1;
            } else {
                players.w2 += 1;
            }

            updateTallyDisplay();
            gameBoard.gameOver = true;

            if (currentGameNumber < gameTallyDisplays.length - 1) {
                currentGameNumber++;
            }
            winPlayer1.textContent = players.w1;
            winPlayer2.textContent = players.w2;

            if (gameResults.length >= gameTallyDisplays.length || players.w1 >= 3 || players.w2 >= 3) {
                gameBoard.gameOver = true;
            }
            if (players.w1 >= 3) {
                message.innerHTML = `GAME ENDED. <span style= "color: ${winnerColor};"> ${players.playerXName} ${players.X} has won this set.</span> Press start to play a new set of games.`;
                gameBoard.setOver = true;
            } else if (players.w2 >= 3) {
                message.innerHTML = `GAME ENDED. <span style= "color: ${winnerColor};"> ${players.playerOName} ${players.O} has won this set.</span> Press start to play a new set of games.`;
                gameBoard.setOver = true;
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
        message.textContent = ("The game is a tie. Press next game to play again.");
        gameBoard.gameOver = true;
    };

    let switchPlayer = () => {
        gameBoard.currentPlayer = (gameBoard.currentPlayer === players.X) ? players.O : players.X;
    };

    function resetGame() {
        logicalBoard = [
            [players.EMPTY, players.EMPTY, players.EMPTY,],
            [players.EMPTY, players.EMPTY, players.EMPTY,],
            [players.EMPTY, players.EMPTY, players.EMPTY,],
        ];
        gameBoard.currentPlayer = players.X;
        gameBoard.gameOver = false;
        message.textContent = ("Playing the next game. To play a new set, press start");
        displayBoard();
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
            message.textContent = "Game over. Press the start button to play again.";
            return;
        }

        if (logicalBoard[row][col] !== players.EMPTY) {
            message.textContent = (`This spot is already taken. Please choose an empty spot.`);
            return;
        }

        logicalBoard[row][col] = gameBoard.currentPlayer;
        displayBoard();

        if (checkWin()) {
            gameBoard.gameOver = true;
        } else if (checkDraw()) {
            gameBoard.gameOver = true;
        } else {
            switchPlayer();
            message.textContent = `It's  ${gameBoard.currentPlayer}'s turn`;
        }
    };

    function startGame() {
        winPlayer1.textContent = 0;
        winPlayer2.textContent = 0;
        players.w1 = 0;
        players.w2 = 0;
        gameResults = [];
        currentGameNumber = 0;
        gameBoard.gameOver = false;
        gameBoard.setOver = false;
        updateTallyDisplay();
        resetGame();
        tileListeners();
        message.textContent = `Game started! It's ${gameBoard.currentPlayer}'s turn.`;
    }

    startButton.addEventListener("click", startGame);
    startButton.addEventListener("click", player1_name);
    startButton.addEventListener("click", player2_name);

    nextGame.addEventListener("click", newGame);

    function newGame() {
        if (gameBoard.setOver) {
            message.textContent = "The set is over! Press 'Start' to play a new set of games.";
            return;
        }

        else if (!gameBoard.gameOver) {
            message.textContent = "Current game is not finished yet! Finish the current game before proceeding.";
            return;
        }

        else if (gameBoard.gameOver) {
            resetGame();
        }
    }
})();