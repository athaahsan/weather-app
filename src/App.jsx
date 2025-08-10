import CurrentForecast from "./components/CurrentForecast.jsx";
import HourlyForecast from './components/HourlyForecast.jsx';
import TimeComp from "./components/TimeComp.jsx";
import AirQuality from "./components/AirQuality.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import './App.css'
import { useEffect, useState } from 'react';
import sendUserInfo from "./sendUserInfo.js"

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [toggleTemp, setToggleTemp] = useState(() => {
    return localStorage.getItem("toggleTemp") || "°C";
  });
  const [togglePrecipitation, setTogglePrecipitation] = useState(() => {
    return localStorage.getItem("togglePrecipitation") || "mm";
  });
  const [toggleWind, setToggleWind] = useState(() => {
    return localStorage.getItem("toggleWind") || "kph";
  });
  const [togglePressure, setTogglePressure] = useState(() => {
    return localStorage.getItem("togglePressure") || "mb";
  });
  const [toggleVisibility, setToggleVisibility] = useState(() => {
    return localStorage.getItem("toggleVisibility") || "km";
  });

  useEffect(() => {
    localStorage.setItem("toggleTemp", toggleTemp);
  }, [toggleTemp]);
  useEffect(() => {
    localStorage.setItem("togglePrecipitation", togglePrecipitation);
  }, [togglePrecipitation]);
  useEffect(() => {
    localStorage.setItem("toggleWind", toggleWind);
  }, [toggleWind]);
  useEffect(() => {
    localStorage.setItem("togglePressure", togglePressure);
  }, [togglePressure]);
  useEffect(() => {
    localStorage.setItem("toggleVisibility", toggleVisibility);
  }, [toggleVisibility]);


  const [location, setLocation] = useState(() => {
    return localStorage.getItem("location") || "London";
  });
  const [coord, setCoord] = useState(() => {
    return localStorage.getItem("coord") || "51.52,-0.11";
  });
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    sendUserInfo();
  }, []);

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
            const newCoord = `${data[0].lat},${data[0].lon}`;
            setLocation(city);
            setCoord(newCoord);
            localStorage.setItem("location", city);
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
    localStorage.setItem("coord", coord);
  }, [coord]);

  return (
    <>
      <div className="min-h-screen flex flex-col font-grotesk">
        <main className="flex-1">
          <Navbar
            toggleTemp={toggleTemp} setToggleTemp={setToggleTemp}
            togglePrecipitation={togglePrecipitation} setTogglePrecipitation={setTogglePrecipitation}
            toggleWind={toggleWind} setToggleWind={setToggleWind}
            togglePressure={togglePressure} setTogglePressure={setTogglePressure}
            toggleVisibility={toggleVisibility} setToggleVisibility={setToggleVisibility}
          />
          <div className="w-full px-8 py-8 flex flex-wrap justify-center gap-4">
            {forecast && <TimeComp coord={coord} forecast={forecast} />}
            {forecast &&
              <CurrentForecast
                coord={coord}
                setCoord={setCoord}
                forecast={forecast}
                setForecast={setForecast}
                location={location}
                setLocation={setLocation}
                toggleTemp={toggleTemp}
                togglePrecipitation={togglePrecipitation}
                toggleWind={toggleWind}
                togglePressure={togglePressure}
                toggleVisibility={toggleVisibility}
              />}
            <div className="h-full flex flex-col gap-y-4 shrink w-144 max-w-full">
              {forecast && <AirQuality forecast={forecast} />}
              {forecast && <HourlyForecast
                forecast={forecast}
                toggleTemp={toggleTemp}
                togglePrecipitation={togglePrecipitation}
                toggleWind={toggleWind}
                togglePressure={togglePressure}
                toggleVisibility={toggleVisibility}
              />}
            </div>
          </div>
          <div></div>
        </main>
        <Footer />
      </div>
    </>

  )
}

export default App
