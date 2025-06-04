// project tic tac toe

const ticTacToe = (function () {

    let gameBoard = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];


    const PLAYER_X = 'X';
    const PLAYER_O = 'O';

    let currentPlayer = PLAYER_X;
    let gameOver = false;

    let displayBoard = () => {
        console.clear();
        console.log(`
            ${gameBoard[0][0]}   | ${gameBoard[0][1]} | ${gameBoard[0][2]}     (0) (1) (2)
            ---+---+---
            ${gameBoard[1][0]}   | ${gameBoard[1][1]} | ${gameBoard[1][2]}     (0) (1) (2)
            ---+---+---
            ${gameBoard[2][0]}   | ${gameBoard[2][1]} | ${gameBoard[2][2]}
            Rows & Columns (0-2)
            `);
    }

    let checkWin = () => {
        for (let i = 0; i < 3; i++) {
            if (gameBoard[i][0] === currentPlayer && gameBoard[i][1] === currentPlayer && gameBoard[i][2] === currentPlayer) {
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

    let checkDraw = () => {
        for (let i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (gameBoard[i][j] === "") {
                    return false
                }
            }
        }
        return true;
    }

    let switchPlayer = () => {
        currentPlayer = (currentPlayer === PLAYER_X) ? PLAYER_O : PLAYER_X;
    }

    let resetGame = () => {
        gameBoard = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
        currentPlayer = PLAYER_X;
        gameOver = false;
        console.log("Game has reset. To play again, enter ticTacToe.beginGame() and have fun!");
    }

    let makeMove = (row, col) => {
        if (gameOver) {
            console.log("Game over. Call ticTacToe.beginGame() to start again.");
            return;
        }

        if (isNaN(row) || isNaN(col) || row < 0 || row > 2 || col < 0 || col > 2) {
            console.error("Invalid input. Please enter a row or column number between 0 and 2.");
            return;
        }

        if (gameBoard[row][col] !== ' ') {
            console.log(`Spot (${row}, ${col} ) is already taken. Please choose an empty spot.`);
            return;
        }

        gameBoard[row][col] = currentPlayer;
        displayBoard();

        if (checkWin()) {
            console.log(`🎉 Player ${currentPlayer} wins! Congratulations! 🎉 `);
            gameOver = true;
        } else if (checkDraw()) {
            console.log("It's a draw! 🤝");
            gameOver = true;
        } else { 
            switchPlayer();
        console.log(`It's Player ${currentPlayer}'s turn. Use ticTacToe.makeMove(row, col)`);
        }
    }

        function startGame() {
            resetGame();
            displayBoard();
            console.log(`Game started! Player ${currentPlayer}'s turn. Use ticTacToe.makeMove(row, col)`);
            console.log("Example: ticTacToe.makeMove(0, 0)");
        }


        return {
            startGame: startGame,
            makeMove: makeMove,

    };

})();