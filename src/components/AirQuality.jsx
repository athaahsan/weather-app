import React from 'react'
import HourlyForecast from './HourlyForecast'

const AirQuality = ({ forecast }) => {
    return (
        <>
            <ul className="list bg-base-300 rounded-box shadow-sm h-full">
                <li className="p-3 pb-3 text-xs opacity-60 tracking-wide">Air Quality Index</li>
                <div className="stats shadow-sm bg-base-200 h-full overflow-x-auto rounded-t-none">
                    <div className="stat place-items-center w-full h-full">
                        <div className="stat-desc">{forecast.current.air_quality.pm2_5}</div>
                        <div className="stat-desc">PM2.5</div>
                    </div>
                    <div className="stat place-items-center w-full h-full">
                        <div className="stat-desc">{forecast.current.air_quality.pm10}</div>
                        <div className="stat-desc">PM10</div>
                    </div>
                    <div className="stat place-items-center w-full h-full">
                        <div className="stat-desc">{forecast.current.air_quality.so2}</div>
                        <div className="stat-desc">SO₂</div>
                    </div>
                    <div className="stat place-items-center w-full h-full">
                        <div className="stat-desc">{forecast.current.air_quality.no2}</div>
                        <div className="stat-desc">NO₂</div>
                    </div>
                    <div className="stat place-items-center w-full h-full">
                        <div className="stat-desc">{forecast.current.air_quality.o3}</div>
                        <div className="stat-desc">O₃</div>
                    </div>
                    <div className="stat place-items-center w-full h-full">
                        <div className="stat-desc">{forecast.current.air_quality.co}</div>
                        <div className="stat-desc">CO</div>
                    </div>
                </div>
            </ul>
        </>
    )
}

export default AirQuality