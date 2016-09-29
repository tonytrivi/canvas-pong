function Player() {
    this.paddle = new Paddle(55, 110);
}
Player.prototype.render = function (context) {
    this.paddle.render(context);
};