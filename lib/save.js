
var saveTextAsFile = function(){
  shapes.push(document.getElementById('myCanvas').style.background);
  var shapesToWrite = JSON.stringify(shapes);
  shapes.pop();
  var shapesFileAsBlob = new Blob([shapesToWrite], {type:'text/plain'});
  var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;

  var downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null)
  {
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(shapesFileAsBlob);
  }
  else
  {
    // Firefox requires the link to be added to the DOM
    // before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(shapesFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }

  downloadLink.click();

}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}


function loadFileAsText()
{
	var fileToLoad = document.getElementById("fileToLoad").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent)
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		shapes = JSON.parse(textFromFileLoaded);
    document.getElementById('myCanvas').style.background = shapes[shapes.length-1];
    shapes.pop();
    index=shapes.length;
    redraw();
	};
	fileReader.readAsText(fileToLoad, "UTF-8");


}
