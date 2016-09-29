function Ball() {  
    this.height = 1;
    this.width = 1;
    this.x = 85;
    this.y = 145;
    this.speedX = 1;
    this.speedY = 1;
            
}
Ball.prototype.render = function (context) {
    context.strokeStyle = 'blue';
    context.setLineDash([0,0]);
    context.strokeRect(this.x, this.y, this.height, this.width);
};

Ball.prototype.move = function () {
    this.x += this.speedX;
    this.y += this.speedY;
};


