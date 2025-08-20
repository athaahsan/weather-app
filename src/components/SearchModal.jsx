import { useState, useEffect } from 'react'
import { MdMyLocation } from "react-icons/md";

const SearchModal = ({ setLocation, coord, setCoord }) => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    const detectLocation = async () => {
        if (!navigator.geolocation) {
            setLocation("Geolocation not supported")
            return
        }
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords
                try {
                    const res = await fetch(
                        `/.netlify/functions/getWeather?type=search&q=${latitude},${longitude}`
                    );
                    const data = await res.json()
                    if (Array.isArray(data) && data.length > 0) {
                        const city = data[0].name || ""
                        const country = data[0].country || ""
                        const newCoord = `${data[0].lat},${data[0].lon}`
                        setLocation(`${city}`)
                        setCoord(newCoord)
                        localStorage.setItem("location", city);
                        console.table(data)
                    } else {
                        setLocation("No matching location found")
                    }
                } catch (error) {
                    console.error("Geocoding error:", error)
                    setLocation("Failed to get location name")
                }
            },
            (error) => {
                console.error("Geolocation error:", error)
                setLocation("Location permission denied")
            }
        )
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.length > 1) {
                fetch(
                    `/.netlify/functions/getWeather?type=search&q=${query}`
                )
                    .then((res) => res.json())
                    .then((data) => {
                        const unique = []
                        const seen = new Set()
                        for (const item of data) {
                            const key = `${item.name}-${item.region}-${item.country}`
                            if (!seen.has(key)) {
                                seen.add(key)
                                unique.push(item)
                            }
                        }
                        setResults(unique)
                    })
                    .catch((err) => console.error('Error:', err))
            } else {
                setResults([])
            }
        }, 250) // debounce 250ms
        return () => clearTimeout(delayDebounce)
    }, [query])

    return (
        <>
            <label className="input w-full">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input
                    type="search"
                    className="grow"
                    placeholder="Enter a location"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </label>
            <div className="mt-2 w-full">
                <form method="dialog">
                    <ul className="list bg-base-100 rounded-box shadow">
                        <button
                            className="btn btn-soft btn-primary font-normal justify-start w-full text-left"
                            onClick={detectLocation}
                        >
                            <MdMyLocation />
                            Use your current location
                        </button>
                        {results.map((item) => (
                            <li key={item.id}>
                                <button
                                    type="submit"
                                    className="w-full text-left font-normal px-4 py-3 rounded-md hover:bg-base-200 whitespace-normal break-words"
                                    onClick={() => {
                                        //setLocation(`${item.name}, ${item.region}, ${item.country}`)
                                        setLocation(`${item.name}`);
                                        setCoord(`${item.lat},${item.lon}`);
                                        localStorage.setItem("coord", `${item.lat},${item.lon}`)
                                        localStorage.setItem("location", `${item.name}`);
                                    }}
                                >
                                    {item.name}, {item.region}, {item.country}
                                </button>
                            </li>
                        ))}
                    </ul>
                </form>
            </div>
        </>
    )
}

export default SearchModal