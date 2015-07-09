var delet = function(){
  indexSelected = selection(mx, my);
  cmndhist.push({
    'cmnd':'dlt',
    'shape':shapes[indexSelected]
  });
  cominc();
  shapes.splice(indexSelected,1);
  index--;
  redraw();
  return;
}
