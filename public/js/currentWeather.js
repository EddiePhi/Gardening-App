$(document).ready(function () {
  // Code for weather app reflects previous HW assignment for class https://github.com/EddiePhi/Weather-Dashboard
    // Adjustments made accordingly to match what Project 2 requires.

  // WEATHER API: https://openweathermap.org/api
    // API Key: 0f848c85d2b3dd23041f7c21a9bd6d0b
    // Current Weather by ZIP code: https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
    // 5 day/3 hour forecast by Zip code: //https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&appid=0f848c85d2b3dd23041f7c21a9bd6d0b
    // UV Index: http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b

  //Fix CORS error: https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
  //---------------------------------------------------------------------

  // consider https://datatables.net/ for table creation and cell selection OR https://www.ag-grid.com/javascript-grid/ (Very galaxy brain)

  require("dotenv").config();
  const api_key = process.env.API_KEY;
  const container = $("#zipcode-container")
  const zipCodeInput = $("#zip-code-input");
  const searchHistory = [];
  let zipCode = null;


  //Run searchCity when element with ID #submitBtn is clicked
  $("#submitBtn").on("click", searchCity);

  //Function allows event listener to be added to enter key and NOT enter in a new line
  $("#zip-code-input").keyup(function (event) {
    // https://stackoverflow.com/questions/155188/trigger-a-button-click-with-javascript-on-the-enter-key-in-a-text-box
    // https://stackoverflow.com/questions/18779322/disable-new-line-in-textarea-when-pressed-enter
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      $("#submitBtn").click();
    }
  });

  // Populate search results from value stored in local storage when page is first loaded.
  // previousSearch();

  function previousSearch() {
    // let zipCode = stored data from db for zipcode input
    searchCity();
  };

  function searchCity() {
    zipCode = zipCodeInput.val();
    //Define URL for AJAX request
    
    let currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${api_key}`;

    searchHistory.push(zipCode);
    console.log(searchHistory);

    //Clear zipCode input field after submitting a zip code
    zipCodeInput.val("");

    // THIS WORKS. AJAX request for Current Weather using currentWeatherURL variable (ensure HTML file has <script> tag with proper jQuery link)
    $.ajax({
      url: currentWeatherURL,
      method: "GET",
    }).then(getResponse);
  };

  function getResponse(response) {
    //Test console.log response to ensure AJAX request is successful
    console.log(response);
    container.html("");
    container.html(`
      <div id="currentCity" class="navbar-brand"></div>
      <div id="currentTemp" class="navbar-brand"></div>
      <div id="currentHumid" class="navbar-brand"></div>
      <div id="currentWind" class="navbar-brand"></div>
      <div id="currentUv" class="navbar-brand"></div>
      <a class="navbar-brand" href="/forecast">Forecast</a>
    `);

    


    //Clear fields before new search request data populates to prevent repetitive info
    $("#currentCity").empty();

    //Define an <h4> tag to hold the city name based on zip code captured.
    // let cityName = response.name;
    // let currentCity = $(`<h4>${cityName}</h4>`);
    // $("#currentCity").append(currentCity);

    //Append Weather Icon after momentDate
    let currentIcon = response.weather[0].icon;
    $("#currentCity").append(`<img class="shrink" src="https://openweathermap.org/img/wn/${currentIcon}@2x.png">`);

    //Append Temperature after Weather Icon
    let cityTemp = response.main.temp;
    //Conversion from Kelvin to Fahrenheit: https://www.rapidtables.com/convert/temperature/how-kelvin-to-fahrenheit.html
    let tempF = Math.round(((cityTemp - 273.15) * 9/5 + 32)*100)/100
    let temp = $(`<section id="temp">${tempF}°F</section>`);
    $("#currentTemp").empty();
    $("#currentTemp").append(temp);

    //Append Humidity after Temperature
    let cityHumidity = response.main.humidity;
    let humidity = $(`<section id="humidity">${cityHumidity}%</section>`);
    $("#currentHumid").empty();
    $("#currentHumid").append(humidity);

    //Append Wind Speed after Humidty
    let cityWindSpeed = response.wind.speed;
    let windSpeed = $(`<section id="windSpeed">${cityWindSpeed} mph</section>`);
    $("#currentWind").empty();
    $("#currentWind").append(windSpeed);

    //Multi-use variables for subsequent AJAX requests
    let latitude = response.coord.lat;
    let longitude = response.coord.lon;

    //AJAX request of UV Index based on data from currentWeatherURL
    let uvURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${api_key}`;
    $.ajax({
      url: uvURL,
      method: "GET",
    }).then(getUV);
  }

  function getUV(response) {
    let uvIndex = $("#currentUv");
    let cityUVIndex = response.value;
    
    console.log(response);

    //Change text of UV Index
    uvIndex.text(`${cityUVIndex}`);

    //If/Else conditional to determine background color of UV Index Element
    if (cityUVIndex >= 0 && cityUVIndex < 3) {
      uvIndex.css("backgroundColor", "green");
    } else if (cityUVIndex >= 3 && cityUVIndex < 6) {
      uvIndex.css("backgroundColor", "yellow");
    } else if (cityUVIndex >= 6 && cityUVIndex < 8) {
      uvIndex.css("backgroundColor", "orange");
    } else if (cityUVIndex >= 8 && cityUVIndex < 11) {
      uvIndex.css("backgroundColor", "red");
    } else {
      uvIndex.css("backgroundColor", "purple");
    };
  };

});
