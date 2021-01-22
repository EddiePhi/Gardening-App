// Reference to Eddie P HW: WK-11 (Note-Taker)

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
require("dotenv").config();

const fetch = require("isomorphic-fetch");
const weatherDB = require("../db/weatherDB.json");
const fs = require("fs");
// const shortId = require("shortid"); // Assitance from Tutor Mazin Abed
// var plotModel = require("../models/plotModel.js")
// var plantModel = require("../models/plantModel.js")
// var zipCodeModel = require("../models/zipCodeModel.js")
var db = require("../models");
const { query } = require("express");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests

  //THIRD PARTY API ROUTE//
  //get a zipcode from the ZipCodes table then fetch the weather API and plug in the results from the zip
  //code get request
  app.get("/api/forecast/:id", function (req, res) {
    db.ZipCodes.findAll({ where: { id: req.params.id } })
      .then(function (results) {
        fetch(
          "https://api.openweathermap.org/data/2.5/forecast?zip=" +
            results[0].zip_codes +
            ",us&appid=" +
            process.env.API_KEY
        ).then(async function (weatherdata) {
          const data = await weatherdata.json();
          console.log(data);
          res.json(data);
        });
      })
      .catch((error) => {
        throw error;
      });
  });

  // Duplicate GET request for current weather icon.
  app.get("/api/currentweather/:id", function (req, res) {
    db.ZipCodes.findAll({ where: { id: req.params.id } })
      .then(function (results) {
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?zip=" +
            results[0].zip_codes +
            ",us&appid=" +
            process.env.API_KEY2
        ).then(async function (weatherdata) {
          const data = await weatherdata.json();
          console.log(data);
          res.json(data);
        });
      })
      .catch((error) => {
        throw error;
      });
  });

  //PLANTS TABLE API ROUTES

  //GET REQUESTS//

  // get all data from Plants table//
  app.get("/api/plants", function (req, res) {
    db.Plants.findAll({})
      .then(function (results) {
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });

  //POST REQUESTS

  //Add New plant/column to Plants table
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
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });

  //DELETE REQUESTS//

  //Delete plant from Plants table
  app.delete("/api/plants/:id", function (req, res) {
    db.Plants.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(function (results) {
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });

  //PLOT TABLE API REQUESTS//

  // GET all data from Plots table
  app.get("/api/plot", function (req, res) {
    db.Plots.findAll({
      include: [
        {
          model: db.Locations,
          include: [
            {
              model: db.Plants,
            },
          ],
        },
      ],
    })
      .then(function (results) {
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });

  //Add New plot/column to Plots table
  app.post("/api/plot", function (req, res) {
    console.log(req.body);

    db.Plots.create({
      plot_name: req.body.plot_name,
      plot_rows: req.body.plot_rows,
      plot_columns: req.body.plot_columns,
    })
      .then(function (results) {
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });

  //Delete user specified plot/row from Plots table
  app.delete("/api/plot/:id", function (req, res) {
    db.Plots.destroy({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: db.Locations,
        },
      ],
    })
      .then(function (results) {
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });

  //Locations/Plots/plants Joins

  // app.get("/api/locations/:id", function (req, res) {
  //   db.Plots.findOne({
  //     where: {
  //       id: req.params.id,
  //     },
  //     include: [db.Locations],
  //   })
  //     .then(function (dbPlots) {
  //       res.json(dbPlots);
  //     })
  //     .catch((error) => {
  //       throw error;
  //     });
  // });

  //ZipCodes API Requests

  //GET all zip codes from ZipCodes table
  app.get("/api/zipcode", function (req, res) {
    db.ZipCodes.findAll({})
      .then(function (results) {
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });

  //get a specific zip for
  app.get("/api/forcast/:zip_codes", function (req, res) {
    db.ZipCodes.findAll({
      where: {
        zip_codes: req.params.zip_codes,
      },
    })
      .then(function (results) {
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });

  //Add zip code to ZipCodes table
  app.post("/api/zipcode", function (req, res) {
    console.log(req.body);

    db.ZipCodes.create({
      zip_codes: req.body.zip_codes,
    })
      .then(function (results) {
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });

  //Delete user specified zip code entery/column from ZipCode table
  app.delete("/api/zipcode/:id", function (req, res) {
    db.ZipCodes.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(function (results) {
        res.json(results);
      })
      .catch((error) => {
        throw error;
      });
  });
  // duplicate for /zipcode end

  // end of module.exports
};
