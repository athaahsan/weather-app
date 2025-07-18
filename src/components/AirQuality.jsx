import React from 'react'
import HourlyForecast from './HourlyForecast'

const AirQuality = ({ forecast }) => {
    return (
        <>
            <ul className="list bg-base-300 rounded-box shadow-sm h-full">
                <li className="px-4 py-3 opacity-60 text-xs tracking-wide">Air Quality Index</li>
                <div className="stats bg-base-200 h-full overflow-x-auto rounded-t-none">
                    <div className="stat place-items-center w-full h-full">
                        <div className="stat-desc text-sm">{forecast.current.air_quality.pm2_5}</div>
                        <div className="stat-desc text-sm">PM2.5</div>
                    </div>
                    <div className="stat place-items-center w-full h-full">
                        <div className="stat-desc text-sm">{forecast.current.air_quality.pm10}</div>
                        <div className="stat-desc text-sm">PM10</div>
                    </div>
                    <div className="stat place-items-center w-full h-full">
                        <div className="stat-desc text-sm">{forecast.current.air_quality.so2}</div>
                        <div className="stat-desc text-sm">SO₂</div>
                    </div>
                    <div className="stat place-items-center w-full h-full">
                        <div className="stat-desc text-sm">{forecast.current.air_quality.no2}</div>
                        <div className="stat-desc text-sm">NO₂</div>
                    </div>
                    <div className="stat place-items-center w-full h-full">
                        <div className="stat-desc text-sm">{forecast.current.air_quality.o3}</div>
                        <div className="stat-desc text-sm">O₃</div>
                    </div>
                    <div className="stat place-items-center w-full h-full">
                        <div className="stat-desc text-sm">{forecast.current.air_quality.co}</div>
                        <div className="stat-desc text-sm">CO</div>
                    </div>
                </div>
            </ul>
        </>
    )
}

export default AirQuality