$(function(){
  var content = $(".content");
  //create list of users array for future population of the webpage
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  for(var i in users){
    (function(i){
      $.getJSON("https://wind-bow.gomix.me/twitch-api/users/" + users[i], function(obj){
        content.append(
          "<div class=\"row text-left\">" +
          "<img src=\"" + obj.logo + "\" alt=\"User's logo\" width=\"75\" height=\"75\" style=\"border-radius:50%\">" +
          "<a href=\"https://www.twitch.tv/" + obj.name + "\" target=\"_blank\">" + obj.display_name + "</a>" +
          "</div><br>"
        );
        console.log(obj);
      });
    })(i);
  }
});
