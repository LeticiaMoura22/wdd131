// Static weather values (metric) -- real-time data comes later in the course
const temperature = 28; // °C
const windSpeed = 12;   // km/h

// Wind chill (metric): one-line calculation
const calculateWindChill = (temp, speed) => 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);

// Only calculate when conditions are viable: temp <= 10 °C and wind > 4.8 km/h
let windChill = "N/A";
if (temperature <= 10 && windSpeed > 4.8) {
  windChill = `${calculateWindChill(temperature, windSpeed).toFixed(1)}\u00A0\u00B0C`;
}

document.querySelector("#temperature").textContent = temperature;
document.querySelector("#wind").textContent = windSpeed;
document.querySelector("#windchill").textContent = windChill;

// Footer: current year and last modified date
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;
