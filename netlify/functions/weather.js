import fetch from "node-fetch";

exports.handler = async function (event) {
	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "Content-Type",
		"Content-Type": "application/json",
	};

	const apiKey = process.env.ACCUWEATHER_API_KEY;
	const q = event.queryStringParameters?.q;

	if (!apiKey) {
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({ error: "API key is missing" }),
		};
	}

	// Autocomplete keresés
	if (typeof q === "string" && isNaN(q) && q !== "") {
		try {
			let url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${encodeURIComponent(
				q
			)}&language=hu-hu`;

			const response = await fetch(url);

			if (!response.ok) {
				const errorText = await response.text();
				console.error("Autocomplete API hiba:", errorText);
				return {
					statusCode: response.status,
					headers,
					body: errorText,
				};
			}

			const data = await response.json();
			console.log("Autocomplete válasz:", data);

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
			const weatherRes = await fetch(weatherUrl);

			if (!weatherRes.ok) {
				const errorText = await weatherRes.text();
				console.error("Időjárás API hiba:", errorText);
				return {
					statusCode: weatherRes.status,
					headers,
					body: errorText,
				};
			}

			const weatherData = await weatherRes.json();
			console.log("Current conditions válasz:", weatherData);

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
					error: "Autocomplete fetch failed",
					details: err.message,
				}),
			};
		}
	}

	// Időjárás locationKey alapján
	else if (!isNaN(q) && q !== "") {
		try {
			const weatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${q}?apikey=${apiKey}&language=hu-hu&details=true`;

			const weatherRes = await fetch(weatherUrl);

			if (!weatherRes.ok) {
				const errorText = await weatherRes.text();
				console.error("Időjárás API hiba:", errorText);
				return {
					statusCode: weatherRes.status,
					headers,
					body: errorText,
				};
			}

			const weatherData = await weatherRes.json();

			const locationUrl = `https://dataservice.accuweather.com/locations/v1/${q}?apikey=${apiKey}&language=hu-hu`;

			const locationRes = await fetch(locationUrl);

			if (!locationRes.ok) {
				const errorText = await locationRes.text();
				console.error("Lokáció API hiba:", errorText);
				return {
					statusCode: locationRes.status,
					headers,
					body: errorText,
				};
			}

			const locationData = await locationRes.json();

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
					error: "Weather fetch failed",
					details: err.message,
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
