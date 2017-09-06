(function (document) {
    "use strict";

    var canvas = document.getElementById("life"),
        context = canvas.getContext("2d"),
        runButton = document.getElementById("run"),
        pauseButton = document.getElementById("pause"),
        stepButton = document.getElementById("step"),
        clearButton = document.getElementById("clear"),
        pieceSelected,
        blockButton = document.getElementById("block"),
        beehiveButton = document.getElementById("beehive"),
        loafButton = document.getElementById("loaf"),
        boatButton = document.getElementById("boat"),
        tubButton = document.getElementById("tub"),
        blinkerButton = document.getElementById("blinker"),
        toadButton = document.getElementById("toad"),
        beaconButton = document.getElementById("beacon"),
        gliderButton = document.getElementById("glider"),
        lwssButton = document.getElementById("lwss"),
        outlineColor = "gray",
        cellColors = [
            "white",
            "black"
        ],
        scale = 20,
        pieces = {
            block: [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ],
            beehive: [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 0, 0],
                [0, 1, 0, 0, 1, 0],
                [0, 0, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ],
            loaf: [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 0, 0],
                [0, 1, 0, 0, 1, 0],
                [0, 0, 1, 0, 1, 0],
                [0, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ],
            boat: [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            tub: [
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            blinker: [
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            toad: [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ],
            beacon: [
                [0, 0, 0, 0, 0, 0],
                [0, 1, 1, 0, 0, 0],
                [0, 1, 1, 0, 0, 0],
                [0, 0, 0, 1, 1, 0],
                [0, 0, 0, 1, 1, 0],
                [0, 0, 0, 0, 0, 0]
            ],
            // TODO - pulsar
            // TODO - pentadecathlon
            glider: [
                [0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 0, 0]
            ],
            lwss: [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 0, 0, 1, 0],
                [0, 0, 1, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ]
        },
        gameBoard,
        lastTime = 0,
        updateCounter = 0,
        updateTime = 0,
        updateInterval = 1000, /* 1 frame per second */
        arena,
        paused = true;

    function copyMatrix(matrix) {
        return matrix.map(
            function (row) {
                return row.map(
                    function (value) {
                        return value;
                    }
                );
            }
        );
    }

    function drawMatrix(matrix, offset, colors) {
        colors = colors || cellColors;

        matrix.forEach(
            function (row, y) {
                row.forEach(
                    function (value, x) {
                        context.beginPath();
                        context.fillStyle = colors[value];
                        context.rect(
                            (x + offset.x) * scale,
                            (y + offset.y) * scale,
                            scale,
                            scale
                        );
                        context.fill();
                        context.lineWidth = 1;
                        context.strokeStyle = outlineColor;
                        context.stroke();
                    }
                );
            }
        );

    }

    function canvasMouseMoveHandler(event) {
        var x,
            y;
        if (pieceSelected) {
            x = Math.floor(event.offsetX / scale);
            y = Math.floor(event.offsetY / scale);
            draw();
            drawMatrix(
                pieces[pieceSelected],
                {
                    x: x,
                    y: y
                },
                [
                    "white",
                    "red"
                ]
            );
        }
    }

    function canvasMouseLeaveHandler(event) {
        draw();
    }

    function selectPiece(piece) {
        if (piece === pieceSelected) {
            pieceSelected = null;
        } else {
            pieceSelected = piece;
        }
    }

    function isInBounds(x, y) {
        return y >= 0 && y < gameBoard.length &&
            x >= 0 && x < gameBoard[0].length;
    }

    function placeSelectedPiece(offsetX, offsetY) {
        pieces[pieceSelected].forEach(
            function (row, y) {
                row.forEach(
                    function (value, x) {
                        if (isInBounds(x + offsetX, y + offsetY)) {
                            gameBoard[y + offsetY][x + offsetX] = value;
                        }
                    }
                );
            }
        );
        pieceSelected = null;
    }

    function canvasClickHandler(event) {
        var x = Math.floor(event.offsetX / scale),
            y = Math.floor(event.offsetY / scale);
        if (pieceSelected) {
            placeSelectedPiece(x, y);
        } else {
            if (gameBoard[y][x]) {
                gameBoard[y][x] = 0;
            } else {
                gameBoard[y][x] = 1;
            }
        }
        draw();
    }

    function clearCanvas() {
        context.fillStyle = outlineColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function draw() {
        clearCanvas();

        drawMatrix(
            gameBoard,
            {
                x: 0,
                y: 0
            }
        );
    }

    function createMatrix(width, height) {
        var matrix = [],
            h,
            w,
            widthArray;

        for (h = 0; h < height; h += 1) {
            widthArray = [];

            for (w = 0; w < width; w += 1) {
                widthArray.push(0);
            }

            matrix.push(widthArray);
        }

        return matrix;
    }

    function createFreshBoard() {
        gameBoard = createMatrix(20, 20);
        draw();
    }

    function hasNeighbor(board, x, y) {
        if (board[y]) {
            return board[y][x] === 1;
        }
        return false;
    }

    function getNumNeighbors(board, x, y) {
        var neighbors = [],
            numNeighbors;

        neighbors.push(
            hasNeighbor(board, x + 1, y),
            hasNeighbor(board, x + 1, y + 1),
            hasNeighbor(board, x + 1, y - 1),
            hasNeighbor(board, x, y + 1),
            hasNeighbor(board, x, y - 1),
            hasNeighbor(board, x - 1, y),
            hasNeighbor(board, x - 1, y + 1),
            hasNeighbor(board, x - 1, y - 1)
        );

        numNeighbors = neighbors.filter(function (n) {
            return n;
        }).length;

        return numNeighbors;
    }

    function updateGameState() {
        var newBoard = copyMatrix(gameBoard);
        gameBoard.forEach(
            function (row, y) {
                row.forEach(
                    function (value, x) {
                        var neighbors = getNumNeighbors(gameBoard, x, y);
                        if (neighbors === 3 || (neighbors === 2 && value === 1)) {
                            newBoard[y][x] = 1;
                        } else {
                            newBoard[y][x] = 0;
                        }
                    }
                );
            }
        );
        gameBoard = newBoard;
    }

    function update(time) {
        var deltaTime;

        deltaTime = time - lastTime;
        lastTime = time;

        updateCounter += 1;
        updateTime += deltaTime;

        if (!paused) {
            if (updateTime > updateInterval) {
                updateGameState();
                updateTime = 0;
                draw();
            }
        }

        requestAnimationFrame(update);
    }

    function updateButtons() {
        if (paused) {
            runButton.disabled = false;
            stepButton.disabled = false;
            pauseButton.disabled = true;
        } else {
            runButton.disabled = true;
            stepButton.disabled = true;
            pauseButton.disabled = false;
        }
    }

    function togglePause() {
        paused = !paused;
        updateButtons();
    }

    function runHandler() {
        if (paused) {
            togglePause();
        }
    }

    function pauseHandler() {
        if (!paused) {
            togglePause();
        }
    }

    function stepHandler() {
        if (paused) {
            updateGameState();
            draw();
        }
    }

    function clearHandler() {
        createFreshBoard();
    }

    createFreshBoard();
    updateButtons();

    update(0); /* Start the animation frames at time 0. */

    canvas.addEventListener("click", canvasClickHandler);
    canvas.addEventListener("mousemove", canvasMouseMoveHandler);
    canvas.addEventListener("mouseleave", canvasMouseLeaveHandler);

    runButton.addEventListener("click", runHandler);
    pauseButton.addEventListener("click", pauseHandler);
    stepButton.addEventListener("click", stepHandler);
    clearButton.addEventListener("click", clearHandler);

    blockButton.addEventListener(
        "click",
        function () {
            selectPiece("block");
        }
    );

    beehiveButton.addEventListener(
        "click",
        function () {
            selectPiece("beehive");
        }
    );

    loafButton.addEventListener(
        "click",
        function () {
            selectPiece("loaf");
        }
    );

    boatButton.addEventListener(
        "click",
        function () {
            selectPiece("boat");
        }
    );

    tubButton.addEventListener(
        "click",
        function () {
            selectPiece("tub");
        }
    );

    blinkerButton.addEventListener(
        "click",
        function () {
            selectPiece("blinker");
        }
    );

    toadButton.addEventListener(
        "click",
        function () {
            selectPiece("toad");
        }
    );

    beaconButton.addEventListener(
        "click",
        function () {
            selectPiece("beacon");
        }
    );

    gliderButton.addEventListener(
        "click",
        function () {
            selectPiece("glider");
        }
    );

    lwssButton.addEventListener(
        "click",
        function () {
            selectPiece("lwss");
        }
    );

}(window.document));
