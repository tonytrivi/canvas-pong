function Paddle(x, y) {
    this.x = x;
    this.y = y;
    this.width = 4;
    this.height = 35;
}
Paddle.prototype.render = function (context) {
    context.strokeStyle = 'pink';
    context.setLineDash([0,0]);
    context.strokeRect(this.x, this.y, this.width, this.height);
};