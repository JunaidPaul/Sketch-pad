var Square = function(x, y, a, b, colour, thick){
  this.c=document.getElementById("myCanvas");
  this.ctx=this.c.getContext("2d");
  this.ctx.beginPath();
  if (Math.abs(a-x) > Math.abs(b-y)){
         var w=a-x;
         var h=Math.abs(a-x)*(Math.sign(b-y));
       }
       else {
         var w=Math.abs(b-y)*(Math.sign(a-x));
         var h=b-y;
       }
       this.ctx.rect(x,y,w,h);
       this.ctx.strokeStyle=colour;
       this.ctx.lineWidth=thick;
};

Square.prototype.draw = function(ctx) {
  this.ctx.stroke();
}
