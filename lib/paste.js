var paste = function(){

  if(myclipboard)
  {

    for(var i=0;i<myclipboard.constructor.length;i++){
      myclipboard.constructor[i][0] = myclipboard.constructor[i][0] + 20;
      myclipboard.constructor[i][1] = myclipboard.constructor[i][1] + 20;
    }
    for(var i=0;i<myclipboard.selection.length;i++){
      myclipboard.selection[i][0] = myclipboard.selection[i][0] + 20;
      myclipboard.selection[i][1] = myclipboard.selection[i][1] + 20;
    }

    shapes.push(JSON.parse(JSON.stringify(myclipboard)));
    index++;
    cmndhist.push({'cmnd':'drw'});
    cominc();
    redraw();
  }
  return;


}
