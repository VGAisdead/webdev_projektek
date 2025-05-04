"use strict";

const fetch = require("node-fetch");

exports.handler = async (event, context) => {
	const apiKey = process.env.ACCUWEATHER_API_KEY;
	const cityName = event.queryStringParameters.cityName;

	if (!cityName) {
		return {
			statusCode: 400,
			body: JSON.stringify({ error: "Hiányzó cityName paraméter" }),
		};
	}

	const locationApiUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityName}&language=hu-hu`;

	try {
		const locationResponse = await fetch(locationApiUrl);
		const locationData = await locationResponse.json();

		if (locationData && locationData.length > 0) {
			const locationKey = locationData[0].Key;

			const currentWeatherApiUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=hu-hu&details=true`;
			const currentWeatherResponse = await fetch(currentWeatherApiUrl);
			const currentWeatherData = await currentWeatherResponse.json();

			return {
				statusCode: 200,
				body: JSON.stringify(currentWeatherData),
			};
		} else {
			return {
				statusCode: 404,
				body: JSON.stringify({ error: "Nem található ilyen város" }),
			};
		}
	} catch (error) {
		console.error("Hiba az AccuWeather API hívásakor:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: "Időjárás adatok lekérése sikertelen",
			}),
		};
	}
};
