import { FiSettings } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";

const Configuration = () => {
    return (
        <>


            <button className="btn shadow-sm" onClick={() => document.getElementById('conf').showModal()}>
                <FiSettings className="text-lg bg-base-300" />
            </button>
            <dialog id="conf" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-8">Unit Settings</h3>

                    <div className="join mr-4 mb-4">
                        <input className="join-item btn" type="radio" name="temp_opt" aria-label="°C" />
                        <input className="join-item btn" type="radio" name="temp_opt" aria-label="°F" />
                    </div>

                    <div className="join mr-4 mb-4">
                        <input className="join-item btn" type="radio" name="preci_opt" aria-label="mm" />
                        <input className="join-item btn" type="radio" name="preci_opt" aria-label="in" />
                    </div>

                    <div className="join mr-4 mb-4">
                        <input className="join-item btn" type="radio" name="wind_opt" aria-label="kph" />
                        <input className="join-item btn" type="radio" name="wind_opt" aria-label="mph" />
                    </div>

                    <div className="join mr-4 mb-4">
                        <input className="join-item btn" type="radio" name="vis_opt" aria-label="km" />
                        <input className="join-item btn" type="radio" name="vis_opt" aria-label="miles" />
                    </div>

                    <div className="join mr-4 mb-4">
                        <input className="join-item btn" type="radio" name="press_opt" aria-label="mb" />
                        <input className="join-item btn" type="radio" name="press_opt" aria-label="in" />
                    </div>
                    
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default Configuration