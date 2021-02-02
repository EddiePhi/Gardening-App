//ZIPCODE TABLE API ROUTES

//Bring in express router and database models
const db = require("../../models");
const router = require("express").Router();

//GET: All zip codes from ZipCodes table
router.get("/", function (req, res) {
  db.ZipCodes.findAll({})
    .then(function (results) {
      res.json(results);
    })
    .catch((error) => {
      throw error;
    });
});

//POST: Add a zip code to ZipCodes table
router.post("/", function (req, res) {
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

//Delete: Remove user specified zip code entery/column from ZipCode table
router.delete("/:id", function (req, res) {
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

module.exports = router;
