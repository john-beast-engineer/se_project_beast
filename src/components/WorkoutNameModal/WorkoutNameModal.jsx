import "./WorkoutNameModal.css";
import { useState } from "react";

function WorkoutNameModal({ onCreate, onClose }) {
    const [name, setName] = useState("");

    const handleSubmit = () => {
        if (name.trim()) {
            onCreate(name);
        }
    };

    return (
        <div className="modal">
            <div className="modal__container">
                <button className="modal__close" type="button" onClick={onClose} />
                <h2 className="modal__caption">Name your workout</h2>
                <input
                    className="modal__input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Leg Day, Cardio Blast"
                />
                <button
                    className="modal__complete-btn"
                    type="button"
                    onClick={handleSubmit}
                >
                    Create
                </button>
            </div>
        </div>
    );
}

export default WorkoutNameModal;