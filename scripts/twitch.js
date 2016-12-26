$(function(){

  function recall(){
    $.ajax({
      cache: false,
      type: 'GET',
      url: "https://wind-bow.gomix.me/twitch-api/users/",
      success: function(a){
        console.log(a);
      },
      error: function(){
        console.log("Error");
      }
    });
  }

  recall();
});
