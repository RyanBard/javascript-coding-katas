(function (document) {
    "use strict";

    var canvas = document.getElementById("tic-tac-toe"),
        context = canvas.getContext("2d"),
        currentPlayer = 1,
        board,
        clearButton = document.getElementById("clear");

    function createFreshBoard() {
        board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
    }

    function transposeMatrix(matrix) {
        return matrix[0].map(
            function (col, i) {
                return matrix.map(
                    function (row) {
                        return row[i];
                    }
                );
            }
        );
    }

    function togglePlayerTurn() {
        if (currentPlayer === 1) {
            currentPlayer = 2;
        } else {
            currentPlayer = 1;
        }
    }

    function isX(value) {
        return value === 1;
    }

    function isO(value) {
        return value === 2;
    }

    function threeInARow(row) {
        return row.every(isX) || row.every(isO);
    }

    function isDiagonalWin() {
        var topLeft = board[0][0],
            topRight = board[0][2],
            middle = board[1][1],
            bottomLeft = board[2][0],
            bottomRight = board[2][2];

        return middle !== 0 && (
            (middle === topLeft && middle === bottomRight) ||
            (middle === bottomLeft && middle === topRight)
        );
    }

    function isGameOver() {
        return board.some(threeInARow) ||
            transposeMatrix(board).some(threeInARow) ||
            isDiagonalWin();
    }

    function isBoardFull() {
        return board.every(function (row) {
            return row.every(function (value) {
                return value !== 0;
            });
        });
    }

    function placePiece(x, y) {
        if (!board[y][x] && !isGameOver()) {
            board[y][x] = currentPlayer;
            togglePlayerTurn();
        }
    }

    function clearCanvas() {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawGame() {
        clearCanvas();
        drawBoard();
        board.forEach(function (row, y) {
            row.forEach(function (value, x) {
                if (value === 1) {
                    drawX(x, y, "red");
                } else if (value === 2) {
                    drawO(x, y, "blue");
                }
            });
        });
    }

    function drawBoard() {
        context.beginPath();

        context.moveTo(canvas.width / 3, 10);
        context.lineTo(canvas.width / 3, canvas.height - 10)

        context.moveTo((2 * canvas.width) / 3, 10);
        context.lineTo((2 * canvas.width / 3), canvas.height - 10)

        context.moveTo(10, canvas.height / 3);
        context.lineTo(canvas.width - 10, canvas.height / 3)

        context.moveTo(10, (2 * canvas.height) / 3);
        context.lineTo(canvas.width - 10, (2 * canvas.height) / 3)

        context.lineWidth = 10;
        context.strokeStyle = "white";
        context.stroke();
    }

    function drawX(x, y, color) {
        context.beginPath();

        context.moveTo(x * (canvas.width / 3) + 20, y * (canvas.height / 3) + 20);
        context.lineTo((x + 1) * (canvas.width / 3) - 20, (y + 1) * (canvas.height / 3) - 20);

        context.moveTo((x + 1) * (canvas.width / 3) - 20, y * (canvas.height / 3) + 20);
        context.lineTo(x * (canvas.width / 3) + 20, (y + 1) * (canvas.height / 3) - 20);

        context.lineWidth = 10;
        context.strokeStyle = color;
        context.stroke();
    }

    function drawO(x, y, color) {
        context.beginPath();

        context.arc(
            ((x * (canvas.width / 3)) + ((x + 1) * (canvas.width / 3))) / 2,
            ((y * (canvas.height / 3)) + ((y + 1) * (canvas.height / 3))) / 2,
            (canvas.width / 3 - 40) / 2,
            0,
            2 * Math.PI
        );

        context.lineWidth = 10;
        context.strokeStyle = color;
        context.stroke();
    }

    function drawMessage(message) {
        context.fillStyle = "gray";
        context.fillRect(
            1 * (canvas.width / 6),
            (canvas.height / 2) - 32,
            4 * (canvas.width / 6),
            64
        );

        context.textAlign = "center";
        context.fillStyle = "white";
        context.font = "bold 16px verdana, sans-serif";
        context.fillText(
            message,
            Math.floor(canvas.width / 2),
            Math.floor(canvas.height / 2)
        );
    }

    function drawGameOverLoser(loser) {
        drawMessage("Player " + loser + " loses!");
    }

    function drawGameOverDraw() {
        drawMessage("Game over, another draw!");
    }

    function canvasClickHandler(event) {
        var x = Math.floor(event.offsetX / (canvas.width / 3)),
            y = Math.floor(event.offsetY / (canvas.height / 3));
        placePiece(x, y);
        drawGame();
        if (isGameOver()) {
            drawGameOverLoser(currentPlayer);
        } else if (isBoardFull()) {
            drawGameOverDraw();
        }
    }

    canvas.addEventListener("click", canvasClickHandler);

    function clearClickHandler() {
        createFreshBoard();
        drawGame();
    }

    clearButton.addEventListener("click", clearClickHandler);

    createFreshBoard();
    drawGame();

}(window.document));
