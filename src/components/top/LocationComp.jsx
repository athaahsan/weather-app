import React from 'react'
import SearchModal from './SearchModal';
import { useEffect, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { MdLocationOn } from "react-icons/md";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const LocationComp = () => {
    const [location, setLocation] = useState("Loading location...");

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

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
                        setLocation(`${city}, ${country}`);
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



    return (
        <>
            <button
                className="btn btn-soft font-grotesk font-normal btn-xs sm:btn-sm md:btn-md lg:btn-lg flex rounded-full"
                onClick={() => document.getElementById('my_modal_2').showModal()}
            >
                <FiMapPin />
                {location}
            </button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <SearchModal setLocation={setLocation} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default LocationComp