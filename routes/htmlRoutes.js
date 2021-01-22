// ===============================================================================
// DEPENDENCIES
// ===============================================================================
const path = require("path");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // Route to Plants page
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------

  // Custom html routes
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/landingpage.html"));
  });

  app.get("/plants", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/plants.html"));
  });
  // Route to plotHomePage
  app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/plotHomePage.html"));
  });
  // Route to forecast page
  app.get("/forecast", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/forecast.html"));
  });

  // Route to the Plots page
  app.get("/plot", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/plotpage.html"));
  });

  // If no matching route is found default to landing page/home page
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/landingpage.html"));
  });
};
