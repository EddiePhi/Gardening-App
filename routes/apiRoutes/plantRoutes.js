//PLANTS TABLE API ROUTES

//Bring in express router and database models
const db = require("../../models");
const router = require("express").Router();

//GET REQUESTS//

//get all data from Plants table
router.get("/", function (req, res) {
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
router.post("/", function (req, res) {
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
router.delete("/:id", function (req, res) {
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

module.exports = router;
