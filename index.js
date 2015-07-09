//Globals
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

//Global Variables
var mode = '';
var shapes =  [];
var index = 0;
var mousedown = false;
var linecolour = '#000000';
var linethick='1';
var drawtype='';
var cmndi = -1; //command history index
var redoi = -1; //redo history index
var cmndhist = []; //command history
var redohist = []; //redo history
var myclipboard=false;

// Disables rightclick on the canvas
$('body').on('contextmenu','#myCanvas',function(e){return false;});


//Clear functions
var clearCanvas = function(){
  context.clearRect(0, 0, 1000, 1000);
}
var clearAll = function(){
 context.clearRect(0, 0, 1000, 1000);
 shapes=[];
 index=0;
 cmndhist = [];
 cmndi = -1;
 redoi = -1;
 redohist = [];

}

//Keyboard events
function KeyPress(key) {
      var evtobj = window.event? event : key
      if (evtobj.keyCode == 90 && evtobj.ctrlKey && !(evtobj.shiftKey)) undo(); //CTRl+Z
      else if ((evtobj.keyCode == 90 && evtobj.ctrlKey && evtobj.shiftKey)||(evtobj.keyCode==89 && evtobj.ctrlKey)) redo(); //CTRL+SHIFT+Z or CTRL+Y
}

document.onkeydown = KeyPress;

//Mouse events
var canvasMousedown = function(event){
  if(event.button == 0){
    mousedown = true;
    mx = event.offsetX;
    my = event.offsetY;

    switch (mode) {
      case 'draw':
      shapes.push({
        'type': drawtype,
        'constructor': [],
        'selection': [],
        'colour': linecolour,
        'thick': linethick

        });
        shapes[index].constructor.push ([mx,my]);
        shapes[index].constructor.push ([mx,my]);


          switch (drawtype)
          {
            case 'line':
              var line = new Line(mx,my,mx,my, linecolour, linethick);
              break;
            case 'rectangle':
              var rectangle = new Rectangle(mx,my,mx,my, linecolour, linethick);
              break;
            case 'circle':
              var circle = new Circle(mx,my,mx,my, linecolour, linethick);
              break;
            case 'square':
              var square = new Square(mx,my,mx,my, linecolour, linethick);
              break;
            case 'ellipse':
              var ellipse = new Ellipse(mx,my,mx,my, linecolour, linethick);
              break;
            case 'squiggle':
              shapes[index].selection.push ([mx,my]);
              var squiggle = new Squiggle(shapes[index].constructor, linecolour, linethick);
              break;
            case 'polygon':
              var polygon = new Polygon(shapes[index].constructor, linecolour, linethick,'false');
              break;
            case 'closedpolygon':
              var polygon = new Polygon(shapes[index].constructor, linecolour, linethick,'true');
              break;

        }
        cmndhist.push({'cmnd':'drw'});
        cominc();
      break;
      case 'move':
          indexSelected = selection(mx, my);
          shapes[indexSelected].thick++;
          cmndhist.push({
            'cmnd':'mov',
            'x': 0,
            'y': 0,
            'id': indexSelected
          });
          cominc();
          break;
      case 'copy':
          copy();
          break;
      case 'delet':
          delet();
          break;
      case 'cut':
          copy();
          delet();
          break;
      default:
          break;

    }
  }
  else{
    if (drawtype=='polygon'||drawtype=='closedpolygon') {
      shapes[index].constructor.push([mx,my]);
      shapes[index].selection.push([mx,my]);
    }
  }


}
var canvasMousemove = function(event){

  var a;
  var b;

  if(mousedown == true){
    a = event.offsetX;
    b = event.offsetY;

    switch(mode){
      case 'draw':

        switch (drawtype){
          case 'line':
          case 'rectangle':
          case 'square':
          case 'polygon':
          case 'closedpolygon':
          case 'circle':
          case 'ellipse':
            shapes[index].constructor.pop();
            shapes[index].constructor.push ([a, b]);
          break;
          case 'squiggle':
            shapes[index].constructor.push ([a, b]);
            shapes[index].selection.push ([a, b]);
          break;
        }
        redraw();
      break;

      case 'move':

        var distx = a-mx;
        var disty = b-my;

        for(var i=0;i<shapes[indexSelected].constructor.length;i++){

          shapes[indexSelected].constructor[i][0] = shapes[indexSelected].constructor[i][0] + distx;
          shapes[indexSelected].constructor[i][1] = shapes[indexSelected].constructor[i][1] + disty;
        }
        for(var i=0;i<shapes[indexSelected].selection.length;i++){
          shapes[indexSelected].selection[i][0] = shapes[indexSelected].selection[i][0] + distx;
          shapes[indexSelected].selection[i][1] = shapes[indexSelected].selection[i][1] + disty;
        }

        mx = a;
        my = b;

        cmndhist[cmndi].x=cmndhist[cmndi].x+distx;
        cmndhist[cmndi].y=cmndhist[cmndi].y+disty;
        redraw();

        break;


      default:
        break;
    }


  }

}

var canvasMouseup = function(event){
if(event.button == 0){
  mousedown = false;
  switch (mode) {
    case 'draw':
      switch(drawtype){
        case 'line':
          var midx = (shapes[index].constructor[0][0] +shapes[index].constructor[1][0])/2;
          var midy = (shapes[index].constructor[0][1] +shapes[index].constructor[1][1])/2;
          var xy = [shapes[index].constructor[0][0],shapes[index].constructor[0][1]];
          var ab = [shapes[index].constructor[1][0],shapes[index].constructor[1][1]];
          shapes[index].selection.push(xy,ab,[midx,midy]);
          break;
        case 'rectangle':
            var cornerx = [shapes[index].constructor[1][0], shapes[index].constructor[0][1]];
            var cornery = [shapes[index].constructor[0][0], shapes[index].constructor[1][1]];
            var midxy_cornerx = [(shapes[index].constructor[0][0]+shapes[index].constructor[1][0])/2,  shapes[index].constructor[0][1]];
            var midxy_cornery = [shapes[index].constructor[0][0] , (shapes[index].constructor[0][1] +shapes[index].constructor[1][1])/2];
            var midab_cornerx = [shapes[index].constructor[1][0],(shapes[index].constructor[0][1] +shapes[index].constructor[1][1])/2];
            var midab_cornery = [(shapes[index].constructor[0][0] +shapes[index].constructor[1][0])/2,shapes[index].constructor[1][1]];
            var xy = [shapes[index].constructor[0][0],shapes[index].constructor[0][1]];
            var ab = [shapes[index].constructor[1][0],shapes[index].constructor[1][1]];
            shapes[index].selection.push(xy,ab,cornerx, cornery, midxy_cornerx, midxy_cornery, midab_cornerx, midab_cornery);
            break;
        case 'square':
            if (Math.abs(shapes[index].constructor[1][0]-shapes[index].constructor[0][0]) > Math.abs(shapes[index].constructor[1][1]-shapes[index].constructor[0][1])){
               var w=shapes[index].constructor[1][0]-shapes[index].constructor[0][0];
               var h=Math.abs(shapes[index].constructor[1][0]-shapes[index].constructor[0][0])*(Math.sign(shapes[index].constructor[1][1]-shapes[index].constructor[0][1]));
             }
             else {
               var w=Math.abs(shapes[index].constructor[1][1]-shapes[index].constructor[0][1])*(Math.sign(shapes[index].constructor[1][0]-shapes[index].constructor[0][0]));
               var h=shapes[index].constructor[1][1]-shapes[index].constructor[0][1];
             }
            var cornerx = [shapes[index].constructor[0][0]+w, shapes[index].constructor[0][1]];
            var cornery = [shapes[index].constructor[0][0], shapes[index].constructor[0][1]+h];
            var midxy_cornerx = [(shapes[index].constructor[0][0]+shapes[index].constructor[0][0]+w)/2,  shapes[index].constructor[0][1]];
            var midxy_cornery = [shapes[index].constructor[0][0] , (shapes[index].constructor[0][1] +shapes[index].constructor[0][1]+h)/2];
            var midab_cornerx = [shapes[index].constructor[0][0]+w,(shapes[index].constructor[0][1] +shapes[index].constructor[0][1]+h)/2];
            var midab_cornery = [(shapes[index].constructor[0][0] +shapes[index].constructor[0][0]+w)/2,shapes[index].constructor[0][1]+h];
            var xy = [shapes[index].constructor[0][0],shapes[index].constructor[0][1]];
            var ab = [shapes[index].constructor[0][0]+w,shapes[index].constructor[0][1]+h];
            shapes[index].selection.push(xy,ab,cornerx, cornery, midxy_cornerx, midxy_cornery, midab_cornerx, midab_cornery);
            break;
        case 'ellipse':
            var midxy_cornerx = [(shapes[index].constructor[0][0]+shapes[index].constructor[1][0])/2,  shapes[index].constructor[0][1]];
            var midxy_cornery = [shapes[index].constructor[0][0] , (shapes[index].constructor[0][1] +shapes[index].constructor[1][1])/2];
            var midab_cornerx = [shapes[index].constructor[1][0],(shapes[index].constructor[0][1] +shapes[index].constructor[1][1])/2];
            var midab_cornery = [(shapes[index].constructor[0][0] +shapes[index].constructor[1][0])/2,shapes[index].constructor[1][1]];
            shapes[index].selection.push(midxy_cornerx, midxy_cornery, midab_cornerx, midab_cornery);
            break;
        case 'circle':
            var r = Math.sqrt((shapes[index].constructor[1][0]-shapes[index].constructor[0][0])*(shapes[index].constructor[1][0]-shapes[index].constructor[0][0]) +  (shapes[index].constructor[1][1]-shapes[index].constructor[0][1])*(shapes[index].constructor[1][1]-shapes[index].constructor[0][1]));
            var top = [shapes[index].constructor[0][0],shapes[index].constructor[0][1]+r];
            var bottom = [shapes[index].constructor[0][0],shapes[index].constructor[0][1]-r];
            var left = [shapes[index].constructor[0][0]-r,shapes[index].constructor[0][1]];
            var right = [shapes[index].constructor[0][0]+r,shapes[index].constructor[0][1]];
            shapes[index].selection.push(top,bottom,left,right);
            break;
        case 'polygon':
            var constructorlength = shapes[index].constructor.length;
            for (i=1; i<constructorlength;i++){
              var midx = (shapes[index].constructor[i-1][0] +shapes[index].constructor[i][0])/2;
              var midy = (shapes[index].constructor[i-1][1] +shapes[index].constructor[i][1])/2;
              var xy = [shapes[index].constructor[i-1][0],shapes[index].constructor[i-1][1]];
              shapes[index].selection.push(xy,[midx,midy]);
             }
             shapes[index].selection.push([shapes[index].constructor[constructorlength-1][0],shapes[index].constructor[constructorlength-1][1]]);
             break;
        case 'closedpolygon':
            var constructorlength = shapes[index].constructor.length;
            for (i=1; i<constructorlength;i++){
              var midx = (shapes[index].constructor[i-1][0] +shapes[index].constructor[i][0])/2;
              var midy = (shapes[index].constructor[i-1][1] +shapes[index].constructor[i][1])/2;
              var xy = [shapes[index].constructor[i-1][0],shapes[index].constructor[i-1][1]];
              shapes[index].selection.push(xy,[midx,midy]);
             }
             var midx = (shapes[index].constructor[constructorlength-1][0] +shapes[index].constructor[0][0])/2;
             var midy = (shapes[index].constructor[constructorlength-1][1] +shapes[index].constructor[0][1])/2;
             shapes[index].selection.push([shapes[index].constructor[constructorlength-1][0],shapes[index].constructor[constructorlength-1][1]],[midx,midy]);
             break;

      }
      index = index+1;
      break;
    case 'move':
    case 'copy':
      shapes[indexSelected].thick--;
      redraw();
    break;
    default:
     break;

  }
}
}
