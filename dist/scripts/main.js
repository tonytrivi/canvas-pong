/*
**desc court
*/
var canvas = null;
var context = null;

/*
**desc game element dimensions
*/
var ball = null;
var player1 = null;
var comp = null;
var tableStartX = 35;
var tableStartY = 35;
var tableWidth = 530;
var tableHeight = 329;
var tableBorderWidth = 10;
var ballStartX = 350;
var ballStartY = 135;
var leftBoundary = 65;    //left paddle edge + paddle width
var rightBoundary = 524;  //right paddle edge
var topBoundary = 40;     //top of court
var bottomBoundary = 352; //bottom of court

/*
**desc initial game prep
*/
var initializeGameElements = function () {
    canvas = document.getElementById('pong-table');
    context = canvas.getContext('2d');

    ball = new Ball(ballStartX, ballStartY, leftBoundary, rightBoundary, topBoundary, bottomBoundary);
    player1 = new Player();
    comp = new Computer();
    updateScore();
};

/*
**desc updates the viewable score
*/
var updateScore = function () {
    var playerScoreElement = document.getElementById("player-score");
    var computerScoreElement = document.getElementById("computer-score");
    
    playerScoreElement.innerHTML = ball.playerScore;
    computerScoreElement.innerHTML = ball.computerScore;
};

/*
**desc renders game elements in the game loop
*/
var step = function () {
    if (ball.scoreIncremented == true) {
        ball.reset(ballStartX,ballStartY);
        updateScore();
};
    
    ball.update(player1.paddle,comp.paddle);
    //chase the ball
    comp.update(ball,leftBoundary,rightBoundary);
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
    //clear and redraw each time we render()
    drawCourt();
    ball.render(context);
    player1.render(context);
    comp.render(context);
};

/*
**desc lays out the court and playing elements
**returns void
*/
var drawCourt = function() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  //draw table outline
  var defaultLineColor = 'orange';

  context.strokeStyle = defaultLineColor;
  context.lineWidth = tableBorderWidth;
  context.strokeRect(tableStartX, tableStartY, tableWidth, tableHeight);

  //mid line
  context.setLineDash([8, 10]);

  context.beginPath();
  context.moveTo(300,42);
  context.lineTo(300, 360);
  context.stroke();

  //reset line dash
  context.setLineDash([0,0]);
};

/*
**desc moves the player's paddle
*/
var movePlayer = function (e) {
    if (e.keyCode == "38" && player1.paddle.y > 40) {
        player1.paddle.move("up");
    }

    if (e.keyCode == "40" && player1.paddle.y < 320) {
        player1.paddle.move("down");
    }
};

/*
**desc callback function for keypress
*/
var keyDownHandler = function (e) {
    movePlayer(e);
};