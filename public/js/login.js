// Referencing Week 14 HW - Reverse-Engineering-Code

$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("#login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // //Click button to trigger submit https://stackoverflow.com/questions/7340300/a-tag-as-a-submit-button
  // document.getElementById("submit").onclick = function(event) {
  //   console.log("Login Failed1");
  //   document.getElementById("login").submit();
  //   console.log("Login Failed2");
  // }

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      console.log("Login Failed3");
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/home");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  // https://developers.google.com/identity/sign-in/web/sign-in
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
});
