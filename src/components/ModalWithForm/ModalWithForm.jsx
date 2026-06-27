import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
    isOpen, onClose, title, buttonText, onSubmit, children, extraAction,
}) {
    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);
    
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    if (!isOpen) return null;

    return (
        <div className="form-modal" onClick={handleOverlayClick}>
            <div className="form-modal__container">
                <button type="button" className="form-modal__close" onClick={onClose}>
                    x
                </button>
                <h2 className="form-modal__title">{title}</h2>
                <form className="form-modal__form" onSubmit={handleSubmit}>
                    {children}
                    <button type="submit" className="form-modal__submit">
                        {buttonText}
                    </button>
                </form>
                {extraAction}
            </div>
        </div>
    );
}

export default ModalWithForm;