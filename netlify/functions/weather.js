"use strict";

import fetch from "node-fetch";

export const handler = async (event, context) => {
	try {
		// Get query parameters
		const cityName = event.queryStringParameters?.cityName;
		const type = event.queryStringParameters?.type;
		const apiKey = process.env.ACCUWEATHER_API_KEY;

		// Add detailed logging
		console.log("Request received:", {
			cityName,
			type,
			hasApiKey: !!apiKey,
		});

		// Validate API key
		if (!apiKey) {
			console.error("API key is missing");
			return {
				statusCode: 500,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify({
					error: "API kulcs hiányzik. Kérlek ellenőrizd a környezeti változókat.",
				}),
			};
		}

		// Validate city name
		if (!cityName) {
			return {
				statusCode: 400,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify({ error: "Hiányzó cityName paraméter" }),
			};
		}

		// Handle request based on type
		if (type === "autocomplete") {
			// Autocomplete endpoint
			const autocompleteUrl = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${encodeURIComponent(
				cityName
			)}&language=hu-hu`;
			console.log("Autocomplete URL:", autocompleteUrl);

			try {
				const response = await fetch(autocompleteUrl);
				console.log("Autocomplete response status:", response.status);

				if (!response.ok) {
					const errorText = await response.text();
					console.error("Autocomplete API error:", errorText);
					return {
						statusCode: response.status,
						headers: {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*",
						},
						body: JSON.stringify({
							error: `Autocomplete API hiba: ${response.status} - ${errorText}`,
						}),
					};
				}

				const data = await response.json();
				console.log("Autocomplete success, found items:", data.length);

				return {
					statusCode: 200,
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
					body: JSON.stringify(data),
				};
			} catch (fetchError) {
				console.error("Fetch error during autocomplete:", fetchError);
				throw fetchError;
			}
		} else {
			// City search endpoint
			const locationApiUrl = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${encodeURIComponent(
				cityName
			)}&language=hu-hu`;
			console.log("Location search URL:", locationApiUrl);

			try {
				const locationResponse = await fetch(locationApiUrl);
				console.log(
					"Location search response status:",
					locationResponse.status
				);

				if (!locationResponse.ok) {
					const errorText = await locationResponse.text();
					console.error("Location API error:", errorText);
					return {
						statusCode: locationResponse.status,
						headers: {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*",
						},
						body: JSON.stringify({
							error: `Location API hiba: ${locationResponse.status} - ${errorText}`,
						}),
					};
				}

				const locationData = await locationResponse.json();
				console.log(
					"Location search success, found items:",
					locationData.length
				);

				if (!locationData || locationData.length === 0) {
					return {
						statusCode: 404,
						headers: {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*",
						},
						body: JSON.stringify({
							error: "Nem található ilyen város",
						}),
					};
				}

				// Get weather data for the first location
				const locationKey = locationData[0].Key;
				const currentWeatherApiUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=hu-hu&details=true`;
				console.log("Weather data URL:", currentWeatherApiUrl);

				const currentWeatherResponse = await fetch(
					currentWeatherApiUrl
				);
				console.log(
					"Weather data response status:",
					currentWeatherResponse.status
				);

				if (!currentWeatherResponse.ok) {
					const errorText = await currentWeatherResponse.text();
					console.error("Weather API error:", errorText);
					return {
						statusCode: currentWeatherResponse.status,
						headers: {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*",
						},
						body: JSON.stringify({
							error: `Weather API hiba: ${currentWeatherResponse.status} - ${errorText}`,
						}),
					};
				}

				const currentWeatherData = await currentWeatherResponse.json();

				if (!currentWeatherData || currentWeatherData.length === 0) {
					console.error("No weather data returned");
					return {
						statusCode: 404,
						headers: {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*",
						},
						body: JSON.stringify({
							error: "Nem található időjárás adat a városhoz",
						}),
					};
				}

				console.log("Weather data success");

				// Combine location and weather data
				const enrichedData = {
					...locationData[0],
					...currentWeatherData[0],
				};

				return {
					statusCode: 200,
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
					body: JSON.stringify(enrichedData),
				};
			} catch (fetchError) {
				console.error(
					"Fetch error during location/weather:",
					fetchError
				);
				throw fetchError;
			}
		}
	} catch (error) {
		console.error("Overall function error:", error);
		return {
			statusCode: 500,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
				error: `Időjárás adatok lekérése sikertelen: ${error.message}`,
				stack:
					process.env.NODE_ENV === "development"
						? error.stack
						: undefined,
			}),
		};
	}
};
