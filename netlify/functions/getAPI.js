export async function handler(event, context) {
  try {
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

    const { searchParams } = new URL(event.rawUrl);
    const coord = searchParams.get("q");
    const type = searchParams.get("type") || "forecast"; 
    // type bisa: "search" atau "forecast"

    let url = "";
    if (type === "search") {
      url = `https://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${coord}`;
    } else {
      // default forecast
      url = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${coord}&days=2&aqi=yes&alerts=no`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
