

const Navbar = ({
    toggleTemp, setToggleTemp,
    togglePrecipitation, setTogglePrecipitation,
    toggleWind, setToggleWind,
    togglePressure, setTogglePressure,
    toggleVisibility, setToggleVisibility
}) => {
    const tempChange = (e) => {
        setToggleTemp(e.target.value);
    };
    const precipitationChange = (e) => {
        setTogglePrecipitation(e.target.value);
    };
    const windChange = (e) => {
        setToggleWind(e.target.value);
    };
    const pressureChange = (e) => {
        setTogglePressure(e.target.value);
    };
    const visibilityChange = (e) => {
        setToggleVisibility(e.target.value);
    };

    return (
        <>
            <div className="navbar bg-base-300 shadow sticky top-0 z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-base-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="list menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li className="list-row flex flex-col gap-2">
                                <p className="text-xs p-0 pointer-events-none">Temperature</p>
                                <div className="join p-0 m-0 gap-0 hover:bg-base-100">
                                    <input
                                        className="join-item btn btn-sm w-1/2"
                                        type="radio"
                                        name="temp_opt"
                                        value="°C"
                                        aria-label="°C"
                                        checked={toggleTemp === '°C'}
                                        onChange={tempChange}
                                    />
                                    <input
                                        className="join-item btn btn-sm w-1/2"
                                        type="radio"
                                        name="temp_opt"
                                        value="°F"
                                        aria-label="°F"
                                        checked={toggleTemp === '°F'}
                                        onChange={tempChange}
                                    />
                                </div>
                            </li>
                            <li className="list-row flex flex-col gap-2">
                                <p className="text-xs p-0 pointer-events-none">Precipitation</p>
                                <div className="join p-0 m-0 gap-0 hover:bg-base-100">
                                    <input
                                        className="join-item btn btn-sm w-1/2"
                                        type="radio"
                                        name="preci_opt"
                                        value="mm"
                                        aria-label="mm"
                                        checked={togglePrecipitation === 'mm'}
                                        onChange={precipitationChange}
                                    />
                                    <input
                                        className="join-item btn btn-sm w-1/2"
                                        type="radio"
                                        name="preci_opt"
                                        aria-label="in"
                                        value="in"
                                        checked={togglePrecipitation === 'in'}
                                        onChange={precipitationChange}
                                    />
                                </div>
                            </li>
                            <li className="list-row flex flex-col gap-2">
                                <p className="text-xs p-0 pointer-events-none">Wind</p>
                                <div className="join p-0 m-0 gap-0 hover:bg-base-100">
                                    <input
                                        className="join-item btn btn-sm w-1/2"
                                        type="radio"
                                        name="wind_opt"
                                        aria-label="kph"
                                        value="kph"
                                        checked={toggleWind === 'kph'}
                                        onChange={windChange}
                                    />
                                    <input
                                        className="join-item btn btn-sm w-1/2"
                                        type="radio"
                                        name="wind_opt"
                                        aria-label="mph"
                                        value="mph"
                                        checked={toggleWind === 'mph'}
                                        onChange={windChange}
                                    />
                                </div>
                            </li>
                            <li className="list-row flex flex-col gap-2">
                                <p className="text-xs p-0 pointer-events-none">Pressure</p>
                                <div className="join p-0 m-0 gap-0 hover:bg-base-100">
                                    <input
                                        className="join-item btn btn-sm w-1/2"
                                        type="radio"
                                        name="press_opt"
                                        aria-label="mb"
                                        value="mb"
                                        checked={togglePressure === 'mb'}
                                        onChange={pressureChange}
                                    />
                                    <input
                                        className="join-item btn btn-sm w-1/2"
                                        type="radio"
                                        name="press_opt"
                                        aria-label="in"
                                        value="in"
                                        checked={togglePressure === 'in'}
                                        onChange={pressureChange}
                                    />
                                </div>
                            </li>
                            <li className="list-row flex flex-col gap-2">
                                <p className="text-xs p-0 pointer-events-none">Visibility</p>
                                <div className="join p-0 m-0 gap-0 hover:bg-base-100">
                                    <input
                                        className="join-item btn btn-sm w-1/2"
                                        type="radio"
                                        name="vis_opt"
                                        aria-label="km"
                                        value="km"
                                        checked={toggleVisibility === 'km'}
                                        onChange={visibilityChange}
                                    />
                                    <input
                                        className="join-item btn btn-sm w-1/2"
                                        type="radio"
                                        name="vis_opt"
                                        aria-label="miles"
                                        value="miles"
                                        checked={toggleVisibility === 'miles'}
                                        onChange={visibilityChange}
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center gap-2">
                    <img
                        src={`/weather.png`}
                        alt="weather icon"
                        className="h-[1.5rem] w-auto"
                    />
                    <a className="text-xl">Weathly</a>
                </div>
                <div className="navbar-end">
                    <a
                        href="https://github.com/athaahsan/weather-app"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Repository"
                        className="text-gray-500 mr-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                        >
                            <title>GitHub</title>
                            <path d="M12 0C5.371 0 0 5.373 0 12c0 5.302 
      3.438 9.8 8.207 11.387.6.111.793-.26.793-.577 
      0-.285-.011-1.04-.017-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 
      1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.495.997.107-.775.418-1.305.762-1.605-2.665-.305-5.467-1.335-5.467-5.93 
      0-1.31.468-2.381 1.235-3.221-.123-.303-.535-1.527.117-3.176 
      0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 
      2.291-1.552 3.297-1.23 3.297-1.23.653 1.649.241 2.873.119 
      3.176.77.84 1.233 1.911 1.233 3.221 
      0 4.609-2.807 5.624-5.479 5.921.43.371.823 1.103.823 2.222 
      0 1.606-.015 2.898-.015 3.293 
      0 .32.192.694.801.576C20.565 21.796 24 17.3 24 12 
      24 5.373 18.627 0 12 0z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </>
    )
}

export default Navbar