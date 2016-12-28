$(function(){
  var name = $("#name");
  var level = $("#level");
  var image = $("#image");
/*
  $.getJSON("https://www.wanikani.com/api/user/70ae2325dad1f0eb84324d57ace46c7a/recent-unlocks/5?callback=?", function(obj){
    console.log(obj);

    //if the user exists, then retreive the info
    if(obj.user_information !== undefined){
      $.getJSON("https://www.gravatar.com/" + obj.user_information.gravatar + ".json?callback=?", function(obj){
        console.log(obj);
        image.attr("src", obj.entry[0].photos[0].value);
      });
      name.html(obj.user_information.username);
      level.append(obj.user_information.level);
    }
    //if not, use placeholder values
    else{
      name.html(obj.error.message);
    }

  }).fail(function(obj){
    console.log("You have encountered an invalid host");
  });
  */
  $.getJSON("json/kanji.json", function(obj){
    console.log(obj);
  })
});
