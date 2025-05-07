import fetch from "node-fetch";

exports.handler = async function (event) {
	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "Content-Type",
		"Content-Type": "application/json",
	};

	const apiKey = process.env.ACCUWEATHER_API_KEY;
	const q = event.queryStringParameters?.q;
	let responseText;

	if (!apiKey) {
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({
				error: "API key is missing",
				debug: "Az ACCUWEATHER_API_KEY környezeti változó nincs beállítva",
			}),
		};
	}

	// Autocomplete keresés
	if (typeof q === "string" && isNaN(q) && q !== "") {
		try {
			let url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${encodeURIComponent(
				q
			)}&language=hu-hu`;

			console.log("Searching for city:", q);
			console.log("API URL:", url);

			const response = await fetch(url);
			const responseStatus = response.status;

			// Mentjük a válasz státuszát és szövegét is diagnosztikához

			try {
				responseText = await response.text();

				console.log("API válasz státusz:", responseStatus);
				console.log("API válasz szöveg:", responseText);
			} catch (textError) {
				console.error(
					"Nem sikerült kiolvasni a válasz szövegét:",
					textError
				);
			}

			// ---------------
			// Ha a válasz nem OK, visszaadjuk a pontos hibát
			if (!response.ok) {
				console.error(
					"Autocomplete API hiba - státusz:",
					responseStatus
				);

				// Próbáljuk a választ JSON-ként értelmezni, ha lehetséges
				try {
					const errorJson = JSON.parse(responseText);

					return {
						statusCode: responseStatus,
						headers,
						body: JSON.stringify({
							error: "Autocomplete API hiba",
							details: errorJson,
							status: responseStatus,
						}),
					};
				} catch (jsonError) {
					// Ha nem JSON, akkor szövegként adjuk vissza
					return {
						statusCode: responseStatus,
						headers,
						body: JSON.stringify({
							error: "Autocomplete API hiba",
							message: responseText,
							status: responseStatus,
						}),
					};
				}
			}

			// Próbáljuk a választ JSON-ként értelmezni
			let data;

			try {
				data = JSON.parse(responseText);

				console.log("Autocomplete válasz:", data);
			} catch (jsonError) {
				console.error(
					"Nem sikerült a választ JSON-ként értelmezni:",
					jsonError
				);
				return {
					statusCode: 500,
					headers,
					body: JSON.stringify({
						error: "Nem sikerült feldolgozni az API választ",

						details: responseText,
					}),
				};
			}

			// Ellenőrizzük, hogy találtunk-e valamit
			if (!data || data.length === 0) {
				return {
					statusCode: 404,
					headers,
					body: JSON.stringify({
						error: "Nem található a megadott város",
					}),
				};
			}

			// Kérjük le rögtön az időjárást az első találat alapján
			const locationKey = data[0].Key;
			const weatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&language=hu-hu&details=true`;
			console.log("Fetching weather for location key:", locationKey);
			console.log("Weather API URL:", weatherUrl);
			const weatherRes = await fetch(weatherUrl);

			const weatherStatus = weatherRes.status;

			// Mentjük a válasz státuszát és szövegét diagnosztikához
			let weatherText;

			try {
				weatherText = await weatherRes.text();

				console.log("Időjárás API válasz státusz:", weatherStatus);

				console.log("Időjárás API válasz:", weatherText);
			} catch (textError) {
				console.error(
					"Nem sikerült kiolvasni az időjárás válasz szövegét:",
					textError
				);
			}

			if (!weatherRes.ok) {
				console.error("Időjárás API hiba - státusz:", weatherStatus);

				// Próbáljuk a választ JSON-ként értelmezni, ha lehetséges

				try {
					const errorJson = JSON.parse(weatherText);

					return {
						statusCode: weatherStatus,

						headers,

						body: JSON.stringify({
							error: "Időjárás API hiba",

							details: errorJson,

							status: weatherStatus,
						}),
					};
				} catch (jsonError) {
					// Ha nem JSON, akkor szövegként adjuk vissza

					return {
						statusCode: weatherStatus,

						headers,

						body: JSON.stringify({
							error: "Időjárás API hiba",

							message: weatherText,

							status: weatherStatus,
						}),
					};
				}
			}

			// Parse the weather data

			let weatherData;

			try {
				weatherData = JSON.parse(weatherText);

				console.log("Current conditions válasz:", weatherData);
			} catch (jsonError) {
				console.error(
					"Nem sikerült az időjárás választ JSON-ként értelmezni:",
					jsonError
				);
				return {
					statusCode: 500,
					headers,
					body: JSON.stringify({
						error: "Nem sikerült feldolgozni az időjárás API választ",

						details: weatherText,
					}),
				};
			}

			// Kombináljuk az adatokat
			const combinedData = {
				...data[0], // Hely adatok az első találatból
				...weatherData[0], // Időjárás adatok
			};

			return {
				statusCode: 200,
				headers,
				body: JSON.stringify(combinedData),
			};
		} catch (err) {
			console.error("Szerver hiba:", err);
			return {
				statusCode: 500,
				headers,
				body: JSON.stringify({
					error: "Szerver hiba történt",
					message: err.message,
					stack: err.stack,
				}),
			};
		}
	}

	// Időjárás locationKey alapján
	else if (!isNaN(q) && q !== "") {
		try {
			const weatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${q}?apikey=${apiKey}&language=hu-hu&details=true`;

			console.log("Fetching weather by location key:", q);
			console.log("Weather API URL:", weatherUrl);

			const weatherRes = await fetch(weatherUrl);

			const weatherStatus = weatherRes.status;

			// Mentjük a válasz státuszát és szövegét diagnosztikához
			let weatherText;

			try {
				weatherText = await weatherRes.text();

				console.log("Időjárás API válasz státusz:", weatherStatus);

				console.log("Időjárás API válasz:", weatherText);
			} catch (textError) {
				console.error(
					"Nem sikerült kiolvasni az időjárás válasz szövegét:",
					textError
				);
			}

			if (!weatherRes.ok) {
				console.error("Időjárás API hiba - státusz:", weatherStatus);

				// Próbáljuk a választ JSON-ként értelmezni

				try {
					const errorJson = JSON.parse(weatherText);

					return {
						statusCode: weatherStatus,

						headers,

						body: JSON.stringify({
							error: "Időjárás API hiba",

							details: errorJson,

							status: weatherStatus,
						}),
					};
				} catch (jsonError) {
					// Ha nem JSON, akkor szövegként adjuk vissza

					return {
						statusCode: weatherStatus,

						headers,

						body: JSON.stringify({
							error: "Időjárás API hiba",

							message: weatherText,

							status: weatherStatus,
						}),
					};
				}
			}

			// Parse the weather data

			let weatherData;

			try {
				weatherData = JSON.parse(weatherText);
			} catch (jsonError) {
				console.error(
					"Nem sikerült az időjárás választ JSON-ként értelmezni:",
					jsonError
				);
				return {
					statusCode: 500,
					headers,
					body: JSON.stringify({
						error: "Nem sikerült feldolgozni az időjárás API választ",
						details: weatherText,
					}),
				};
			}

			const locationUrl = `https://dataservice.accuweather.com/locations/v1/${q}?apikey=${apiKey}&language=hu-hu`;

			console.log("Fetching location details:", q);
			console.log("Location API URL:", locationUrl);

			const locationRes = await fetch(locationUrl);
			const locationStatus = locationRes.status;

			// Capture location response text
			let locationText;
			try {
				locationText = await locationRes.text();

				console.log("Lokáció API válasz státusz:", locationStatus);

				console.log("Lokáció API válasz:", locationText);
			} catch (textError) {
				console.error(
					"Nem sikerült kiolvasni a lokáció válasz szövegét:",

					textError
				);
			}

			if (!locationRes.ok) {
				console.error("Lokáció API hiba - státusz:", locationStatus);

				// Próbáljuk a választ JSON-ként értelmezni
				try {
					const errorJson = JSON.parse(locationText);

					return {
						statusCode: locationStatus,

						headers,

						body: JSON.stringify({
							error: "Lokáció API hiba",

							details: errorJson,

							status: locationStatus,
						}),
					};
				} catch (jsonError) {
					// Ha nem JSON, akkor szövegként adjuk vissza
					return {
						statusCode: locationStatus,

						headers,

						body: JSON.stringify({
							error: "Lokáció API hiba",

							message: locationText,

							status: locationStatus,
						}),
					};
				}
			}

			// Parse location data
			let locationData;

			try {
				locationData = JSON.parse(locationText);
			} catch (jsonError) {
				console.error(
					"Nem sikerült a lokáció választ JSON-ként értelmezni:",
					jsonError
				);
				return {
					statusCode: 500,

					headers,

					body: JSON.stringify({
						error: "Nem sikerült feldolgozni a lokáció API választ",

						details: locationText,
					}),
				};
			}

			// Kombináljuk az adatokat
			const combinedData = {
				...locationData, // Hely adatok
				...weatherData[0], // Időjárás adatok (első elem a tömbből)
			};

			return {
				statusCode: 200,
				headers,
				body: JSON.stringify(combinedData),
			};
		} catch (err) {
			console.error("Szerver hiba:", err);
			return {
				statusCode: 500,
				headers,
				body: JSON.stringify({
					error: "Szerver hiba történt",
					message: err.message,
					stack: err.stack,
				}),
			};
		}
	} else {
		return {
			statusCode: 400,
			headers,
			body: JSON.stringify({ error: "Missing or invalid parameters" }),
		};
	}
};
