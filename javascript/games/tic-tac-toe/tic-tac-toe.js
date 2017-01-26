(function (document) {
    "use strict";

    var canvas = document.getElementById("tic-tac-toe"),
        context = canvas.getContext("2d");

    function clearCanvas() {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    clearCanvas();

}(window.document));
