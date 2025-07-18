import Current from "./components/CurrentForecast.jsx";
import HourlyForecast from './components/HourlyForecast.jsx';
import TimeComp from "./components/TimeComp.jsx";
import AirQuality from "./components/AirQuality.jsx";
import './App.css'
import { useEffect, useState } from 'react';

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [coord, setCoord] = useState("");
  const [forecast, setForecast] = useState(null);

  const [location, setLocation] = useState("Loading location...");
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        try {
          const res = await fetch(
            `https://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}`
          );
          const data = await res.json();

          if (Array.isArray(data) && data.length > 0) {
            const city = data[0].name || "";
            const region = data[0].region || "";
            const country = data[0].country || "";
            // setLocation(`${city}, ${region}, ${country}`);
            setLocation(`${city}`);
            setCoord(`${data[0].lat},${data[0].lon}`)
            console.table(data);
          } else {
            setLocation("No matching location found");
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          setLocation("Failed to get location name");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocation("Location permission denied");
      }
    );
  }, []);

  useEffect(() => {
    if (!coord) return;
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${coord}&days=2&aqi=yes&alerts=no`
        );
        const data = await res.json();
        setForecast(data);
      } catch (err) {
        console.error('Error fetching forecast:', err);
        setError('Failed to load forecast');
      }
    };
    fetchWeather();
  }, [coord]);

  return (
    <div className="w-full px-8 py-8 font-grotesk flex flex-wrap justify-center gap-4">
      {coord && <TimeComp coord={coord} />}
      {forecast &&
        <Current
          coord={coord}
          setCoord={setCoord}
          forecast={forecast}
          setForecast={setForecast}
          location={location}
          setLocation={setLocation}
        />}
      <div className="h-full flex flex-col gap-y-4 shrink w-128 max-w-full">
        {forecast && <AirQuality forecast={forecast} />}
        {forecast && <HourlyForecast forecast={forecast} />}
      </div>
    </div>
  )
}

export default App
