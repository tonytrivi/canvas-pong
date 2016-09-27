/*
**desc court
*/
var canvas = null;
var context = null;

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
    ball = new Ball();
    player1 = new Player();
    comp = new Computer();
};

/*
**desc each animation step in the game loop
*/
var step = function () {
    //console.log(player1.paddle.y);
    //console.log(player1.paddle.x);
    //console.log(player1.paddle.width);
    //console.log(player1.paddle.height);
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
    ball.render(context);
    player1.render(context);
    comp.render(context);
};

/*
**desc lays out the court and playing elements
**returns void
*/
var drawCourt = function() {
    initializeGameElements();
    
    //draw table outline
    var tableWidth = 525;
    var tableHeight = 330;
    var tableBorderWidth = 8;
    var defaultLineColor = 'orange';

    context.strokeStyle = defaultLineColor;
    context.lineWidth = tableBorderWidth;
    context.strokeRect(35, 35, tableWidth, tableHeight);

    //mid line
    context.setLineDash([8, 12]);

    context.beginPath();
    context.moveTo(300,35);
    context.lineTo(300, 355);
    context.stroke();
    
    //reset line dash
    context.setLineDash([0,0]);
};

/*
**desc clears a place for the paddle
*/
var clearPaddle = function () {
    context.clearRect(55, 39, 10, 322);
};

/*
**desc moves the player's paddle
*/
var movePlayer = function (e) {    
    if (e.keyCode == "38" && player1.paddle.y > 41) {
        clearPaddle();
        player1.paddle.move("up");
    }
    
    if (e.keyCode == "40" && player1.paddle.y < 322) {
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