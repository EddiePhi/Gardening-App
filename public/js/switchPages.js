$(document).ready(function () {
  let plantsBtn = $("#plants");
  let forecastBtn = $("#forecast");
  let settingsBtn = $("#settings");
  let homeBtn = $("#home");
  let plotBtn = $("#plot");
  let makePlotBtn = $("makePlot");

  function goToPlants() {
    window.location.replace("/plants");
  }
  function goToForecast() {
    window.location.replace("/forecast");
  }
  function goToSettings() {
    window.location.replace("/settings");
  }
  function goToHome() {
    window.location.replace("/home");
  }

  function goToPlot() {
    window.location.replace("/plot");
  }

  plantsBtn.click(goToPlants);
  forecastBtn.click(goToForecast);
  // plotsBtn.click(goToPlot);
  homeBtn.click(goToHome);
  plotBtn.click(goToPlot);
  makePlotBtn.click(goToPlot);

});

