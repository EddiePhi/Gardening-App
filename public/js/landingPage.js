$(document).ready(function () {
  // Carousel Start
  // Instructions from https://bulma-carousel.onrender.com/#installation

  // Initialize all elements with carousel class.
  const carousels = bulmaCarousel.attach(".carousel", { infinite: false });

  // To access to bulmaCarousel instance of an element
  const element = document.querySelector("#carousel-demo");
  if (element && element.bulmaCarousel) {
    // bulmaCarousel instance is available as element.bulmaCarousel
  }

  bulmaCarousel.attach("#carousel-demo", {
    slidesToScroll: 1,
    slidesToShow: 4,
  });
  // Carousel End

  // Weather icon GET request
  $.get("/api/currentweather/1").then(function (response) {
    console.log(response);
    let currentWeatherIcon = response.weather[0].icon;
    $("#currentWeatherImg").html(
      `<img id="icon" class="pixelate level-item mr-3" style="height: 40px;" alt="weather-icon" src="https://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png"/>`
    );

    $("#currentDateTime").text(dayjs().format("ddd. MMM DD, YYYY"));
  });

});
