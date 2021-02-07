//CURRENT WEATHER API ROUTES

//Bring in express router, database models, additional dependencies
const db = require("../../models");
const router = require("express").Router();
require("dotenv").config();
const fetch = require("isomorphic-fetch");

//GET: Request current weather icon.
app.get("/:id", function (req, res) {
  db.ZipCodes.findAll({ where: { id: req.params.id } })
    .then(function (results) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?zip=" +
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
