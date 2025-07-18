import { useEffect, useState } from 'react';
import tzlookup from 'tz-lookup';

const TimeComp = ({ coord }) => {
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

    const datePart = dateFormatter.format(now); // → "Friday, July 18, 2025"
    const timePart = timeFormatter.format(now); // → "06:10:29"
    const [day, date, year] = datePart.split(", ");



    return (
        <>
            <div className="card bg-base-200 w-fit h-full shadow-sm">
                <div className="card-body items-center text-center">
                    <p>{day}</p>
                    <h2 className="card-title font-normal">{`${date}, ${year}`}</h2>
                    <p>{timePart}</p>
                </div>
            </div>
        </>
    );
};

export default TimeComp;
