// Line constructor
var Rectangle = function(x, y, a, b, colour, thick){
  this.c=document.getElementById("myCanvas");
  this.ctx=this.c.getContext("2d");
  this.ctx.beginPath();
  this.ctx.rect(x,y,a-x,b-y);
  this.ctx.strokeStyle=colour;
  this.ctx.lineWidth=thick;
};

Rectangle.prototype.draw = function(ctx) {
  this.ctx.stroke();
}
