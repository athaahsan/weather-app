import { useEffect, useState } from 'react';
import tzlookup from 'tz-lookup';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FiThermometer, FiSunset, FiSunrise } from 'react-icons/fi'


const TimeComp = ({ coord, forecast }) => {
    const [showDetails, setShowDetails] = useState(false);

    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const [lat, lon] = coord.split(',').map(Number);
    let timeZone;
    try {
        timeZone = tzlookup(lat, lon);
    } catch (e) {
        return <div>Invalid coordinates</div>;
    }

    const dateFormatter = new Intl.DateTimeFormat('en-EN', {
        timeZone,
        dateStyle: 'full',
    });

    const timeFormatter = new Intl.DateTimeFormat('en-EN', {
        timeZone,
        timeStyle: 'medium',
        hour12: false,
    });

    const datePart = dateFormatter.format(now);
    const timePart = timeFormatter.format(now);
    const [day, date, year] = datePart.split(", ");

    function to24HourFormat(time12h) {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'PM') {
            hours = String(parseInt(hours, 10) + 12);
        }

        return `${hours.padStart(2, '0')}:${minutes}`;
    }




    return (
        <>
            <div className="card bg-base-200 w-fit h-full shadow">
                <div className="card-body items-center text-center">
                    <p>{day}</p>
                    <h2 className="card-title font-normal">{`${date}, ${year}`}</h2>
                    <p>{timePart}</p>

                    <div
                        className="divider mx-0 my-0 text-gray-500"
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        {showDetails ? <FaAngleUp /> : <FaAngleDown />}
                    </div>
                    <div
                        className={`overflow-hidden transition-all duration-300 ${showDetails ? "max-h-[100px]" : "max-h-0"}`}
                    >
                        <div className="grid grid-cols-1 gap-y-4 text-base-content">
                            <div className="flex items-center gap-2">
                                <FiSunrise className="text-lg" />
                                <div className="flex flex-col leading-tight items-start">
                                    <span className="text-sm">{to24HourFormat(forecast.forecast.forecastday[0].astro.sunrise)}</span>
                                    <span className="text-xs text-gray-500">Sunrise</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiSunset className="text-lg" />
                                <div className="flex flex-col leading-tight items-start">
                                    <span className="text-sm">{to24HourFormat(forecast.forecast.forecastday[0].astro.sunset)}</span>
                                    <span className="text-xs text-gray-500">Sunset</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TimeComp;
