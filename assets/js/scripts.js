$( document ).ready(function() {
  console.log( "ready!" );

  $("button").click(function(){
    $.ajax({url: "https://samples.openweathermap.org/data/2.5/forecast?id=524901&appid=428bbab3989b31eb5f6dd40e0559cbeb", success: function(result){
      $("div").html(result);
    }});
  });
});