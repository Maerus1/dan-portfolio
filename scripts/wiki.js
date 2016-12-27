$(function(){

var content = $(".content");

  function recall(){
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&titles=Switchfoot&formatversion=2&piprop=original&callback=?", function(obj){
      console.log(obj);
      content.append(
        "<img class=\"img-responsive center-block\" src=\"" + obj.query.pages[0].thumbnail.original + "\" width=\"200\">"
      );
    });
    }

  recall();
});
