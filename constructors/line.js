// Line constructor
var Line = function(x, y, a, b, colour, thick){
  this.c=document.getElementById("myCanvas");
  this.ctx=this.c.getContext("2d");
  this.ctx.beginPath();
  this.ctx.moveTo(x,y);
  this.ctx.lineTo(a,b);
  this.ctx.strokeStyle=colour;
  this.ctx.lineWidth=thick;
};

Line.prototype.draw = function(ctx) {
  this.ctx.stroke();
}
