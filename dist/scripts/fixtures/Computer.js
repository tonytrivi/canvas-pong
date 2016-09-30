function Computer() {
    this.paddle = new Paddle(530, 110);
}
Computer.prototype.render = function (context) {
    this.paddle.render(context);
};
