$(function(){

var content = $(".content");
var search = $(".search");

  function recall(title){
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms%7Cextracts%7Cimages%7Cinfo&inprop=url&titles=" + title + "&formatversion=2&piprop=original%7Cthumbnail&pithumbsize=200&callback=?", function(obj){
      console.log(obj);
      if(obj.query.pages[0].thumbnail === undefined || obj.query.pages[0].terms === undefined){
        content.html(
          "<div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-4\"></div>" +
          "<div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-4 well article\">" +
          "<a href=\"" + obj.query.pages[0].canonicalurl + "\" target=\"_blank\">" +
          "<img src=\"../images/broken_image.png\" class=\"img-responsive center-block\" width=\"200\">" +
          "<p>" + obj.query.pages[0].title + "</p>" +
          "</div>" +
          "<div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-4\"></div>"
        );
      }
      else{
        content.html(
          "<div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-4\"></div>" +
          "<div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-4 well article\">" +
          "<a href=\"" + obj.query.pages[0].canonicalurl + "\" target=\"_blank\">" +
          "<img src=\"" + obj.query.pages[0].thumbnail.source + "\" class=\"img-responsive center-block\" width=\"200\">" +
          "<p>" + obj.query.pages[0].title + "</p>" +
          "<p>" + obj.query.pages[0].terms.description + "</p></a>" +
          "</div>" +
          "<div class=\"col-lg-4 col-md-4 col-sm-4 col-xs-4\"></div>"
        );
      }

    });
  }

  $(search).keypress(function(){
    if(event.which === 13){
      var searchTerm = (search.val()).replace(new RegExp(" ", 'g'), "+");
      searchTerm = searchTerm.toLowerCase();
      //split it up and make the first letter uppercase for each word for the search
      searchTerm = searchTerm.split("+");
      for(var i = 0; i < searchTerm.length; i++){
        searchTerm[i] = searchTerm[i].split("");
        searchTerm[i][0] = searchTerm[i][0].toUpperCase();
        searchTerm[i] = searchTerm[i].join("");
      }
      //and join them together again
      searchTerm = searchTerm.join("+");

      console.log(searchTerm);
      recall(searchTerm);
      search.val("");
    }
  })
  recall("The+Beatles");
});
