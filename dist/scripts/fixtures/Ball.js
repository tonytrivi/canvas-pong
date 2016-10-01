function Ball(startX, startY, leftBoundary, rightBoundary) {  
    this.height = 7;
    this.width = 7;
    this.x = startX;
    this.y = startY;
    this.speedX = Math.floor(Math.random() * 4 - 4);
    this.speedY = 2 - Math.abs(this.speedX);
    this.leftBoundary = leftBoundary;
    this.rightBoundary = rightBoundary;
    this.topBoundary = topBoundary;
    this.bottomBoundary = bottomBoundary;      
    this.scoreIncremented = false;
    this.playerScore = 0;
    this.computerScore = 0
}

Ball.prototype.render = function (context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = 'blue';
    context.setLineDash([0,0]);
    context.fillRect(this.x, this.y, this.height, this.width);
};

Ball.prototype.move = function () {
    this.x += this.speedX;
    this.y += this.speedY;
};

Ball.prototype.update = function (leftPaddle,rightPaddle) {
    ball.move();
    
    //boundaries for the ball
    if (((this.x + this.speedX <= this.leftBoundary && this.x + this.speedX > this.leftBoundary - 6) && (this.y >= (leftPaddle.y - 5) && this.y <= (leftPaddle.y + 5) + leftPaddle.height)) || ((this.x + this.speedX >= this.rightBoundary && this.x + this.speedX < this.rightBoundary + 6) && (this.y >= (rightPaddle.y - 5) && this.y <= (rightPaddle.y + 5) + rightPaddle.height))) {
        this.speedX = - this.speedX;
    }
    if (this.y + this.speedY > this.bottomBoundary || this.y + this.speedY < this.topBoundary) {
        this.speedY = - this.speedY;
    }
    
    //increment score if the ball leaves the court
    if (ball.x < (leftPaddle.x - 200) && this.scoreIncremented == false) {
        this.computerScore++;
        this.scoreIncremented = true;
    }
    if (ball.x > (rightPaddle.x + 200) && this.scoreIncremented == false) {
        this.playerScore++;
        this.scoreIncremented = true;
    }
};

Ball.prototype.reset = function (startX,startY) {
    this.scoreIncremented = false;
    this.x = startX;
    this.y = startY;
    this.speedX = Math.floor(Math.random() * 4 - 4);
    this.speedY = 2 - Math.abs(this.speedX);
};