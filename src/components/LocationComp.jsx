import SearchModal from './SearchModal';
import { useEffect, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { MdLocationOn } from "react-icons/md";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const LocationComp = ({ coord, setCoord, location, setLocation }) => {

    return (
        <>
            <button
                className="btn btn-soft font-normal flex rounded-full"
                onClick={() => document.getElementById('my_modal_2').showModal()}
            >
                <FiMapPin />
                {location}
            </button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <SearchModal setLocation={setLocation} coord= {coord} setCoord={setCoord} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default LocationComp