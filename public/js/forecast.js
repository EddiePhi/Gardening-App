$(document).ready(function () {
    function forecastRender() {
        // Variables for hard coded zipcode
            // let zipCode = "03857"
            // let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${zipCode}&appid=0f848c85d2b3dd23041f7c21a9bd6d0b`;



        //AJAX request for 5 day forecast, using id in Zip Code database
        $.get("/api/forecast/1").then(function (response) {

            
            console.log(response);

            //Set forecast dates
            let date1 = $("#date1");
            let date2 = $("#date2");
            let date3 = $("#date3");
            let date4 = $("#date4");
            let date5 = $("#date5");

            //Grab date data from Forecast API
            let dateA = dayjs(`${response.list[0].dt_txt}`).format('MM/DD/YYYY');
            let dateB = dayjs(`${response.list[8].dt_txt}`).format('MM/DD/YYYY');
            let dateC = dayjs(`${response.list[16].dt_txt}`).format('MM/DD/YYYY');
            let dateD = dayjs(`${response.list[24].dt_txt}`).format('MM/DD/YYYY');
            let dateE = dayjs(`${response.list[32].dt_txt}`).format('MM/DD/YYYY');

            //Grab icon data from Forecast API
            let iconA = response.list[0].weather[0].icon;
            let iconB = response.list[8].weather[0].icon;
            let iconC = response.list[16].weather[0].icon;
            let iconD = response.list[24].weather[0].icon;
            let iconE = response.list[32].weather[0].icon;

            //Grab temp data from Forecast API and convert to Fahrenheit
            //Kelvin to Fahrenheit conversion reminder: Math.round(((K - 273.15) * 9/5 + 32)*100)/100 = F
            let tempA = response.list[0].main.temp;
            let tempAF = Math.round(((tempA - 273.15) * 9/5 + 32)*100)/100;
            let tempB = response.list[8].main.temp;
            let tempBF = Math.round(((tempB - 273.15) * 9/5 + 32)*100)/100;
            let tempC = response.list[16].main.temp;
            let tempCF = Math.round(((tempC - 273.15) * 9/5 + 32)*100)/100;
            let tempD = response.list[24].main.temp;
            let tempDF = Math.round(((tempD - 273.15) * 9/5 + 32)*100)/100;
            let tempE = response.list[32].main.temp;
            let tempEF = Math.round(((tempE - 273.15) * 9/5 + 32)*100)/100;

            //Grab humidity data from Forecast API
            let humidityA = response.list[0].main.humidity;
            let humidityB = response.list[8].main.humidity;
            let humidityC = response.list[16].main.humidity;
            let humidityD = response.list[24].main.humidity;
            let humidityE = response.list[32].main.humidity;

            //Clear fields before new search request data populates to prevent repetitive info
            date1.html("");
            date2.html("");
            date3.html("");
            date4.html("");
            date5.html("");

            //Create <div> elements to append date text
            date1.html(`
                <div class="mt-6 text">${dateA}</div>
                <img id="icon" class="mt-6 pixelate" alt="weather-icon" src="https://openweathermap.org/img/wn/${iconA}@2x.png"/>
                <section class="mt-6">Temp: ${tempAF}°F</section>
                <section class="mt-6">Humidity: ${humidityA}%</section>
            `);
            date2.html(`
                <div class="mt-6 text">${dateB}</div>
                <img id="icon" class="mt-6 pixelate" alt="weather-icon" src="https://openweathermap.org/img/wn/${iconB}@2x.png"/>
                <section class="mt-6">Temp: ${tempBF}°F</section>
                <section class="mt-6">Humidity: ${humidityB}%</section>
            `);
            date3.html(`
                <div class="mt-6 text">${dateC}</div>
                <img id="icon" class="mt-6 pixelate" alt="weather-icon" src="https://openweathermap.org/img/wn/${iconC}@2x.png"/>
                <section class="mt-6">Temp: ${tempCF}°F</section>
                <section class="mt-6">Humidity: ${humidityC}%</section>
            `);
            date4.html(`
                <div class="mt-6 text">${dateD}</div>
                <img id="icon" class="mt-6 pixelate" alt="weather-icon" src="https://openweathermap.org/img/wn/${iconD}@2x.png"/>
                <section class="mt-6">Temp: ${tempDF}°F</section>
                <section class="mt-6">Humidity: ${humidityD}%</section>
            `);
            date5.html(`
                <div class="mt-6 text">${dateE}</div>
                <img id="icon" class="mt-6 pixelate" alt="weather-icon" src="https://openweathermap.org/img/wn/${iconE}@2x.png"/>
                <section class="mt-6">Temp: ${tempEF}°F</section>
                <section class="mt-6">Humidity: ${humidityE}%</section>
            `);
        });
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

    forecastRender();
});