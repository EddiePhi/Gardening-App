$(document).ready(function () {

  const modal = $("#modal");
  const plantContainer = $("#plant-container");

  $(document).on("click", ".plant-button", function() { 
    const plant_name = $(this).attr("data-plantName")
    const plant_facts = $(this).attr("data-plantFacts")
    const sun = $(this).attr("data-sun")
    const fruit_size_inches = $(this).attr("data-fruitSize")
    const spread = $(this).attr("data-spread")
    const days_to_maturity = $(this).attr("data-daysToMaturity")
    const height = $(this).attr("data-height")

    console.log(plant_name); 
    modal.html(`<div class="modal-content">
    <span class="close">&times;</span>
    <h1>${plant_name}</h1>
    <br>
    <h1>${plant_facts}</h1>
    <p>Sun: ${sun}</p>
    <br>
    <p>Fruit size: ${fruit_size_inches} inches</p>
    <br>
    <p>Spread: ${spread} inches </p>
    <br>
    <p>Days to maturity: ${days_to_maturity}</p>
    <br>
    <p>Height: ${height} inches</p>

  </div>`);

    modal.css("display", "block");
  });

  $(document).on("click", ".close", function() { 
    modal.css("display", "none");
  });

  //make a fetch call to the API, save the data
  fetch("/api/plants")
    .then((response) => response.json())
    .then((plantdata) => {
      //console log the results
      console.log(plantdata);
      //console log the results with parameters
      //narrow parameters further
      generatePlantCards(plantdata);
  });

  //maybe change plantdata to plants at some point
  function generatePlantCards (plantdata) {
    for (let i = 0; i < plantdata.length; i++) {
      // create variables
      const {plant_name, plant_facts, days_to_maturity, fruit_size_inches, sun, spread, height} = plantdata[i];

      const plantButton = `<button class="mx-6 my-6 nes-container has-background-white plant-button is-rounded"
      id="${plant_name}"
      data-plantName="${plant_name}"
      data-plantFacts="${plant_facts}"
      data-sun="${sun}"
      data-fruitSize="${fruit_size_inches}"
      data-daysToMaturity="${days_to_maturity}"
      data-spread="${spread}"
      data-height="${height}"
      style="background-image: url('../assets/plant-images/${plant_name.split(" ").join("").toLowerCase()}.png')"
      >
      ${plant_name}
    </button>`
      // console.log(`${plantName} is a plant for your garden. ${plantFacts} ${plantName} takes ${daysToMaturity} days to mature and it needs ${sun}. Its fruit can grow to be ${fruitSize} inches. It can grow to be ${spread} inches wide and ${height} inches tall.`);
      plantContainer.append(plantButton)
    };
  };

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };


    // Weather icon GET request
    $.get("/api/currentweather/1").then(function (response) {
      console.log(response);
      let currentWeatherIcon = response.weather[0].icon;
      $("#currentWeatherImg").html(
          `<img id="icon" class="pixelate level-item mr-3" style="height: 40px;" alt="weather-icon" src="https://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png"/>`
      );
      $("#currentDateTime").text(dayjs().format('ddd. MMM DD, YYYY'));
      
    });
});

