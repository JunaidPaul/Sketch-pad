var buttonpress = function(type){

  mode = type;
  $(':button').removeClass('btn-default');
  $(':button').addClass('btn-primary');

  if (mode == 'draw') type=drawtype;

  $('#'+type).removeClass('btn-primary');
  $('#'+type).addClass('btn-default');
  return;

}
