// ===============================================================================
// DEPENDENCIES
// ===============================================================================
const path = require("path");

const passport = require("../config/passport");
const db = require("../models");
// Requiring our custom middleware for checking if a user is logged in (Wk-14 HW)
var isAuthenticated = require("../config/middleware/isAuthenticated");

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
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, "../public/html/landingpage.html"));
  });

  app.get("/plants", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/plants.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // Route to landing page
  app.get("/home", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/plotHomePage.html"));
  });
  // Route to forecast page
  app.get("/forecast", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/forecast.html"));
  });

  // Route to the Plots page
  app.get("/plot", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/plotpage.html"));
  });



   // Routes added for P3, WIP (EP)

  // Route to the Login page
  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
  

  // Route to the Signup page
  app.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/signup.html"));
  });

  

  // Route to the Community page
  app.get("/community", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/community.html"));
  });


  // Route to the Farmer's Market locator page
  app.get("/locate-market", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/locate-market.html"));
  });


  // Route to the Gardening News page
  app.get("/news", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/news.html"));
  });


  // Route to the Social Media integration page
  app.get("/social", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/social.html"));
  });


  // Route to the "Start New Plant" page (Possibly swap with Plants or Plots?)
  app.get("/start-new", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/start-new.html"));
  });


  // Route to the Plant recommendations page
  app.get("/what-to-grow", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/what-to-grow.html"));
  });



  // API ROUTES TEST
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
    });
    
    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function(req, res) {
    db.User.create({
        email: req.body.email,
        password: req.body.password
    })
        .then(function() {
        res.redirect(307, "/api/login");
        })
        .catch(function(err) {
        res.status(401).json(err);
        });
    });
    
    
    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function(req, res) {
    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
    } else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
        email: req.user.email,
        id: req.user.id
        });
    }
    });
    

  // If no matching route is found default to landing page/home page
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/landingpage.html"));
  });
};
