var redraw = function(){
  clearCanvas();
  for(var i=0;i<shapes.length; i++){
    switch (shapes[i].type) {
      case 'line':
          var x = shapes[i].constructor[0][0];
          var y = shapes[i].constructor[0][1];
          var a = shapes[i].constructor[1][0];
          var b = shapes[i].constructor[1][1];
          var line = new Line(x,y,a,b,shapes[i].colour,shapes[i].thick);
          line.draw();
          break;
      case 'rectangle':
          var x = shapes[i].constructor[0][0];
          var y = shapes[i].constructor[0][1];
          var a = shapes[i].constructor[1][0];
          var b = shapes[i].constructor[1][1];
          var rectangle = new Rectangle(x,y,a,b,shapes[i].colour,shapes[i].thick);
          rectangle.draw();
          break;
      case 'circle':
          var x = shapes[i].constructor[0][0];
          var y = shapes[i].constructor[0][1];
          var a = shapes[i].constructor[1][0];
          var b = shapes[i].constructor[1][1];
          var circle = new Circle(x,y,a,b,shapes[i].colour,shapes[i].thick);
          circle.draw();
          break;
      case 'square':
          var x = shapes[i].constructor[0][0];
          var y = shapes[i].constructor[0][1];
          var a = shapes[i].constructor[1][0];
          var b = shapes[i].constructor[1][1];
          var square = new Square(x,y,a,b,shapes[i].colour,shapes[i].thick);
          square.draw();
          break;
      case 'ellipse':
          var x = shapes[i].constructor[0][0];
          var y = shapes[i].constructor[0][1];
          var a = shapes[i].constructor[1][0];
          var b = shapes[i].constructor[1][1];
          var ellipse = new Ellipse(x,y,a,b,shapes[i].colour,shapes[i].thick);
          ellipse.draw();
          break;
      case 'squiggle':
          var squiggle = new Squiggle(shapes[i].constructor,shapes[i].colour,shapes[i].thick);
          squiggle.draw();
          break;
      case 'polygon':
          var polygon = new Polygon(shapes[i].constructor,shapes[i].colour,shapes[i].thick,'false');
          polygon.draw();
          break;
      case 'closedpolygon':
          var polygon = new Polygon(shapes[i].constructor,shapes[i].colour,shapes[i].thick,'true');
          polygon.draw();
          break;
      default:

    }

  }
}
