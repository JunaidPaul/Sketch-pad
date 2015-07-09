var Ellipse = function(x, y, a, b, colour, thick){
  this.c=document.getElementById("myCanvas");
  this.ctx=this.c.getContext("2d");
  this.ctx.beginPath();
  var kappa = .5522848,
  x=x;
  y=y;
  ox = ((a-x) / 2) * kappa, // control point offset horizontal
  oy = ((b-y) / 2) * kappa, // control point offset vertical
  xe = x + a-x,           // x-end
  ye = y + b-y,           // y-end
  xm = x + (a-x) / 2,       // x-middle
  ym = y + (b-y) / 2;       // y-middle

  this.ctx.beginPath();
  this.ctx.moveTo(x, ym);
  this.ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  this.ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  this.ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  this.ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  this.ctx.strokeStyle=colour;
  this.ctx.lineWidth=thick;
};

Ellipse.prototype.draw = function(ctx) {
  this.ctx.stroke();
}
