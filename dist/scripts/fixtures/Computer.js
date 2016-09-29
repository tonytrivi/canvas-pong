function Computer() {
    this.paddle = new Paddle(530, 160);
}
Computer.prototype.render = function (context) {
    this.paddle.render(context);
};
