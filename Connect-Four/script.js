
const rows = 6;
const cols = 7;

let board = [];
let currentPlayer = 1;

let gameOver = false;

let score1 = 0;
let score2 = 0;

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");

const score1Element = document.getElementById("score1");
const score2Element = document.getElementById("score2");

const resetButton = document.getElementById("resetBtn");


// Create a new board
function createBoard() {

    board = [];

    for (let row = 0; row < rows; row++) {

        board[row] = [];

        for (let col = 0; col < cols; col++) {

            board[row][col] = 0;
        }
    }

    currentPlayer = 1;
    gameOver = false;

    statusElement.textContent = "Player 1's Turn 🔴";

    displayBoard();
}


// Display board on screen
function displayBoard() {

    boardElement.innerHTML = "";

    for (let row = 0; row < rows; row++) {

        for (let col = 0; col < cols; col++) {

            const cell = document.createElement("div");

            cell.classList.add("cell");

            if (board[row][col] === 1) {
                cell.classList.add("red");
            }

            if (board[row][col] === 2) {
                cell.classList.add("yellow");
            }

            cell.addEventListener("click", function () {

                makeMove(col);

            });

            boardElement.appendChild(cell);
        }
    }
}


// Make a move
function makeMove(col) {

    if (gameOver) {
        return;
    }

    // Find lowest empty row
    let row = -1;

    for (let r = rows - 1; r >= 0; r--) {

        if (board[r][col] === 0) {

            row = r;
            break;
        }
    }

    // Column is full
    if (row === -1) {

        statusElement.textContent = "Column is full! Choose another.";

        return;
    }

    // Put player's piece
    board[row][col] = currentPlayer;

    displayBoard();


    // Check winner
    const winningCells = checkWinner(row, col);

    if (winningCells.length >= 4) {

        gameOver = true;

        if (currentPlayer === 1) {

            score1++;

            score1Element.textContent = score1;

        } else {

            score2++;

            score2Element.textContent = score2;
        }

        statusElement.textContent =
            `Player ${currentPlayer} Wins! 🏆`;

        highlightWinner(winningCells);

        return;
    }


    // Check draw
    if (isBoardFull()) {

        gameOver = true;

        statusElement.textContent = "It's a Draw! 🤝";

        return;
    }


    // Change player
    if (currentPlayer === 1) {

        currentPlayer = 2;

        statusElement.textContent = "Player 2's Turn 🟡";

    } else {

        currentPlayer = 1;

        statusElement.textContent = "Player 1's Turn 🔴";
    }
}


// Check winner
function checkWinner(row, col) {

    const player = board[row][col];

    const directions = [
        [0, 1],   // horizontal
        [1, 0],   // vertical
        [1, 1],   // diagonal
        [1, -1]   // opposite diagonal
    ];

    let winningCells = [];

    for (let direction of directions) {

        let cells = [[row, col]];

        const dr = direction[0];
        const dc = direction[1];


        // Forward
        let r = row + dr;
        let c = col + dc;

        while (
            r >= 0 &&
            r < rows &&
            c >= 0 &&
            c < cols &&
            board[r][c] === player
        ) {

            cells.push([r, c]);

            r += dr;
            c += dc;
        }


        // Backward
        r = row - dr;
        c = col - dc;

        while (
            r >= 0 &&
            r < rows &&
            c >= 0 &&
            c < cols &&
            board[r][c] === player
        ) {

            cells.push([r, c]);

            r -= dr;
            c -= dc;
        }


        if (cells.length >= 4) {

            winningCells = cells;

            break;
        }
    }

    return winningCells;
}


// Highlight winning pieces
function highlightWinner(cells) {

    const allCells = document.querySelectorAll(".cell");

    cells.forEach(([row, col]) => {

        const index = row * cols + col;

        allCells[index].classList.add("winner");
    });
}


// Check if board is full
function isBoardFull() {

    for (let row = 0; row < rows; row++) {

        for (let col = 0; col < cols; col++) {

            if (board[row][col] === 0) {

                return false;
            }
        }
    }

    return true;
}


// New game
resetButton.addEventListener("click", function () {

    createBoard();

});


// Start game
createBoard();
