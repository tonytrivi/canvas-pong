function Ball(startX, startY, leftBoundary, rightBoundary) {
    this.height = 7;
    this.width = 7;
    this.x = startX;
    this.y = startY;
    this.speedX = this.getRandomInt(-2,3);
    this.speedY = this.getRandomInt(-4,-2);
    this.leftBoundary = leftBoundary;
    this.rightBoundary = rightBoundary;
    this.topBoundary = topBoundary;
    this.bottomBoundary = bottomBoundary;      
    this.playerScore = 0;
    this.computerScore = 0;
}

Ball.prototype.render = function (context) {
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
    
    //the ball left the court
    if (ball.x < (leftPaddle.x - 150)) {
        var computerScoredEvent = new CustomEvent('ball-out', { 'detail': 'computer-scored' });
        document.dispatchEvent(computerScoredEvent);
    }
    if (ball.x > (rightPaddle.x + 150)) {
        var playerScoredEvent = new CustomEvent('ball-out', { 'detail': 'player-scored' });
        document.dispatchEvent(playerScoredEvent);
    }
};

Ball.prototype.reset = function (startX,startY) {
    this.x = startX;
    this.y = startY;
    this.speedX = this.getRandomInt(-3,2);
    this.speedY = this.getRandomInt(2,3);
};

Ball.prototype.getRandomInt = function (min, max) {
    var setting = Math.floor(Math.random() * (max - min + 1)) + min;
    if (setting == 0) {
        setting = 2;
    }
    
    return setting;
};

