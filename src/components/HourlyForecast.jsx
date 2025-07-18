import React, { useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FiThermometer, FiWind, FiCloud, FiUmbrella, FiEye, FiSun } from 'react-icons/fi'
import { WiHumidity, WiBarometer, WiCloudy } from 'react-icons/wi'
import { MdAir, MdMasks, MdOutlineWaterDrop } from 'react-icons/md'
import { TbGauge } from 'react-icons/tb'
import { PiThermometer } from "react-icons/pi";


const HourlyForecast = ({ forecast }) => {
    const [selectedHourly, setSelectedHourly] = useState(null);

    const hourlyData = forecast.forecast.forecastday
        .flatMap(day => day.hour)
        .filter(item => item.time_epoch > forecast.location.localtime_epoch)
        .slice(0, 24);

    console.table(hourlyData);

    return (
        <>
            <ul className="list bg-base-300 rounded-box shadow-sm h-full">
                <li className="px-4 py-3 opacity-60 text-xs tracking-wide">Hourly Forecast</li>
                <div className="stats bg-base-200 h-full overflow-x-auto rounded-t-none">
                    {hourlyData.map((item, index) => (
                        <div
                            key={index}
                            className="stat place-items-center w-full h-full cursor-pointer hover:bg-base-300"
                            onClick={() => {
                                setSelectedHourly(item);
                                document.getElementById('detailHourly').showModal();
                            }}
                        >
                            <div className="stat-title">
                                {new Date(item.time).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                })}
                            </div>
                            <div className="stat-value">
                                <img
                                    src={`https:${item.condition.icon}`}
                                    alt="weather icon"
                                    className="w-10 aspect-square my-2 object-contain"
                                />
                            </div>
                            <div className="stat-desc">{item.condition.text}</div>
                            <div className="stat-desc">{item.temp_c}°C</div>
                        </div>
                    ))}
                </div>

                <dialog id="detailHourly" className="modal">
                    <div className="modal-box flex flex-col items-center justify-center w-fit">
                        <div className="card bg-base-200 card-xl shadow-sm ">
                            <div className="card-body items-center text-center py-8 px-8">
                                <h2 className="text-xl mb-4">
                                    {selectedHourly && new Date(selectedHourly.time).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })}
                                </h2>

                                {selectedHourly &&
                                    <div className="flex flex-col items-center justify-center text-center gap-2 ">
                                        <div className="flex justify-between items-center gap-2 w-fit">
                                            <img
                                                src={`https:${selectedHourly.condition.icon}`}
                                                alt="weather icon"
                                                className="h-[2.5rem] w-auto"
                                            />
                                            <h2 className="text-4xl">
                                                {`${selectedHourly.temp_c}°C`}
                                            </h2>
                                        </div>
                                        <p>
                                            {selectedHourly.condition.text}
                                        </p>
                                    </div>}
                                <div className="divider mx-0 mb-0 mt-4 text-gray-500"></div>

                                <div className="">
                                    {selectedHourly &&
                                        <div className="grid grid-cols-2 gap-x-2 sm:gap-x-6 gap-y-4 text-base-content">
                                            <div className="flex items-center gap-2">
                                                <FiThermometer className="text-lg sm:text-xl" />
                                                <div className="flex flex-col leading-tight items-start">
                                                    <span className="text-sm sm:text-base">{selectedHourly.feelslike_c}°C</span>
                                                    <span className="text-xs sm:text-sm text-gray-500">Feels Like</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FiUmbrella className="text-lg sm:text-xl" />
                                                <div className="flex flex-col leading-tight items-start">
                                                    <span className="text-sm sm:text-base">{selectedHourly.precip_mm} mm</span>
                                                    <span className="text-xs sm:text-sm text-gray-500">Precipitation </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MdOutlineWaterDrop className="text-lg sm:text-xl" />
                                                <div className="flex flex-col leading-tight items-start">
                                                    <span className="text-sm sm:text-base">{selectedHourly.humidity}%</span>
                                                    <span className="text-xs sm:text-sm text-gray-500">Humidity</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FiCloud className="text-lg sm:text-xl" />
                                                <div className="flex flex-col leading-tight items-start">
                                                    <span className="text-sm sm:text-base">{selectedHourly.cloud}%</span>
                                                    <span className="text-xs sm:text-sm text-gray-500">Cloud Cover</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FiWind className="text-lg sm:text-xl" />
                                                <div className="flex flex-col leading-tight items-start">
                                                    <span className="text-sm sm:text-base">{selectedHourly.wind_kph} kph</span>
                                                    <span className="text-xs sm:text-sm text-gray-500">Wind</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <TbGauge className="text-lg sm:text-xl" />
                                                <div className="flex flex-col leading-tight items-start">
                                                    <span className="text-sm sm:text-base">{selectedHourly.pressure_mb} mb</span>
                                                    <span className="text-xs sm:text-sm text-gray-500">Pressure</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FiEye className="text-lg sm:text-xl" />
                                                <div className="flex flex-col leading-tight items-start">
                                                    <span className="text-sm sm:text-base">{selectedHourly.vis_km} km</span>
                                                    <span className="text-xs sm:text-sm text-gray-500">Visibility</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FiSun className="text-lg sm:text-xl" />
                                                <div className="flex flex-col leading-tight items-start">
                                                    <span className="text-sm sm:text-base">{selectedHourly.uv}</span>
                                                    <span className="text-xs sm:text-sm text-gray-500">UV</span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </ul>
        </>
    )
}

export default HourlyForecast