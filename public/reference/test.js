// Current date via Day.js
const currentDate = dayjs().format('ddd. MMM. DD, YYYY');


// Variables
let plantsBtn = $("#plants-btn");
let forecastBtn = $("#forecast-btn");
let settingsBtn = $("#settings-btn");
let homeBtn = $("home-btn");


// Functions
function visitPlants () {
    // when this runs, /plants should server plants.html
    window.location.href = "/plants"
};


function visitForecast () {
    window.location = "forecast.html"
};

function visitSettings () {
    window.location = "settings.html"
};

function visitHome () {
    window.location = "home.html"
};


// Event listeners
plantsBtn.click(visitPlants);
forecastBtn.click(visitForecast);
settingsBtn.click(visitSettings);
homeBtn.click(visitHome);

