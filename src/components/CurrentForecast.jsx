import React, { useEffect, useState } from 'react';
import LocationComp from './LocationComp';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FiThermometer, FiWind, FiCloud, FiUmbrella, FiEye, FiSun } from 'react-icons/fi'
import { WiHumidity, WiBarometer, WiCloudy } from 'react-icons/wi'
import { MdAir, MdMasks, MdOutlineWaterDrop } from 'react-icons/md'
import { TbGauge } from 'react-icons/tb'
import { PiThermometer } from "react-icons/pi";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Current = ({ coord, setCoord, forecast, setForecast, location, setLocation }) => {
    const [showDetails, setShowDetails] = useState(true);

    return (
        <>
            <div className="card bg-base-200 card-xl shadow-sm h-full">
                <div className="card-body items-center text-center py-8 px-8">
                    <LocationComp setCoord={setCoord} location={location} setLocation={setLocation} />
                    <div className="flex justify-between items-center gap-2 mt-4">
                        <img
                            src={`https:${forecast.current.condition.icon}`}
                            alt="weather icon"
                            className="h-[2.5rem] w-auto"
                        />
                        <h2 className="text-4xl">
                            {`${forecast.current.temp_c}°C`}
                        </h2>
                    </div>
                    <p>
                        {forecast.current.condition.text}
                    </p>
                    <div
                        className="divider mx-0 mb-0 mt-4 text-gray-500"
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        {showDetails ? <FaAngleUp /> : <FaAngleDown />}
                    </div>
                    <div
                        className={`overflow-hidden transition-all duration-300 ${showDetails ? "max-h-[480px] sm:max-h-[240px]" : "max-h-0"}`}
                    >
                        <div className="grid grid-cols-2 gap-x-2 sm:gap-x-6 gap-y-4 text-base-content">
                            <div className="flex items-center gap-2">
                                <FiThermometer className="text-lg sm:text-xl" />
                                <div className="flex flex-col leading-tight items-start">
                                    <span className="text-sm sm:text-base">{forecast.current.feelslike_c}°C</span>
                                    <span className="text-xs sm:text-sm text-gray-500">Feels Like</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiUmbrella className="text-lg sm:text-xl" />
                                <div className="flex flex-col leading-tight items-start">
                                    <span className="text-sm sm:text-base">{forecast.current.precip_mm} mm</span>
                                    <span className="text-xs sm:text-sm text-gray-500">Precipitation </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <MdOutlineWaterDrop className="text-lg sm:text-xl" />
                                <div className="flex flex-col leading-tight items-start">
                                    <span className="text-sm sm:text-base">{forecast.current.humidity}%</span>
                                    <span className="text-xs sm:text-sm text-gray-500">Humidity</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiCloud className="text-lg sm:text-xl" />
                                <div className="flex flex-col leading-tight items-start">
                                    <span className="text-sm sm:text-base">{forecast.current.cloud}%</span>
                                    <span className="text-xs sm:text-sm text-gray-500">Cloud Cover</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiWind className="text-lg sm:text-xl" />
                                <div className="flex flex-col leading-tight items-start">
                                    <span className="text-sm sm:text-base">{forecast.current.wind_kph} kph</span>
                                    <span className="text-xs sm:text-sm text-gray-500">Wind</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <TbGauge className="text-lg sm:text-xl" />
                                <div className="flex flex-col leading-tight items-start">
                                    <span className="text-sm sm:text-base">{forecast.current.pressure_mb} mb</span>
                                    <span className="text-xs sm:text-sm text-gray-500">Pressure</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiEye className="text-lg sm:text-xl" />
                                <div className="flex flex-col leading-tight items-start">
                                    <span className="text-sm sm:text-base">{forecast.current.vis_km} km</span>
                                    <span className="text-xs sm:text-sm text-gray-500">Visibility</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiSun className="text-lg sm:text-xl" />
                                <div className="flex flex-col leading-tight items-start">
                                    <span className="text-sm sm:text-base">{forecast.current.uv}</span>
                                    <span className="text-xs sm:text-sm text-gray-500">UV</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Current