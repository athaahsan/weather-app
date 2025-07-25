import React from 'react'
import HourlyForecast from './HourlyForecast'

const AirQuality = ({ forecast }) => {
    return (
        <>
            <ul className="list bg-base-300 rounded-box shadow h-full">
                <li className="px-4 py-3 opacity-60 text-xs tracking-wide">Air Quality</li>
                <div className="stats bg-base-200 h-full overflow-x-auto rounded-t-none">
                    <div className="stat place-items-center w-full h-full">
                        {forecast.current.air_quality["us-epa-index"] === 1 && <div className="stat-desc text-sm text-green-400">Good</div>}
                        {forecast.current.air_quality["us-epa-index"] === 2 && <div className="stat-desc text-sm text-yellow-400">Moderate</div>}
                        {forecast.current.air_quality["us-epa-index"] === 3 && <div className="stat-desc text-sm text-orange-400">Unhealthy for Sensitive Groups</div>}
                        {forecast.current.air_quality["us-epa-index"] === 4 && <div className="stat-desc text-sm text-red-400">Unhealthy</div>}
                        {forecast.current.air_quality["us-epa-index"] === 5 && <div className="stat-desc text-sm text-red-500">Very Unhealthy</div>}
                        {forecast.current.air_quality["us-epa-index"] === 6 && <div className="stat-desc text-sm text-red-600">Hazardous</div>}
                        <div className="stat-desc text-sm">US EPA Index</div>
                    </div>
                    <div className="stat place-items-center w-full h-full">
                        {(() => {
                            const pm25 = Number(forecast.current.air_quality.pm2_5);
                            let color = "text-gray-400";
                            if (pm25 <= 12) color = "text-green-400";
                            else if (pm25 <= 35.4) color = "text-yellow-400";
                            else if (pm25 <= 55.4) color = "text-orange-400";
                            else if (pm25 <= 150.4) color = "text-red-400";
                            else if (pm25 <= 250.4) color = "text-red-500";
                            else color = "text-red-600";
                            return (
                                <div className={`stat-desc text-sm ${color}`}>
                                    {pm25.toFixed(2)}
                                </div>
                            );
                        })()}
                        <div className="stat-desc text-sm">PM2.5</div>
                    </div>
                    <div className="stat place-items-center w-full h-full">
                        {(() => {
                            const pm10 = Number(forecast.current.air_quality.pm10);
                            let color = "text-gray-400";
                            if (pm10 <= 54) color = "text-green-400";
                            else if (pm10 <= 154) color = "text-yellow-400";
                            else if (pm10 <= 254) color = "text-orange-400";
                            else if (pm10 <= 354) color = "text-red-400";
                            else if (pm10 <= 424) color = "text-red-500";
                            else color = "text-red-600";
                            return (
                                <div className={`stat-desc text-sm ${color}`}>
                                    {pm10.toFixed(2)}
                                </div>
                            );
                        })()}
                        <div className="stat-desc text-sm">PM10</div>
                    </div>
                    <div className="stat place-items-center w-full h-full">
                        {(() => {
                            const co = Number(forecast.current.air_quality.co);
                            let color = "text-gray-400";
                            if (co <= 4400) color = "text-green-400";
                            else if (co <= 9400) color = "text-yellow-400";
                            else if (co <= 12400) color = "text-orange-400";
                            else if (co <= 15400) color = "text-red-400";
                            else if (co <= 30400) color = "text-red-500";
                            else color = "text-red-600";
                            return (
                                <div className={`stat-desc text-sm ${color}`}>
                                    {co.toFixed(2)}
                                </div>
                            );
                        })()}
                        <div className="stat-desc text-sm">CO</div>
                    </div>
                    <div className="stat place-items-center w-full h-full">
                        {(() => {
                            const no2 = Number(forecast.current.air_quality.no2);
                            let color = "text-gray-400";
                            if (no2 <= 40) color = "text-green-400";
                            else if (no2 <= 100) color = "text-yellow-400";
                            else if (no2 <= 200) color = "text-orange-400";
                            else if (no2 <= 400) color = "text-red-400";
                            else if (no2 <= 800) color = "text-red-500";
                            else color = "text-red-600";
                            return (
                                <div className={`stat-desc text-sm ${color}`}>
                                    {no2.toFixed(2)}
                                </div>
                            );
                        })()}
                        <div className="stat-desc text-sm">NO₂</div>
                    </div>
                    <div className="stat place-items-center w-full h-full">
                        {(() => {
                            const so2 = Number(forecast.current.air_quality.so2);
                            let color = "text-gray-400";
                            if (so2 <= 80) color = "text-green-400";
                            else if (so2 <= 380) color = "text-yellow-400";
                            else if (so2 <= 800) color = "text-orange-400";
                            else if (so2 <= 1600) color = "text-red-400";
                            else if (so2 <= 2100) color = "text-red-500";
                            else color = "text-red-600";
                            return (
                                <div className={`stat-desc text-sm ${color}`}>
                                    {so2.toFixed(2)}
                                </div>
                            );
                        })()}
                        <div className="stat-desc text-sm">SO₂</div>
                    </div>
                    <div className="stat place-items-center w-full h-full">
                        {(() => {
                            const o3 = Number(forecast.current.air_quality.o3);
                            let color = "text-gray-400";
                            if (o3 <= 60) color = "text-green-400";
                            else if (o3 <= 120) color = "text-yellow-400";
                            else if (o3 <= 180) color = "text-orange-400";
                            else if (o3 <= 240) color = "text-red-400";
                            else if (o3 <= 360) color = "text-red-500";
                            else color = "text-red-600";
                            return (
                                <div className={`stat-desc text-sm ${color}`}>
                                    {o3}
                                </div>
                            );
                        })()}
                        <div className="stat-desc text-sm">O₃</div>
                    </div>
                </div>
            </ul>
        </>
    )
}

export default AirQuality