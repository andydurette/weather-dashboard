$( document ).ready(function() {

  

var weatherUpdate = function(cityName){

  //$("#forcast .day").remove();
  //$("#weather").remove();
  

  // First AJAX call gets the city name provided to the function
  $.ajax({url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`, success: function(result){
    cityId = result.id;
    // Second AJAX call uses the result.id data from the first to gather the information to display display the weather and pass to the third for the uv
    $.ajax({url: `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${apiKey}&units=metric`, success: function(result){
      console.log(result);
  
      $("#currentDay").html("");
      // Current Day Block
      
      $("#currentDay").append(`<div class="blockHeading"><h2>${result.city.name} ( ${getDate(0)} )</h2><img src="http://openweathermap.org/img/w/${result.list[0].weather[0].icon}.png" alt="${result.list[0].weather[0].description}" width='50' height='50'>`);
      $("#currentDay").append(`<p class="humidity">Temperature: ${result.list[0].main.temp} °C</p>`);
      $("#currentDay").append(`<p class="humidity"> Humidity: ${result.list[0].main.humidity} %</p>`);
      $("#currentDay").append(`<p class="uv">Wind Speed:  ${mph(result.list[0].wind.speed)} MPH</p>`);
      // Third AJAX call uses the co-ordinate data from the second to call the uv data
      $.ajax({url: "http://api.openweathermap.org/data/2.5/uvi?appid=428bbab3989b31eb5f6dd40e0559cbeb&lat=" + result.city.coord.lat + "&lon=" + result.city.coord.lon, success: function(result){
        $("#currentDay").append(`<p class="uv">UV Index: <span>${result.value}</span></p>` );
      }});
  
      // 5 Day Forcast
      // Clear forcast data
      $("#forcast .days").html("");
      // Append forcast data
      for(let i=1; i <= 5; i++){
        let forcastBlock = function(i){
          return('<div>' +
          '<p class="date">' + getDate(i) + '</p>' +  
          `<img src="http://openweathermap.org/img/w/${result.list[i].weather[0].icon}.png" alt="${result.list[i].weather[0].description}" "width='50' height='50'>` +
          `<p class="temperature">Temp: ${result.list[i].main.temp}&nbsp;°C</p>` +
          `<p class="humidity">Humidity: ${result.list[i].main.humidity}&nbsp;%"</p>` +
          '</div>');
        }
        
        $("#forcast .days").append(forcastBlock(i));
      }
    }});
  }});
  }
  
    weatherUpdate("Toronto");
  
    $("#presetCities div").on( "click", function() {
      weatherUpdate($(this).html().toString());
    });
  

  

  });


