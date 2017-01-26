/*
 * Project inspired by:
 *   https://www.youtube.com/watch?v=AaGK-fj-BAM
 *   https://www.youtube.com/watch?v=H2aW5V46khA
 */
(function (document) {
    "use strict";

    var canvas = document.getElementById("snake"),
        context = canvas.getContext("2d"),
        scale = 10,
        player,
        lastTime = 0,
        timeCounter = 0,
        timeInterval = 1000 / 30, /* 30 frames per second */
        arena,
        paused = false;

    function initializePlayerState(xStartPosition, yStartPosition) {
        player = {
            currentDirection: {
                x: 1,
                y: 0
            },
            queuedDirection: {
                x: 1,
                y: 0
            },
            pos: {
                x: xStartPosition,
                y: yStartPosition
            },
            tail: [],
            currentSize: 1,
            score: 0
        };
    }

    function displayScore() {
        document.getElementById("score").innerText = "Score: " + player.score;
    }

    function updateScore() {
        player.score += 100;
        displayScore();
    }

    function isWall(value) {
        return value === 1;
    }

    function positionsAreEqual(pos1, pos2) {
        return pos1.x === pos2.x && pos1.y === pos2.y;
    }

    function isSnakeTail(position) {
        return player.tail.some(
            function (pos) {
                return positionsAreEqual(pos, position);
            }
        );
    }

    function isSnake(position) {
        return positionsAreEqual(player.pos, position) || isSnakeTail(position);
    }

    function isEmpty(position) {
        if (isWall(arena[position.x][position.y])) {
            return false;
        }

        if (isSnake(position)) {
            return false;
        }

        return true;
    }

    function isBerry(value) {
        return value === 2;
    }

    function collide(arena, player) {
        var targetValue = arena[player.pos.x][player.pos.y];
        return isWall(targetValue) || isSnakeTail(player.pos);
    }

    function clearCanvas() {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawSnake() {
        player.tail.forEach(
            function (position) {
                context.fillStyle = "blue";
                context.fillRect(position.x * scale, position.y * scale, scale, scale);
            }
        );
        context.fillRect(player.pos.x * scale, player.pos.y * scale, scale, scale);
    }

    function drawBerries() {
        arena.forEach(
            function (row, x) {
                row.forEach(
                    function (value, y) {
                        if (isBerry(arena[x][y])) {
                            context.fillStyle = "red";
                            context.fillRect(x * scale, y * scale, scale, scale);
                        }
                    }
                );
            }
        );
    }

    function drawWalls() {
        arena.forEach(
            function (row, x) {
                row.forEach(
                    function (value, y) {
                        if (isWall(arena[x][y])) {
                            context.fillStyle = "white";
                            context.fillRect(x * scale, y * scale, scale, scale);
                        }
                    }
                );
            }
        );
    }

    function draw() {
        clearCanvas();

        drawSnake();
        drawBerries();
        drawWalls();
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

    function allOnes() {
        return 1;
    }

    function setOneAsFirstAndLast(row) {
        row[0] = 1;
        row[row.length - 1] = 1;
    }

    function buildWalls(arena) {
        /* Put a wall around the border. */
        arena[0] = arena[0].map(allOnes); /* The top row is all wall. */
        arena[arena.length - 1] = arena[0].map(allOnes); /* The bottom row is all wall. */
        arena.forEach(setOneAsFirstAndLast); /* First and last cell of all rows will be the left & right walls. */
    }

    function growSnake() {
        player.currentSize += 3;
    }

    function placeRandomBerry() {
        var x,
            y;

        do {
            x = Math.floor(Math.random() * (arena.length - 3)); /* don't pick the walls */
            y = Math.floor(Math.random() * (arena[0].length - 3)); /* don't pick the walls */
        } while (!isEmpty({x: x, y: y})); /* keep trying until you pick an empty spot */

        arena[x][y] = 2; /* place a berry */
    }

    function advanceSnake(tailToAdd) {
        if (isBerry(arena[player.pos.x][player.pos.y])) {
            arena[player.pos.x][player.pos.y] = 0; /* clear the old berry */
            placeRandomBerry();
            updateScore();
            growSnake();
        }
        player.tail.unshift(tailToAdd); /* Add previous head to the beginning of the tail. */
        player.tail.length = player.currentSize; /* Trim any excess items in the tail. */
    }

    function createFreshBoard() {
        var width = 60,
            height = 60;

        arena = createMatrix(width, height);

        buildWalls(arena);

        initializePlayerState(Math.floor(width / 2), Math.floor(height / 2));

        displayScore();

        placeRandomBerry();
    }

    function setQueuedDirToCurrentDir() {
        player.currentDirection.x = player.queuedDirection.x;
        player.currentDirection.y = player.queuedDirection.y;
    }

    function setCurrentDirToQueuedDir() {
        player.queuedDirection.x = player.currentDirection.x;
        player.queuedDirection.y = player.currentDirection.y;
    }

    function moveSnake() {
        var tailToAdd = {
            x: player.pos.x,
            y: player.pos.y
        };

        setQueuedDirToCurrentDir();

        player.pos.x += player.currentDirection.x;
        player.pos.y += player.currentDirection.y;

        if (collide(arena, player)) {
            console.log("you lose, starting over! score:", player.score);
            createFreshBoard();
        } else {
            advanceSnake(tailToAdd);
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
            "(press ESC/space/enter to continue)",
            Math.floor(canvas.width / 2),
            Math.floor(canvas.height / 2) + 20
        );
    }

    function drawPausedScreen() {
        clearCanvas();
        displayPaused();
    }

    function gameLoop(time) {
        var deltaTime;

        deltaTime = time - lastTime;
        lastTime = time;

        timeCounter += deltaTime;

        if (paused) {

            drawPausedScreen();

        } else {

            if (timeCounter > timeInterval) {
                moveSnake();
                timeCounter = 0;
                /*
                 * We can draw inside of the interval check in this game
                 * because player input simply directs the animation
                 * (faster player input doesn't cause objects to move faster
                 * than the framerate).
                 */
                draw();
            }

        }

        requestAnimationFrame(gameLoop);
    }

    function togglePause() {
        paused = !paused;
    }

    function tryLeft() {
        if (player.currentDirection.x === 1) {
            /* They cannot move left when they are already heading right, so ignore this and set the same direction. */
            setCurrentDirToQueuedDir();
        } else {
            player.queuedDirection.x = -1;
            player.queuedDirection.y = 0;
        }
    }

    function tryRight() {
        if (player.currentDirection.x === -1) {
            /* They cannot move right when they are already heading left, so ignore this and set the same direction. */
            setCurrentDirToQueuedDir();
        } else {
            player.queuedDirection.x = 1;
            player.queuedDirection.y = 0;
        }
    }

    function tryUp() {
        if (player.currentDirection.y === 1) {
            /* They cannot move up when they are already heading down, so ignore this and set the same direction. */
            setCurrentDirToQueuedDir();
        } else {
            player.queuedDirection.x = 0;
            player.queuedDirection.y = -1;
        }
    }

    function tryDown() {
        if (player.currentDirection.y === -1) {
            /* They cannot move down when they are already heading up, so ignore this and set the same direction. */
            setCurrentDirToQueuedDir();
        } else {
            player.queuedDirection.x = 0;
            player.queuedDirection.y = 1;
        }
    }

    function keyHandler(event) {

        switch (event.keyCode) {
        case 37:
            // console.log("left arrow pressed");
            tryLeft();
            break;
        case 38:
            // console.log("up arrow pressed");
            tryUp();
            break;
        case 39:
            // console.log("right arrow pressed");
            tryRight();
            break;
        case 40:
            // console.log("down arrow pressed");
            tryDown();
            break;
        case 32:
            // console.log("spacebar pressed");
            togglePause();
            break;
        case 27:
            // console.log("esc pressed");
            togglePause();
            break;
        case 13:
            // console.log("enter pressed");
            togglePause();
            break;
        default:
            console.log("unknown pressed");
            break;
        }
    }

    createFreshBoard();
    // console.table(arena);

    gameLoop(0); /* Start the animation frames at time 0. */

    document.addEventListener("keydown", keyHandler);

}(window.document));
