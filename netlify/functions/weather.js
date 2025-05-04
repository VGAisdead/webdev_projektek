const fetch = require('node-fetch');

    exports.handler = async (event, context) => {
      const apiKey = process.env.ACCUWEATHER_API_KEY; // Környezeti változóból olvassuk ki
      const locationKey = event.queryStringParameters.locationKey;

      if (!locationKey) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Hiányzó locationKey paraméter' }),
        };
      }

      const apiUrl = `http://dataservice.accuweather.com/locations/v1/<span class="math-inline">\{locationKey\}?apikey\=</span>{apiKey}&language=hu-hu`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        return {
          statusCode: 200,
          body: JSON.stringify(data),
        };
      } catch (error) {
        console.error('Hiba az AccuWeather API hívásakor:', error);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Időjárás adatok lekérése sikertelen' }),
        };
      }
    };
    ```

    **Fontos változtatások ebben a kódban:**

    * A `node-fetch`-et használjuk az API hívásokhoz.
    * Ellenőrizzük, hogy a `locationKey` paraméter meg lett-e adva.
    * A `apiUrl`-t úgy módosítottuk, hogy a `/locations/v1/` végpontot használja (a te kérésedhez igazítva). Lehet, hogy ezt még pontosítanod kell attól függően, hogy milyen adatokat szeretnél lekérni az AccuWeather API-tól. Nézd meg az AccuWeather API dokumentációját.
    * Hibakezelést adtunk hozzá.
3.  Frissítsd a weather-app.js-t (valószínűleg jó, de ellenőrizzük):

A te `weather-app.js` fájlodban már szerepel a Netlify függvény hívása, de győződj meg róla, hogy a `locationKey`-t megfelelően adod át.

```javascript
"use strict";

const searchBtn = document.getElementById("searchBtn");
const inputBtn = document.getElementById("inputBtn");
const startModal = document.getElementById("start-modal");
const locationInput = document.querySelector(".inputform"); // Javítva a lekérdezést
const weatherInfoDiv = document.getElementById("weatherInfo");

// Induló modal megjelenítése
document.addEventListener("DOMContentLoaded", () => {
  if (startModal) startModal.classList.add("show");
});

// Keresés gombok eseménykezelői
inputBtn.addEventListener("click", () => {
  startModal.classList.toggle("show");
  getWeather(); // Hívjuk meg a getWeather függvényt a modal bezárásakor
});

searchBtn.addEventListener("click", () => {
  startModal.classList.toggle("show");
  getWeather(); // Hívjuk meg a getWeather függvényt a modal bezárásakor
});

// API fetch
const getWeather = () => {
  const locationKey = locationInput.value;
  if (locationKey) {
    fetch(`/.netlify/functions/weather?locationKey=${locationKey}`)
      .then((response) => response.json())
      .then((data) => {
        displayWeather(data);
      })
      .catch((error) => {
        weatherInfoDiv.textContent =
          "Hiba történt az időjárás adatok lekérésekor.";
        console.error("Hiba:", error);
      });
  } else {
    weatherInfoDiv.textContent = "Kérlek, add meg a hely nevét.";
  }
};

function displayWeather(weatherData) {
  // Itt jelenítsd meg az időjárási adatokat a weatherInfoDiv-ben
  console.log(weatherData);
  weatherInfoDiv.textContent = JSON.stringify(weatherData, null, 2); // Példa megjelenítés
}