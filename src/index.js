let weather = {
  "paris": {
    temp: 19.7,
    humidity: 80
  },
  "tokyo": {
    temp: 17.3,
    humidity: 50
  },
  "lisbon": {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  "moscow": {
    temp: -5,
    humidity: 20
  }
};

function capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function formatString(str) {
    if (str === null || str.length === 0) { return "";}
    else {
        return str.trim().toLowerCase();
    }
 
}

let city = formatString(prompt("Enter a city"));

let cityDataExist = false;
for (let prop in weather) { 
    if (city === prop) { 
        cityDataExist = true;
        alert(`It is currently ${weather[prop].temp}°C (${((weather[prop].temp * 9) / 5) + 32}°F) in ${capitalizeFirstLetter(city)} with a humidity of ${weather[prop].humidity}%.`);
    }
}

if (!cityDataExist) { 
    alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`);
}