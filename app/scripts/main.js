/*
**desc court
*/
var canvas = null;
var context = null;
var canvasBackground = null;
var contextBackground = null;

/*
**desc game elements
*/
var ball = null;
var player1 = null;
var comp = null;

/*
**desc initial game prep
*/
var initializeGameElements = function () {
    canvas = document.getElementById('pong-table');
    context = canvas.getContext('2d');
    canvasBackground = document.getElementById('pong-background');
    contextBackground = canvasBackground.getContext('2d');
    
    ball = new Ball();
    player1 = new Player();
    comp = new Computer();
};

/*
**desc renders game elements in the game loop
*/
var step = function () {
    ball.move();
    render();
    animate(step);
};

/*
**desc animates the game
*/
var animate = window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) { window.setTimeout(callback, 1000/30) };

/*
**desc renders an object
**returns void
*/
var render = function () {
    context.clearRect(0, 0, 400, 400);
    player1.render(context);
    comp.render(context);
    ball.render(context);
};

/*
**desc lays out the court and playing elements
**returns void
*/
var drawCourt = function() {
    initializeGameElements();
    
    //draw table outline
    var tableWidth = 530;
    var tableHeight = 329;
    var tableBorderWidth = 10;
    var defaultLineColor = 'orange';

    contextBackground.strokeStyle = defaultLineColor;
    contextBackground.lineWidth = tableBorderWidth;
    contextBackground.strokeRect(35, 35, tableWidth, tableHeight);

    //mid line
    contextBackground.setLineDash([8, 10]);

    contextBackground.beginPath();
    contextBackground.moveTo(300,42);
    contextBackground.lineTo(300, 360);
    contextBackground.stroke();
    
    //reset line dash
    contextBackground.setLineDash([0,0]);
};

/*
**desc clears a place for the paddle
*/
var clearPaddle = function () {
    //context.clearRect(55, 40, 10, 35);
};

/*
**desc moves the player's paddle
*/
var movePlayer = function (e) {    
    if (e.keyCode == "38" && player1.paddle.y > 40) {
        clearPaddle();
        player1.paddle.move("up");
    }
    
    if (e.keyCode == "40" && player1.paddle.y < 320) {
        clearPaddle();
        player1.paddle.move("down");
    }
};

/*
**desc callback function for keypress
*/
var keyDownHandler = function (e) {
    movePlayer(e);
};