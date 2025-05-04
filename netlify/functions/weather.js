const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const apiKey = process.env.ACCUWEATHER_API_KEY; // Környezeti változóból olvassuk ki
  const locationKey = event.queryStringParameters.locationKey || '12345'; // Példa locationKey

  const apiUrl = `http://dataservice.accuweather.com/currentconditions/v1/<span class="math-inline">\{locationKey\}?apikey\=</span>{apiKey}&language=hu-hu&details=true`;

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