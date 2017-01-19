$(function(){
  var userList = $(".userList");
  var counter = 0;
  var searchUser = $(".searchUser");
  var addUser = $(".addUser");
  var removeUser = $(".removeUser");

  //create list of users array for future population of the webpage
  var users;
  if(localStorage.getItem("userData") === null){
      users = ["esl_sc2"];
  }
  else{
    users = JSON.parse(localStorage.getItem("userData"));
  }
  function recall(){
    //inital setup of the main container
    userList.html(
      "<div class=\"row text-center\">"
    );
    counter = 0;
    //add saving functionality
    localStorage.setItem("userData", JSON.stringify(users));
    console.log(users);
    for(var i in users){
      (function(i){
        $.getJSON("https://wind-bow.gomix.me/twitch-api/users/" + users[i], function(obj){
          if(obj.name == undefined){
            return;
          }
          counter++;
          if(obj.logo !== null){
            userList.append(
              "<div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-4 streamer\">" +
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
               "<img class=\"img-responsive img-circle center-block\" src=\"../images/broken_image.png\" width=\"300px\" alt=\"User's logo\">" +
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
      })(i);
    }
  }

  //add searching functionality
  $(searchUser).keyup(function(){
    if($(this).val() !== ""){
      $("p:not(:contains(" + $(this).val().toLowerCase() + "))").closest("div").hide();
    }
    else {
      $("p").closest("div").show()
    }
  });

  //add a user
  $(addUser).keypress(function(){
    if(event.which === 13){
      if(!(users.includes(addUser.val().toLowerCase()))){
        users.push(addUser.val().toLowerCase());
        //make a call to the twitch api
        recall();
      }
      addUser.val("");
    }
  });

  //remove a user
  $(removeUser).keypress(function(){
    if(event.which === 13){
      if(users.includes(removeUser.val().toLowerCase())){
        for(var i = 0; i < users.length; i++){
          if(users[i] == (removeUser.val()).toLowerCase()){
            users.splice(i, 1);
          }
        }
        //make a call to the twitch api
        recall();
      }
      removeUser.val("");
    }
  });
  //initial call to the twitch API
  recall();
});
