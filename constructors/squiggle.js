var Squiggle = function(constructor, colour, thick){
  this.c=document.getElementById("myCanvas");
  this.ctx=this.c.getContext("2d");
  this.ctx.beginPath();
  this.ctx.strokeStyle=colour;
  this.ctx.lineWidth=thick;
  for (i=1; i<(constructor.length);i++){
       this.ctx.moveTo(constructor[i-1][0],constructor[i-1][1]);
       this.ctx.lineTo(constructor[i][0],constructor[i][1]);
     }
};

Squiggle.prototype.draw = function(ctx) {
  this.ctx.stroke();
}
