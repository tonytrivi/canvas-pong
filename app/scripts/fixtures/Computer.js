function Computer() {
    this.paddle = new Paddle(535, 160);
}
Computer.prototype.render = function (context) {
    this.paddle.render(context);
};
