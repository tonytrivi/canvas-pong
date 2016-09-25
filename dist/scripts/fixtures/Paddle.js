function Paddle(x, y) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 35;
    this.speed = 2;
}
Paddle.prototype.render = function () {
    context.fillStyle = 'pink';
    context.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.move = function (direction) {
    if (direction == "up") {
        this.y -= this.speed;
    }
    
    if (direction == "down") {
        this.y += this.speed;
    }
};