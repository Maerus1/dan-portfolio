$(function(){
  var button = $(".button");
  var quote = $(".quote");
  function recall(){
    $.ajax({
      cache: false,
      type: 'GET',
      url: "https://api.icndb.com/jokes/random?limitTo=[nerdy]",
      //url: "http://quotes.rest/qod.json?category=inspire",
      success: function(a){
        quote.html(a.value.joke);
        console.log(a);
      },
      error: function(){
        console.log("Error, put 404 here!")
      }
    });
  }

  button.click(function(){
    location.reload();
  });
  recall();
});
