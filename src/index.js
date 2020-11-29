// Feature One: display the current date and time 

let currentTime = document.querySelector("#current-time");
let now = new Date();
days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
currentTime.innerHTML = `${days[now.getDay()]} ${now.getHours()}:${formatMinutes(now.getMinutes())}`;

function formatMinutes(d) {
    if (d < 10) {
        return "0" + d;
    } else {
        return `${d}`;
    }
    
}

//Add a search engine, when searching for a city, display the city name on the page after the user submits the form

function changeCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    let cityName = document.querySelector("#city-name");
    cityName.innerHTML = cityInput.value;
}

let cityForm = document.querySelector("#city-form");
cityForm.querySelector("submit", changeCity)


//Add a link to convert the temperature from Celsius to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit.
let fahrenheitSwitch = document.querySelector("#fahrenheit-switch");
fahrenheitSwitch.addEventListener("click", function (event) {
    event.preventDefault();
    let temperature = document.querySelector(".temperature");
    temperature.innerHTML = convert2Fahrenheit(parseInt(temperature.innerHTML));
})

function convert2Fahrenheit(degree) {
    return Math.round(((degree * 9) / 5) + 32);
}

//Change the day display in the forcast according to current day
daysAbbrev = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let forcastFirstDay = document.querySelector("#forcast-first-day");
forcastFirstDay.innerHTML = daysAbbrev[now.getDay() + 1];

let forcastSecondDay = document.querySelector("#forcast-second-day");
forcastSecondDay.innerHTML = daysAbbrev[now.getDay() + 2];

let forcastThirdDay = document.querySelector("#forcast-third-day");
forcastThirdDay.innerHTML = daysAbbrev[now.getDay() + 3];

let forcastFourthDay = document.querySelector("#forcast-fourth-day");
forcastFourthDay.innerHTML = daysAbbrev[now.getDay() + 4];

let forcastFifthDay = document.querySelector("#forcast-fifth-day");
forcastFifthDay.innerHTML = daysAbbrev[now.getDay() + 5];

