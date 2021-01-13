// Reference to Eddie P HW: WK-11 (Note-Taker)

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const weatherDB = require("../db/weatherDB.json");
const fs = require("fs");
const shortId = require("shortid"); // Assitance from Tutor Mazin Abed
// var plotModel = require("../models/plotModel.js")
// var plantModel = require("../models/plantModel.js")
// var zipCodeModel = require("../models/zipCodeModel.js")
var db = require("../models");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  // duplicate GET, POST, and DELETE method for /plants
  app.get("/api/plants", function (req, res) {
    db.Plants.findAll({})
      .then(function (results) {
        // results are available to us inside the .then
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });

  app.post("/api/plants", function (req, res) {
    console.log(req.body);

    db.Plants.create({
      plant_name: req.body.plant_name,
      plant_facts: req.body.plant_facts,
      days_to_maturity: req.body.days_to_maturity,
      fruit_size_inches: req.body.fruit_size_inches,
      sun: req.body.sun,
      spread: req.body.spread,
      height: req.body.height,
    })
      .then(function (results) {
        // results are available to us inside the .then
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });

  // Express Route Params: https://www.youtube.com/watch?v=MuMs1pLuT7I
  app.delete("/api/plants/:id", function (req, res) {
    db.Plants.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(function (results) {
        // results are available to us inside the .then
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });
  // duplicate for /plants end

  // duplicate GET, POST, and DELETE method for /plot
  app.get("/api/plot", function (req, res) {
    plotModel
      .findAll({})
      .then(function (results) {
        // results are available to us inside the .then
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });

  app.post("/api/plot", function (req, res) {
    console.log(req.body);

    plotModel
      .create({
        plot_name: req.body.plot_name,
        plot_rows: req.body.plot_rows,
        plot_columns: req.body.plot_columns,
      })
      .then(function (results) {
        // results are available to us inside the .then
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });

  // Express Route Params: https://www.youtube.com/watch?v=MuMs1pLuT7I
  app.delete("/api/plot/:id", function (req, res) {
    plotModel
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(function (results) {
        // results are available to us inside the .then
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });
  // duplicate for /plot end

  // duplicate GET, POST, and DELETE method for /weather
  app.get("/api/forecast", function (req, res) {
    zipCodeModel
      .findAll({})
      .then(function (results) {
        // results are available to us inside the .then
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });

  app.post("/api/forecast", function (req, res) {
    console.log(req.body);

    zipCodeModel
      .create({
        zip_code: req.body.zip_code,
      })
      .then(function (results) {
        // results are available to us inside the .then
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });

  // Express Route Params: https://www.youtube.com/watch?v=MuMs1pLuT7I
  app.delete("/api/forecast/:id", function (req, res) {
    zipCodeModel
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(function (results) {
        // results are available to us inside the .then
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });
  // duplicate for /weather end

  // end of module.exports
};
