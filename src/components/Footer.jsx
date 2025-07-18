import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="text-center text-sm text-gray-500 pb-4 pt-16 w-full flex flex-col items-center gap-2">
                <div>
                    Powered by <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer">WeatherAPI.com</a>
                </div>
                <a
                    href="https://github.com/athaahsan/weather-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Repository"
                    className="text-gray-500"
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
            </footer>
        </>
    )
}

export default Footer