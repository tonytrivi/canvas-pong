function Ball(startX, startY, leftBoundary, rightBoundary) {  
    this.height = 7;
    this.width = 7;
    this.x = startX;
    this.y = startY;
    this.speedX = 2;
    this.speedY = 2;
    this.leftBoundary = leftBoundary;
    this.rightBoundary = rightBoundary;
    this.topBoundary = topBoundary;
    this.bottomBoundary = bottomBoundary;
            
}
Ball.prototype.render = function (context) {
    context.fillStyle = 'blue';
    context.setLineDash([0,0]);
    context.fillRect(this.x, this.y, this.height, this.width);
    
    //create the boundaries for the ball
    if (this.x + this.speedX > this.rightBoundary  || this.x + this.speedX < this.leftBoundary) {
        this.speedX = - this.speedX;
    }
    if (this.y + this.speedY > this.bottomBoundary  || this.y + this.speedY < this.topBoundary) {
        this.speedY = - this.speedY;
    }
};

Ball.prototype.move = function () {
    this.x += this.speedX;
    this.y += this.speedY;
};


