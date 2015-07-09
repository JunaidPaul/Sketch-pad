var Circle = function(x, y, a, b, colour, thick){
  this.c=document.getElementById("myCanvas");
  this.ctx=this.c.getContext("2d");
  this.ctx.beginPath();
  var r = Math.sqrt((a-x)*(a-x) +  (b-y)*(b-y));
  this.ctx.arc(x,y,r,0,2*Math.PI);
  this.ctx.strokeStyle=colour;
  this.ctx.lineWidth=thick;
};

Circle.prototype.draw = function(ctx) {
  this.ctx.stroke();
}
