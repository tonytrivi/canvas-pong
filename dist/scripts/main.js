/*
**desc court
*/
var canvas  = null;
var context = null;

/*
**desc game dimensions and elements
*/
var ball         = null;
var player1      = null;
var comp         = null;
var ballOutEvent = null;
var tableStartX      = 35;
var tableStartY      = 35;
var tableWidth       = 530;
var tableHeight      = 329;
var tableBorderWidth = 10;
var ballStartX       = 350;
var ballStartY       = 135;
var leftBoundary     = 65;   //left paddle edge + paddle width
var rightBoundary    = 524;  //right paddle edge
var topBoundary      = 40;   //top of court
var bottomBoundary   = 352;  //bottom of court
var scoreToWin       = 11;
var playerScoreElement   = null;
var computerScoreElement = null;
var endMessageElement    = null;
var instructionsElement  = null;
var instructions = "Refresh to play again."
var youWin       = "You win!";
var youLose      = "You lose.";
var playerScore   = 0;
var computerScore = 0;
var incrementScore = false;
var gameOver = false;

/*
**desc initial game prep
*/
var initializeGameElements = function () {
    canvas = document.getElementById('pong-table');
    context = canvas.getContext('2d');
    
    //DOM elements
    playerScoreElement = document.getElementById("player-score");
    computerScoreElement = document.getElementById("computer-score");
    endMessageElement = document.getElementById("end-message");
    instructionsElement = document.getElementById("instructions");
    
    ball = new Ball(ballStartX, ballStartY, leftBoundary, rightBoundary, topBoundary, bottomBoundary);
    player1 = new Player();
    comp = new Computer();
    updateScore();
};

/*
**desc updates the viewable score
*/
var updateScore = function () {
    playerScoreElement.innerHTML    = playerScore;
    computerScoreElement.innerHTML  = computerScore;
    ball.reset(ballStartX,ballStartY);
};

/*
**desc renders game elements in the game loop
*/
var step = function () {
    if (incrementScore == true) {
        //check if game should end
        if (playerScore == scoreToWin) {
            endMessageElement.innerHTML = youWin;
            instructionsElement.innerHTML = instructions;
            gameOver = true;
        }
        else if (computerScore == scoreToWin) {
            endMessageElement.innerHTML = youLose;
            instructionsElement.innerHTML = instructions;
            gameOver = true;
        }
        
        updateScore();
        incrementScore = false;
    };
    
    if (gameOver == false) {
        ball.update(player1.paddle,comp.paddle);
        //chase the ball
        comp.update(ball,leftBoundary,rightBoundary);
        render();
        animate(step);
    } 
    
    
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

/*
**desc listener for when the ball leaves the court
*/
document.addEventListener('ball-out', function (e) {
    incrementScore = true;
    if (e.detail == "computer-scored") {
        computerScore++;
    }
    if (e.detail == "player-scored") {
        playerScore++;
    }
}, false);