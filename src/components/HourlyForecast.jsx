import React, { useEffect, useState } from 'react';


const HourlyForecast = ({ forecast }) => {
    const hourlyData = forecast.forecast.forecastday
        .flatMap(day => day.hour)
        .filter(item => item.time_epoch > forecast.location.localtime_epoch)
        .slice(0, 24);

    console.table(hourlyData);

    return (
        <>
            <ul className="list bg-base-300 rounded-box shadow-sm h-full">
                <li className="p-3 pb-3 text-xs opacity-60 tracking-wide">Hourly Forecast</li>
                <div className="stats bg-base-200 h-full overflow-x-auto rounded-t-none">
                    {hourlyData.map((item, index) => (
                        <div key={index} className="stat place-items-center w-full h-full">
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
            </ul>
        </>
    )
}

export default HourlyForecast