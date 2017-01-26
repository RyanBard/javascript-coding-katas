/*
 * Project inspired by:
 *   https://www.youtube.com/watch?v=H2aW5V46khA
 *   https://www.youtube.com/watch?v=KoWqdEACyLI
 *   https://www.youtube.com/watch?v=ju09womACpQ
 */
(function (document) {
    "use strict";

    var canvas = document.getElementById("pong"),
        context = canvas.getContext("2d"),
        currentVelocity = {
            x: 4,
            y: 4
        },
        ball = {
            dimension: 6,
            x: canvas.width / 2,
            y: canvas.height / 2
        },
        player = {
            paddle: {
                x: 0,
                y: 40,
                thickness: 10,
                height: 100
            },
            score: 0
        },
        computer = {
            velocity: 2, /* how fast the computer can move its paddle */
            paddle: {
                x: 0,
                y: 40,
                thickness: 10,
                height: 100
            },
            score: 0
        },
        lastTime = 0,
        timeCounter = 0,
        timeInterval = Math.floor(1000 / 30), /* 30 frames per second */
        arena,
        lastScore = 0,
        paused = false;

    function clearCanvas() {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawPaddle(x, paddle) {
        context.fillStyle = "white";
        context.fillRect(
            x,
            paddle.y,
            paddle.thickness,
            paddle.height
        );
    }

    function drawBall() {
        context.fillRect(
            ball.x - ball.dimension / 2,
            ball.y - ball.dimension / 2,
            ball.dimension,
            ball.dimension
        );
    }

    function drawScore() {
        context.fillText(
            player.score,
            100,
            100
        );

        context.fillText(
            computer.score,
            canvas.width - 100,
            100
        );
    }

    function draw() {
        clearCanvas();
        drawPaddle(0, player.paddle);
        drawPaddle(canvas.width - computer.paddle.thickness, computer.paddle);
        drawBall();
        drawScore();
     }

    function resetGame() {
        resetBoard();
        player.score = 0;
        computer.score = 0;
    }

    function resetBoard() {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        /*
         * Start the ball off going towards oppisite direction of the last
         * scoring (so it starts off going towards the scorer, if both players
         * are idle, the points will even out).
         */
        currentVelocity.x = -currentVelocity.x;
        currentVelocity.y = 2;
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
            "(press ESC/enter/spacebar to continue)",
            Math.floor(canvas.width / 2),
            Math.floor(canvas.height / 2) + 20
        );
    }

    function drawPausedScreen() {
        clearCanvas();
        displayPaused();
    }

    function updateScore(participant) {
        participant.score += 1;
    }

    function collidesWithPaddle(paddle) {
        return ball.y > paddle.y && ball.y < paddle.y + paddle.height;
    }

    function collidesWithWall() {
        return (ball.y < 0 && currentVelocity.y < 0) || (ball.y > canvas.height && currentVelocity.y > 0);
    }

    function bounceBall(paddle) {
        var deltaY = ball.y - (paddle.y + paddle.height / 2);
        currentVelocity.x = -currentVelocity.x;
        /*
         * This allows the player to change the angle of the ball based on which part of their paddle they hit with.
         *
         * This was a little flavor added in: https://www.youtube.com/watch?v=KoWqdEACyLI
         *
         * There should be a better way to deal with this.  I'll figure it out when I code breakout and come back and
         * fix this.
         */
        currentVelocity.y = deltaY * 0.3;
    }

    function moveBall() {
        var deltaY = 0;

        ball.x += currentVelocity.x;
        ball.y += currentVelocity.y;

        /* Check for collisions. */

        if (collidesWithWall()) {
            currentVelocity.y = -currentVelocity.y;
        }

        if (ball.x < 0) {
            /*
             * TODO: It would be better to detect paddle collision BEFORE the
             * ball moves off the board to get rid of the ball sinking into
             * the paddle before bouncing.
             */
            if (collidesWithPaddle(player.paddle)) {
                bounceBall(player.paddle);
            } else {
                updateScore(computer);
                resetBoard();
            }
        }

        if (ball.x > canvas.width) {
            if (collidesWithPaddle(computer.paddle)) {
                bounceBall(computer.paddle);
            } else {
                updateScore(player);
                resetBoard();
            }
        }
    }

    function aiAction() {
        if(computer.paddle.y + computer.paddle.height / 2 < ball.y) {
            computer.paddle.y += computer.velocity;
        } else {
            computer.paddle.y -= computer.velocity;
        }
    }

    function update(time) {
        var deltaTime;

        time = time || 0;
        deltaTime = time - lastTime;
        lastTime = time;

        timeCounter += deltaTime;

        if (paused) {

            drawPausedScreen();

        } else {

            if (timeCounter > timeInterval) {
                moveBall();
                aiAction();
                timeCounter = 0;
                /*
                 * We can draw inside of the interval check in this game
                 * because player input isn't tied to the framerate of the
                 * animation in this game (it is tied to the mousemove event).
                 */
                draw();
            }

        }

        requestAnimationFrame(update);
    }

    function togglePause() {
        paused = !paused;
    }

    function keyHandler(event) {

        // console.log("event:", event);

        switch (event.keyCode) {
        case 38:
            console.log("up arrow pressed");
            break;
        case 40:
            console.log("down arrow pressed");
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

    function mouseHandler(event) {
        // console.log("handling mouse event, event.clientY:", event.clientY);
        player.paddle.y = event.clientY - player.paddle.height / 2;
        /*
         * A different approach was used in: https://www.youtube.com/watch?v=ju09womACpQ
         * player.paddle.y = canvas.height * (event.offsetY / event.target.getBoundingClientRect().height);
         *
         * When testing it out, it seemed to be almost the same thing (just a
         * few pixels different from the simpler calculation).  The way I have
         * kept allows the paddle to disappear if you drag your mouse to the
         * very bottom of the screen.  The other way in this comment still
         * keeps a small sliver of the paddle in sight before the mouse is
         * outside of the canvas (which seems like maybe it's a bug in the
         * more complex calculation).
         */
    }

    resetGame();
    update(0); /* Start the animation frames at time 0. */

    document.addEventListener("keydown", keyHandler);
    canvas.addEventListener("mousemove", mouseHandler);

}(window.document));
