$(function(){
  var content = $(".content");
  var counter = 0;
  //create list of users array for future population of the webpage
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  //inital setup of the main container
  content.append(
    "<div class=\"row text-left \">"
  );

  for(var i in users){
    (function(i){
      $.getJSON("https://wind-bow.gomix.me/twitch-api/users/" + users[i], function(obj){
        content.append(
          "<div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-4\">" +
          "<a href=\"https://www.twitch.tv/" + obj.name + "\" target=\"_blank\">" +
          "<img class=\"img-responsive img-circle\" src=\"" + obj.logo + "\" alt=\"User's logo\">" +
          "</a>" +
          "</div>"
        );
        if(counter == 3){
          content.append(
            "</div><br>" +
            "<div class=\"row\">"
          );
          counter = 0;
        }
        console.log(obj);
      });
      counter++;
    })(i);
  }
});
