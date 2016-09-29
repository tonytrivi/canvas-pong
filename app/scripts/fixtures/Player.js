function Player() {
    this.paddle = new Paddle(55, 115);
}
Player.prototype.render = function (context) {
    this.paddle.render(context);
};