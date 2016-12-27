$(function(){

  //create list of users array for future population of the webpage
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  for(var i in users){
    (function(i){
      $.getJSON("https://wind-bow.gomix.me/twitch-api/users/" + users[i], function(obj){
        console.log(obj);
      });
    })(i);
  }
});
