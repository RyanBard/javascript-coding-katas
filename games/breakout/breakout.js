(function (document) {
    "use strict";

    var canvas = document.getElementById("breakout"),
        context = canvas.getContext("2d");

    function clearCanvas() {
        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    clearCanvas();

}(window.document));
