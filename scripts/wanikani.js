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

  $.getJSON("https://www.wanikani.com/api/user/70ae2325dad1f0eb84324d57ace46c7a/study-queue?callback=?", function(obj){
    console.log(obj);

    //if the user exists, then retreive the info
    if(obj.user_information !== undefined){
      $.getJSON("https://www.gravatar.com/" + obj.user_information.gravatar + ".json?callback=?", function(obj){
        console.log(obj);
        image.attr("src", obj.entry[0].photos[0].value);
      });
      name.html(obj.user_information.username);
      level.append(obj.user_information.level);

      //find the next review date
      var d = new Date(0);
      d.setUTCSeconds(obj.requested_information.next_review_date);
      //add the wanikani default task
      //ALSO ADD IF STATEMENT HERE TO MAKE SURE ONLY DAILY TASKS ARE ADDED
      tasks.append(
        "<div draggable=\"true\" id=\"drag" + counter++ + "\" ondragstart=\"drag(event)\" style=\"background-color: #16213E;border-radius: 10px;border: 1px solid #444D65;\">" +
        "<p>Wanikani Review</p>" +
        "<p>Target Time: " + d.toLocaleTimeString() + "</p>" +
        "</div>"
      );
    }
    //if not, use placeholder values
    else{
      name.html(obj.error.message);
    }

  }).fail(function(obj){
    console.log("You have encountered an invalid host");
  });
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
      title.val("");
      deadline.val("");
    }
  });
});
