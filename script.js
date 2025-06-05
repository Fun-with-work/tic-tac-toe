// project tic tac toe

const ticTacToe = (function () {

    let gameBoard = {

        board :[
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ]
    }; 

    let players ={
        X : 'X',
        O : 'O',
    };

    let currentPlayer = players.X;
    
    let gameCheck = {

        gameOver : false,
    }

    let displayBoard = () => {
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
            if (gameBoard.board[i][0] === currentPlayer && gameBoard.board[i][1] === currentPlayer && gameBoard.board[i][2] === currentPlayer) {
                return true;
            }
        }

        for (let j = 0; j < 3; j++) {
            if (gameBoard.board[0][j] === currentPlayer && gameBoard.board[1][j] === currentPlayer && gameBoard.board[2][j] === currentPlayer) {
                return true;
            }
        }

        if (
            (gameBoard.board[0][0] === currentPlayer && gameBoard.board[1][1] === currentPlayer && gameBoard.board[2][2] === currentPlayer) ||
            (gameBoard.board[0][2] === currentPlayer && gameBoard.board[1][1] === currentPlayer && gameBoard.board[2][0] === currentPlayer)
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
        currentPlayer = (currentPlayer === players.X) ? players.O : players.X;
    }

    let resetGame = () => {
        gameBoard.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
        currentPlayer = players.X;
        gameCheck.gameOver = false;
        console.log("Game has reset. To play again, enter ticTacToe.beginGame() and have fun!");
    }

    let makeMove = (row, col) => {
        if (gameCheck.gameOver) {
            console.log("Game over. Call ticTacToe.beginGame() to start again.");
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

        gameBoard.board[row][col] = currentPlayer;
        displayBoard();

        if (checkWin()) {
            console.log(`🎉 Player ${currentPlayer} wins! Congratulations! 🎉 `);
            gameCheck.gameOver = true;
        } else if (checkDraw()) {
            console.log("It's a draw! 🤝");
            gameCheck.gameOver = true;
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