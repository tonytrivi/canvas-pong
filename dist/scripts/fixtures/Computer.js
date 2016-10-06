function Computer() {
    this.paddle = new Paddle(530, 110);
    this.paddle.speed = 1.5;
}

Computer.prototype.render = function (context) {
    this.paddle.render(context);
};

Computer.prototype.update = function (ball) {
    //change computer position
    if ((ball.y > (this.paddle.y + 16)) && (ball.x > leftBoundary && ball.x < rightBoundary)) {
        this.paddle.move("down");
    }
    if ((ball.y < (this.paddle.y + 16)) && (ball.x > leftBoundary && ball.x < rightBoundary)) {
        this.paddle.move("up");
    }
};
