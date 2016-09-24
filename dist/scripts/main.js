/*
**desc renders an object
**returns void
*/
var render = function (context, obj) {
    obj.render(context);
};

/*
**desc lays out the court and playing elements
**returns void
*/
var drawCourt = function() {
    //draw table outline
    var canvas = document.getElementById('pong-table');
    var context = canvas.getContext('2d');

    var tableWidth = 525;
    var tableHeight = 330;
    var tableBorderWidth = 10;
    var defaultLineColor = 'orange';

    context.strokeStyle = defaultLineColor;
    context.lineWidth = tableBorderWidth;
    context.strokeRect(35, 35, tableWidth, tableHeight);

    //mid line
    context.setLineDash([8, 12]);

    context.beginPath();
    context.moveTo(300,35);
    context.lineTo(300, 355);
    context.stroke();

    //ball and players
    var ball = new Ball();
    var player1 = new Player();
    var comp = new Computer();

    render(context, ball);
    render(context, player1);
    render(context, comp);
    
};