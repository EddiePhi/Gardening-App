//PLOTS TABLE API ROUTES

//Bring in express router and database models
const db = require("../../models");
const router = require("express").Router();

// GET: all plots and associated data
router.get("/", function (req, res) {
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

//GET: find one plot by plot name
router.get("/:plot_name", function (req, res) {
  db.Plots.findOne({
    where: {
      plot_name: req.params.plot_name,
    },
    include: [db.Locations],
  })
    .then(function (response) {
      res.json(response);
      console.log(response);
    })
    .catch((error) => {
      throw error;
    });
});

//POST: Add new plot/column to Plots table
router.post("/", function (req, res) {
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

//Delete: Remove user specified plot/row from Plots table
router.delete("/:id", function (req, res) {
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

module.exports = router;
