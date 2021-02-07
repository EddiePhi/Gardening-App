//ROUTER FOR API ROUTES//
const router = require("express").Router();

//INDIVIDUAL ROUTERS

//mount plants router
router.use("/plants", require("./plantRoutes"));

//mount plots router
router.use("/plot", require("./plotRoutes"));

//mount zipcode router
router.use("/zipcode", require("./zipRoutes"));

//mount forecast router
router.use("/forecast", require("./forecastRoutes"));

//mount currentWeather router

module.exports = router;
