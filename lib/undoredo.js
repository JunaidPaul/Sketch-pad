
//UNDO FUNCTION
var undo = function(){
  if (cmndi > -1){
    //Undo draws, pastes, and any shape creation type event that added a new shape to end of shape index
    if (cmndhist[cmndi].cmnd == 'drw'){
      redohist.push({
        'cmnd':'drw',
        'shape':shapes[index-1]
      });
      shapes.pop();
      index--;
      redraw();
    }
    //Undo move events
    else if (cmndhist[cmndi].cmnd == 'mov'){
      redohist.push(cmndhist[cmndi]);
      for(var i=0;i<shapes[cmndhist[cmndi].id].constructor.length;i++){

        shapes[cmndhist[cmndi].id].constructor[i][0] = shapes[cmndhist[cmndi].id].constructor[i][0] - cmndhist[cmndi].x;
        shapes[cmndhist[cmndi].id].constructor[i][1] = shapes[cmndhist[cmndi].id].constructor[i][1] - cmndhist[cmndi].y;
      }
      for(var i=0;i<shapes[cmndhist[cmndi].id].selection.length;i++){
        shapes[cmndhist[cmndi].id].selection[i][0] = shapes[cmndhist[cmndi].id].selection[i][0] - cmndhist[cmndi].x;
        shapes[cmndhist[cmndi].id].selection[i][1] = shapes[cmndhist[cmndi].id].selection[i][1] - cmndhist[cmndi].y;
      }

      redraw();
    }

    //Undo a selected object delete
    else if (cmndhist[cmndi].cmnd == 'dlt'){
      shapes.push(cmndhist[cmndi].shape);
      index++;
      redraw();
      cmndhist.push({'cmnd':'drw'}); //Since undoing a delete is basically drawing a new object, this nullifies needing a redo delete
    }
    else{ //if there is no command history, or there is an error in the command history, leave this function immediately
      return;
    }
    cmndhist.pop();
    cmndi--;
    redoi++;

  }

}

//REDO FUNCTION
var redo = function(){
  if (redoi>-1){
    //Redo a draw type event that was undone
    if (redohist[redoi].cmnd == 'drw'){
      shapes.push(redohist[redoi].shape);
      index++;
      redraw();
      cmndhist.push({'cmnd':'drw'});
    }
    //Redo a move event that was undone
    else if (redohist[redoi].cmnd == 'mov'){
      for(var i=0;i<shapes[redohist[redoi].id].constructor.length;i++){

        shapes[redohist[redoi].id].constructor[i][0] = shapes[redohist[redoi].id].constructor[i][0] + redohist[redoi].x;
        shapes[redohist[redoi].id].constructor[i][1] = shapes[redohist[redoi].id].constructor[i][1] + redohist[redoi].y;
      }
      for(var i=0;i<shapes[redohist[redoi].id].selection.length;i++){
        shapes[redohist[redoi].id].selection[i][0] = shapes[redohist[redoi].id].selection[i][0] + redohist[redoi].x;
        shapes[redohist[redoi].id].selection[i][1] = shapes[redohist[redoi].id].selection[i][1] + redohist[redoi].y;
      }

      redraw();
      cmndhist.push(redohist[redoi]);
    }
    else{ //if there is no redo history, or there is an error in the redo history, leave this function immediately
      return;
    }
    redohist.pop();
    redoi--;
    cmndi++;
  }
}

var cominc = function (){
  cmndi++;
  redohist = []; //if we have done anything aside from undoing, the redo history should be deleted
  redoi = -1;
}
