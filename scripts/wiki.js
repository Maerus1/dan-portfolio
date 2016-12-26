$(function(){

  function recall(){
    $.ajax({
      cache: false,
      datatype: 'json',
      type: 'GET',
      url: "https://en.wikipedia.org/w/api.php?action=query&format=json&errorformat=bc&titles=Main_Page",
      headers: { 'Api-User-Agent': 'Test/1.1' },
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
