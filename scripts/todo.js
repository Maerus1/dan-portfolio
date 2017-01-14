//object for local storage
var items;

if(localStorage.getItem("tasks") !== null){
  items = JSON.parse(localStorage.getItem("tasks"));

}
else{
  items = {
    "titles": [],
    "times": []
  };
}
//functionality for dragging and dropping elements
function drag(ev){
  ev.dataTransfer.setData("text", ev.target.id);
}

function droppable(ev){
  ev.preventDefault();
}

function drop(ev){
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function deleted(ev){
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var elem = document.getElementById(data);
  var values = elem.childNodes;
  var timeText = values[1].innerHTML;
  timeText = timeText.replace("Target Time: ", "");

  //remove element from array here
  items["titles"].splice(items["titles"].indexOf(values[0].innerHTML), 1);
  items["times"].splice(items["times"].indexOf(timeText), 1);

  elem.parentNode.removeChild(elem);
  localStorage.setItem("tasks", JSON.stringify(items));
  console.log(items);
}

$(function(){
  var name = $("#name");
  var level = $("#level");
  var image = $("#image");
  var tasks = $("#tasks");
  var title = $("#title");
  var deadline = $("#deadline");
  var addItem = $("#addItem");
  var utcSeconds = 0;
  //for correct dropping, each div needs a unique number
  var counter = 1;


  for(var i = 0; i < items["titles"].length; i++){
    console.log(items);
    tasks.append(
      "<div draggable=\"true\" id=\"drag" + counter++ + "\" ondragstart=\"drag(event)\" style=\"background-color: #16213E;border-radius: 10px;border: 1px solid #444D65;\">" +
      "<p>" + items["titles"][i] + "</p>" +
      "<p>Target Time: " + items["times"][i] + "</p>" +
      "</div>"
    );
  }

  //add a button press event here!
  addItem.click(function(){
    if(title.val() !== "" && deadline.val() !== ""){
      console.log(counter);
      tasks.append(
        "<div draggable=\"true\" id=\"drag" + counter++ + "\" ondragstart=\"drag(event)\" style=\"background-color: #16213E;border-radius: 10px;border: 1px solid #444D65;\">" +
        "<p>" + title.val() + "</p>" +
        "<p>Target Time: " + deadline.val() + "</p>" +
        "</div>"
      );
      items["titles"].push(title.val());
      items["times"].push(deadline.val());
      title.val("");
      deadline.val("");
      console.log(items);
      localStorage.setItem("tasks", JSON.stringify(items));
    }
  });
});
