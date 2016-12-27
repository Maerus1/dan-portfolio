$(function(){
  var userList = $(".userList");
  var counter = 0;
  var searchUser = $("#searchUser");
  var addUser = $("#addUser");
  var removeUser = $("#removeUser");

  //create list of users array for future population of the webpage
  var users = ["esl_sc2", "ogamingsc2", "cretetion", "freecodecamp", "storbeck", "habathcx", "robotcaleb", "noobs2ninjas"];

  function recall(){
    //inital setup of the main container
    userList.html(
      "<div class=\"row text-center\">"
    );
    for(var i in users){
      (function(i){
        $.getJSON("https://wind-bow.gomix.me/twitch-api/users/" + users[i], function(obj){

          if(obj.logo !== null){
            userList.append(
              "<div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-4\">" +
              "<a href=\"https://www.twitch.tv/" + obj.name + "\" target=\"_blank\">" +
              "<img class=\"img-responsive img-circle center-block\" src=\"" + obj.logo + "\" alt=\"User's logo\">" +
              "<p>" + obj.name + "</p></a>" +
              "</div>"
            );
          }
          else{
             userList.append(
               "<div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-4\">" +
               "<a href=\"https://www.twitch.tv/" + obj.name + "\" target=\"_blank\">" +
               "<img class=\"img-responsive img-circle center-block\" src=\"../images/broken_image.png\" alt=\"User's logo\">" +
               "<p>" + obj.name + "</p></a>" +
               "</div>"
             );
          }

          if(counter == 3){
            userList.append(
              "</div><br>" +
              "<div class=\"row text-center\">"
            );
            counter = 0;
          }
          console.log(obj);
        });
        counter++;
      })(i);
    }
  }

  //add searching functionality
  $(searchUser).keyup(function(){
    if($(this).val() !== ""){
      $("p:not(:contains(" + $(this).val() + "))").closest("div").hide();
    }
    else {
      $("p").closest("div").show()
    }
  });

  //add a user
  $(addUser).keypress(function(){
    if(event.which === 13){
      users.push(addUser.val().toLowerCase());
      console.log(users);
      addUser.val("");
      //make a call to the twitch api
      recall();
    }
  });
  //initial call to the twitch API
  recall();
});
