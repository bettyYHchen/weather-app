
document.addEventListener("DOMContentLoaded", updateCurrentLocation, false);


let currentTime = document.querySelector("#current-time");
let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
currentTime.innerHTML = `${days[now.getDay()]} ${now.getHours()}:${formatMinutes(now.getMinutes())}`;

changeForecastDay(now);

function formatMinutes(d) {
    if (d < 10) {
        return "0" + d;
    } else {
        return `${d}`;
    }
    
}

function changeForecastDay(dateObj) { 
    //Change the day display in the forecast according to current day
    let daysAbbrev = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastFirstDay = document.querySelector("#forecast-first-day");
    forecastFirstDay.innerHTML = daysAbbrev[(dateObj.getDay() + 1)%7];

    let forecastSecondDay = document.querySelector("#forecast-second-day");
    forecastSecondDay.innerHTML = daysAbbrev[(dateObj.getDay() + 2)%7];

    let forecastThirdDay = document.querySelector("#forecast-third-day");
    forecastThirdDay.innerHTML = daysAbbrev[(dateObj.getDay() + 3)%7];

    let forecastFourthDay = document.querySelector("#forecast-fourth-day");
    forecastFourthDay.innerHTML = daysAbbrev[(dateObj.getDay() + 4)%7];

    let forecastFifthDay = document.querySelector("#forecast-fifth-day");
    forecastFifthDay.innerHTML = daysAbbrev[(dateObj.getDay() + 5) % 7];
}


function changeTime(offset) {
    // function to calculate local time
    // in a different city
    // given the city's UTC Shift in seconds from UTC

    // create Date object for current location
    let d = new Date();
   
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
   
    // create new Date object for different city
    // using supplied offset
    return new Date(utc + (1000*offset));
   
    

}




//Add a link to convert the temperature from celcius to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit.
let fahrenheitSwitch = document.querySelector("#fahrenheit-switch");
let celciusRecord = null; // this will get updated when api called
fahrenheitSwitch.addEventListener("click", function (event) {
    event.preventDefault();
    // making the F switch solid and C switch not solid
    fahrenheitSwitch.classList.add("active");
    celciusSwitch.classList.remove("active");
    let temperature = document.querySelector(".temperature");
    temperature.innerHTML = convert2Fahrenheit(celciusRecord);
})

function convert2Fahrenheit(degree) {
    return Math.round(((degree * 9) / 5) + 32);
}

//Add a link to convert the temperature from Fahrenheit to celcius. 
let celciusSwitch = document.querySelector("#celcius-switch");
celciusSwitch.addEventListener("click", function (event) { 
    event.preventDefault();
    // making the C switch solid and F switch not solid
    celciusSwitch.classList.add("active");
    fahrenheitSwitch.classList.remove("active");
    let temperature = document.querySelector(".temperature");
    temperature.innerHTML = celciusRecord;
})







//**********************************Features added in week 5 ********************/
// Add a search engine, when searching for a city, display the city name on the page and update weather info after the user submits the form

function formatString(inputString) { 
    // formate inputString to be a string with all lowercase except the first letter to be uppercase
    let inputStringList = inputString.split(" ");
    for (let i = 0; i < inputStringList.length; i++) {
        inputStringList[i] = inputStringList[i].slice(0, 1).toUpperCase() + inputStringList[i].slice(1).toLowerCase();
    }
    return inputStringList.join(" ");
}

function updateCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    let city = formatString(cityInput.value);
    let apiKey = "73eee4c0adad9e9175d692ed1fe44b49";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    

    axios.get(apiUrl).then(function (response) { 
        //update temperature
        let temperature = document.querySelector(".temperature");
        temperature.innerHTML = Math.round(response.data.main.temp);
        celciusRecord = Math.round(response.data.main.temp);
        //update wind speed
        let windSpeed = document.querySelector("#wind-speed");
        windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
        //update humidity
        let humidity = document.querySelector("#humidity");
        humidity.innerHTML = `${response.data.main.humidity}%`;
        //update temperature range
        let temperatureRange = document.querySelector("#temperature-range");
        temperatureRange.innerHTML = `${Math.round(response.data.main.temp_min)}°~${Math.round(response.data.main.temp_max)}°`;
        //update description
        let weatherIcon = document.querySelector("#weather-icon");
        weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
        weatherIcon.setAttribute("alt", response.data.weather[0].main);
        let weatherDescription = document.querySelector("#weather-description");
        weatherDescription.innerHTML = response.data.weather[0].main;
        //update time
        let currentTime = document.querySelector("#current-time");
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let now = changeTime(response.data.timezone);
        currentTime.innerHTML = `${days[now.getDay()]} ${now.getHours()}:${formatMinutes(now.getMinutes())}`;
        changeForecastDay(now);
        //update five-day forecast
        let lat = response.data.coord.lat;
        let lon = response.data.coord.lon;
        let apiForeCastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
        axios.get(apiForeCastUrl).then(function (response) { 

        var i;
        for (i = 0; i < 5; i++) { 
            let forecastIcon = document.querySelector(`#icon-day${i + 1}`);
            forecastIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.daily[i + 1].weather[0].icon}@2x.png`);
            forecastIcon.setAttribute("alt", response.data.daily[i + 1].weather[0].main);
            let forecastDayRange = document.querySelector(`#temp-range-day${i + 1}`);
            forecastDayRange.innerHTML = `${Math.round(response.data.daily[i+1].temp.min)}°~${Math.round(response.data.daily[i+1].temp.max)}°`;
        }
        })
        
    })

    

    // Change the city name displayed on page
    let cityName = document.querySelector("#city-name");
    cityName.innerHTML = city;
}

// update city when submit search
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", updateCity);


//Add a current location button. When clicking on it, it used Geolocation API to get coordinates and update info on app
function updateCurrentLocation(event) { 
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(function (location) {
    let apiKey = "73eee4c0adad9e9175d692ed1fe44b49";
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(function (response) {
        //update temperature
        let temperature = document.querySelector(".temperature");
        temperature.innerHTML = Math.round(response.data.main.temp);
        celciusRecord = Math.round(response.data.main.temp);
        //update wind speed
        let windSpeed = document.querySelector("#wind-speed");
        windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
        //update humidity
        let humidity = document.querySelector("#humidity");
        humidity.innerHTML = `${response.data.main.humidity}%`;
        //update temperature range
        let temperatureRange = document.querySelector("#temperature-range");
        temperatureRange.innerHTML = `${Math.round(response.data.main.temp_min)}°~${Math.round(response.data.main.temp_max)}°`;
        //update description
        let weatherIcon = document.querySelector("#weather-icon");
        weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
        weatherIcon.setAttribute("alt", response.data.weather[0].main);
        let weatherDescription = document.querySelector("#weather-description");
        weatherDescription.innerHTML = response.data.weather[0].main;
        //update time
        let currentTime = document.querySelector("#current-time");
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let now = changeTime(response.data.timezone);
        currentTime.innerHTML = `${days[now.getDay()]} ${now.getHours()}:${formatMinutes(now.getMinutes())}`;
        changeForecastDay(now);
        // Change the city name displayed on page
        let cityName = document.querySelector("#city-name");
        cityName.innerHTML = response.data.name;
        });
    
    //update five-day forecast
    let apiForeCastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
        axios.get(apiForeCastUrl).then(function (response) {

            var i;
            for (i = 0; i < 5; i++) {
                let forecastIcon = document.querySelector(`#icon-day${i + 1}`);
                forecastIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.daily[i + 1].weather[0].icon}@2x.png`);
                forecastIcon.setAttribute("alt", response.data.daily[i + 1].weather[0].main);
                let forecastDayRange = document.querySelector(`#temp-range-day${i + 1}`);
                forecastDayRange.innerHTML = `${Math.round(response.data.daily[i + 1].temp.min)}°~${Math.round(response.data.daily[i + 1].temp.max)}°`;
            }
        });
    });

    

}

//update current positioning when positioning button clicked
let positionButton = document.querySelector("#position-button");
positionButton.addEventListener("click", updateCurrentLocation);





