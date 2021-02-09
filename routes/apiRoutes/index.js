//ROUTER FOR API ROUTES//
const router = require("express").Router();

//INDIVIDUAL ROUTERS

// //mount singup router
// router.use("/signup", require("./signupLoginRoutes"));

// //mount login router
// router.use("/login", require("./signupLoginRoutes"));

// //mount user_data router
// router.use("/user_data", require("./signupLoginRoutes"));

//mount forecast router
router.use("/forecast", require("./forecastRoutes"));

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
