$(function(){
  var cityName = "";
  var countryName = "";
  var city = $(".city");
  var temp = $(".temp");
  var humidity = $(".humidity");
  var condition = $(".condition");
  var switched = $(".switch");
  var units = ["metric", "imperial"];
  var symbols = ["&#8451;", "&#8457;"];
  var image = $("#image");
  //for switching back between metric and imperial units
  var counter = 0;
  //array for searching the various weather conditions for the image
  var checkConditions = [{key:"rain", value:"rain.gif"}, {key:"snow", value:"snow.gif"},
                         {key:"thunder", value:"storm.gif"}, {key:"lightning", value:"storm.gif"},
                         {key:"storm", value:"storm.gif"}, {key:"fog", value:"mist.gif"},
                         {key:"mist", value:"mist.gif"}, {key:"wind", value:"wind.gif"},
                         {key:"overcast", value:"overcast.gif"}, {key:"cloudy", value:"overcast.gif"},
                         {key:"sunny", value:"sunny.gif"}, {key:"clear", value:"sunny.gif"}];
  //have a counter of sorts to keep track of the highest priority weather condition present
  var priority = 12;

  function recall(){
    $.ajax({
      cache: false,
      type: 'GET',
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + countryName + "&units=" + units[counter] + "&appid=eebd340daf88df9a7e3ea7adfef26b0d",
      success: function(a){
        console.log(a);
        temp.html("Temperature: " + a.main.temp + symbols[counter]);
        humidity.html("Humidity: " + a.main.humidity + "%");
        //find all the conditions for the weather
        condition.html("Conditions: ");
        for(var i = 0; i < a.weather.length; i++){
          condition.append(a.weather[i].description);
          if(i < a.weather.length - 1){
            condition.append(", ");
          }

          //check what the conditions are and display the appropriate picture
          for(var j = 0; j < checkConditions.length; j++){
            if(a.weather[i].description.includes(checkConditions[j].key)){
              if(j < priority){
                priority = j;
              }
            }
          }
        }
        image.attr("src", "../images/" + checkConditions[priority].value);
      },
      error: function(a){
        console.log("Error! Couldn't properly read the JSON file");
      }
    });
  }

  $.get("http://ipinfo.io", function(response) {
    console.log(response);
    city.append(response.city);
    cityName = response.city;
    countryName = response.country;
    recall();
  }, "jsonp")

  //add button switcher functionality for ferinheight and celsius
  switched.click(function(){
    if(counter == 0){
      counter = 1;
      switched.html("Celsius");
      //I need to make a call to the api to update the value
      recall();
    }
    else{
      counter = 0;
      switched.html("Ferinheight");
      recall();
    }
  });
});
