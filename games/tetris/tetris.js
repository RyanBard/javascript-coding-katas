/* Project inspired by: https://www.youtube.com/watch?v=H2aW5V46khA */
(function (document) {
    "use strict";

    var canvas = document.getElementById("tetris"),
        context = canvas.getContext("2d"),
        scale = 20,
        colors = [
            "black",
            "red",
            "lime",
            "blue",
            "purple",
            "orange",
            "cyan",
            "yellow"
        ],
        pieceMatrices = {
            T: [
                [0, 0, 0],
                [4, 4, 4],
                [0, 4, 0]
            ],
            J: [
                [0, 3, 0],
                [0, 3, 0],
                [3, 3, 0]
            ],
            L: [
                [0, 5, 0],
                [0, 5, 0],
                [0, 5, 5]
            ],
            S: [
                [0, 2, 2],
                [2, 2, 0],
                [0, 0, 0]
            ],
            Z: [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0]
            ],
            I: [
                [0, 0, 0, 0],
                [6, 6, 6, 6],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            O: [
                [7, 7],
                [7, 7]
            ]
        },
        player = {
            pos: {
                x: 0,
                y: 0
            },
            score: 0,
            matrix: pieceMatrices.T
        },
        lastTime = 0,
        dropCounter = 0,
        dropInterval = 1000, /* 1 frame per second */
        arena,
        lastScore = 0,
        paused = false;

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

    function createPiece(type) {
        return copyMatrix(pieceMatrices[type]);
    }

    function drawMatrix(matrix, offset) {

        matrix.forEach(
            function (row, y) {
                row.forEach(
                    function (value, x) {
                        if (value !== 0) {
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
                            context.strokeStyle = "white";
                            context.stroke();
                        }
                    }
                );
            }
        );

    }

    function displayScore() {
        document.getElementById("score").innerText = "Score: " + player.score;
    }

    function updateScore(rowsRemoved) {

        switch (rowsRemoved) {
        case 1:
            player.score += 100;
            lastScore = 100;
            break;
        case 2:
            player.score += 300;
            lastScore = 300;
            break;
        case 3:
            player.score += 500;
            lastScore = 500;
            break;
        case 4:
            if (lastScore === 800) {
                /* Adding an additional 400 to make the previous 800 bump up to 1200. */
                player.score += 1600;
                lastScore = 1200;
            } else if (lastScore === 1200) {
                player.score += 1200;
                /* The last score was already 1200, no need to set it again. */
            } else {
                /* This is the first tetris sequence since they scored last. */
                player.score += 800;
                lastScore = 800;
            }
            break;
        default:
            break;
        }
        // console.log("current score:", player.score);
        displayScore();
    }

    function arenaSweep() {
        var y,
            x,
            rowsRemoved = 0,
            i;
        /* Start from the bottom and check for gaps in the rows. */
        rowLoop: for (y = arena.length - 1; y >= 0; y -= 1) {
            for (x = 0; x < arena[y].length; x += 1) {
                if (arena[y][x] === 0) {
                    continue rowLoop; /* We found a gap, move on to the next row. */
                }
            }
            /* Remove the filled in row. */
            arena.splice(y, 1);
            rowsRemoved += 1;
        }
        for (i = 0; i < rowsRemoved; i += 1) {
            /* Add a blank rows to the top for each line removed. */
            // TODO - use something less hardcoded. */
            arena.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
        updateScore(rowsRemoved);
    }

    function collide(arena, player) {
        return player.matrix.some(
            function (row, y) {
                return row.some(
                    function (value, x) {
                        var arenaValue;
                        if (value === 0) {
                            return false;
                        }
                        arenaValue = arena[y + player.pos.y] && arena[y + player.pos.y][x + player.pos.x];
                        /*
                         * If we're out of bounds, then arenaValue will be
                         * undefined and so we've collided.  If arenaValue
                         * is 1, then we've collided with another piece.
                         */
                         // console.log("collide called, arenaValue:", arenaValue);
                        return arenaValue !== 0;
                    }
                );
            }
        );
    }

    function merge(arena, player) {
        player.matrix.forEach(
            function (row, y) {
                row.forEach(
                    function (value, x) {
                        if (value !== 0) {
                            arena[y + player.pos.y][x + player.pos.x] = value;
                        }
                    }
                );
            }
        );
    }

    function clearCanvas() {
        context.fillStyle = colors[0];
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function draw() {
        clearCanvas();

        drawMatrix(
            arena,
            {
                x: 0,
                y: 0
            }
        );

        drawMatrix(
            player.matrix,
            player.pos
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
        arena = createMatrix(12, 20);
        player.score = 0;
    }

    function startNextPiece() {
        var pieces = "ILJOTSZ";
        player.matrix = createPiece(pieces[Math.floor(pieces.length * Math.random())]);
        player.pos.y = 0;
        player.pos.x = Math.floor(arena[0].length / 2) - Math.floor(player.matrix[0].length / 2);
        /*
         * The next piece started off in a collision, so they lost.  Let's
         * clear the game board.
         */
        if (collide(arena, player)) {
            console.log("you lose, starting over! score:", player.score);
            createFreshBoard();
        }
    }

    function playerDrop() {
        var collision = false;

        player.pos.y += 1;

        if (collide(arena, player)) {
            // console.log("colliding!");
            player.pos.y -= 1;
            merge(arena, player);
            startNextPiece();
            arenaSweep();
            collision = true;
        }

        /*
         * Reset the dropCounter.  This is important for both the request
         * animation tick and the player input.  For the player input, it is
         * so the update tick doesn't drop the block immediately after the
         * player drops the block.
         */
        dropCounter = 0;

        return collision;
    }

    function playerFullDrop() {
        while (!playerDrop()) {
            /* empty */
        }
    }

    function displayPaused() {
        context.textAlign = "center";
        context.fillStyle = "gray";
        context.font = "bold 16px verdana, sans-serif";
        context.fillText(
            "Paused",
            Math.floor(canvas.width / 2),
            Math.floor(canvas.height / 2) - 20
        );
        context.fillText(
            "(press ESC to continue)",
            Math.floor(canvas.width / 2),
            Math.floor(canvas.height / 2) + 20
        );
    }

    function drawPausedScreen() {
        clearCanvas();
        displayPaused();
    }

    function update(time) {
        var deltaTime;

        deltaTime = time - lastTime;
        lastTime = time;

        // console.log("deltaTime:", deltaTime);
        // console.log("dropCounter:", dropCounter);

        dropCounter += deltaTime;

        if (paused) {

            drawPausedScreen();

        } else {

            if (dropCounter > dropInterval) {
                playerDrop();
            }

            /*
             * Draw outside of the interval check because player actions are
             * more frequent then the "framerate" of the animation in this
             * game.
             */
            draw();

        }

        requestAnimationFrame(update);
    }

    function playerMove(direction) {
        player.pos.x += direction;

        if (collide(arena, player)) {
            /* Undo the move that would have collided. */
            player.pos.x -= direction;
        }
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

    function reverseMatrix(matrix) {
        var copy = copyMatrix(matrix);
        copy.forEach(
            function (row) {
                return row.reverse();
            }
        );
        return copy;
    }

    function rotateMatrix(matrix) {
        return reverseMatrix(transposeMatrix(matrix));
    }

    function playerRotate() {
        var oldMatrix = player.matrix;
        player.matrix = rotateMatrix(player.matrix);
        if (collide(arena, player)) {
            /* Undo the collision due to rotate that we allowed. */
            player.matrix = oldMatrix;
        }
    }

    function togglePause() {
        paused = !paused;
    }

    function keyHandler(event) {

        switch (event.keyCode) {
        case 37:
            // console.log("left arrow pressed");
            playerMove(-1);
            break;
        case 38:
            // console.log("up arrow pressed");
            playerRotate();
            break;
        case 39:
            // console.log("right arrow pressed");
            playerMove(1);
            break;
        case 40:
            // console.log("down arrow pressed");
            playerDrop();
            break;
        case 32:
            // console.log("spacebar pressed");
            playerFullDrop();
            break;
        case 27:
            // console.log("esc pressed");
            togglePause();
            break;
        case 13:
            console.log("enter pressed");
            break;
        default:
            console.log("unknown pressed");
            break;
        }
    }

    createFreshBoard();
    // console.table(arena);

    displayScore();
    startNextPiece();
    update(0); /* Start the animation frames at time 0. */

    document.addEventListener("keydown", keyHandler);

}(window.document));
