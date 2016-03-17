/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'Weather',
  subtitle:'Fetching...'
});

// Display the Card
card.show();

var ajax = require('ajax');


getWeather();

function locationSuccess(pos) {
  var locationName = '';
  // get location information
  var locationAPIKey = "0wps1XsPbKHyXhrd58bi6VqE";
//   var locationURL = 'http://api.map.baidu.com/geocoder/v2/?coordtype=wgs84ll&location=' + pos.coords.longitude + 
//       ',' + pos.coords.latitude + '&output=json&ak=' + locationAPIKey;
  var locationURL = 'http://api.map.baidu.com/geocoder/v2/?coordtype=wgs84ll&location=31.20157480836658,121.59820799359215&output=json&ak=0wps1XsPbKHyXhrd58bi6VqE';
  ajax(
    {
      url: locationURL,
      type: 'json'
    },
    function(data) {
      // Success!
      console.log('Successfully fetched location data!');
      // Extract data
      locationName = data.result.formatted_address;
//       locationName = data.status;
      console.log('locationName = '+ locationName);
      
      
      // get weather information
      var openWeatherAPIKey = "fa4efdb0a1750ded77e610038fa2ac87";
      var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
          pos.coords.latitude + '&lon=' + pos.coords.longitude + '&appid=' + openWeatherAPIKey;
      console.log('get weather success, URL = '+ weatherURL);
      ajax(
        {
          url: weatherURL, 
          type: 'json'
        },
        function(data) {
          // Success!
          console.log('Successfully fetched weather data!');
          // Extract data
          var temperature = Math.round(data.main.temp - 273.15) + 'C';
          // Always upper-case first letter of description
          var description = data.weather[0].description;
          description = description.charAt(0).toUpperCase() + description.substring(1);
          // Show to user
          console.log('Show to user');
          card.subtitle(locationName + ', ' + temperature);
          card.body(description);
        },
        function(error) {
          // Failure!
          console.log('Failed fetching weather data: ' + error);
        }
      );
      
      
    },
    function(error) {
      // Failure!
      console.log('Failed fetching location data: ' + error);
    }
  );
}



function locationError(err) {
  console.log('Error requesting location!');
}

function getWeather() {
  console.log('get weather begin');
  navigator.geolocation.getCurrentPosition(
    locationSuccess,
    locationError,
    {timeout: 15000, maximumAge: 60000}
  );
}






