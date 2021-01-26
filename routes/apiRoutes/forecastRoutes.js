//FORSECAST API ROUTES
//This utilizes third party APIs and the ZipCodes Table/Model

//Bring in express router, database models, additional dependencies
const db = require("../../models");
const router = require("express").Router();
require("dotenv").config();
const fetch = require("isomorphic-fetch");

//GET: A specific zip code to send to forecast page
router.get("/:zip_codes", function (req, res) {
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

//THIRD PARTY API ROUTE//
//GET: a zipcode from the ZipCodes table then fetch the weather API and plug in the results from the zip
//code get request
router.get("/:id", function (req, res) {
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

module.exports = router;
