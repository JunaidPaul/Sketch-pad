var copy = function(){
  indexSelected = selection(mx, my);
  myclipboard = JSON.parse(JSON.stringify(shapes[indexSelected]));
  shapes[indexSelected].thick++;
  redraw();
}
