
var selection = function(mx, my){

  var distance;
  var minDist = 999;
  var indexSelected;

  for(var i=0;i<shapes.length;i++){
    for(var j=0; j<shapes[i].selection.length; j++){

      var x = shapes[i].selection[j][0];
      var y = shapes[i].selection[j][1];

      distance = Math.sqrt((mx-x)*(mx-x) +  (my-y)*(my-y));

      if(distance < minDist){
        minDist = distance;
        indexSelected = i;
      }

    }
  }



  return indexSelected;
}
