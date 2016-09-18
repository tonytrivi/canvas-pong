function Ball() {  
            this.height = 1;
            this.width = 1;
}

Ball.prototype.render = function (context) {
    context.strokeStyle = 'blue';
    context.setLineDash([0,0]);
    context.strokeRect(65, 65, this.height, this.width);
};


