import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function CustomExerciseModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setCategory("");
      setDescription("");
      setImageUrl("");
      setVideoUrl("");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    onCreate({ name, category, description, imageUrl, videoUrl });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Add a custom exercise"
      buttonText="Add Exercise"
      onSubmit={handleSubmit}
    >
      <label className="form-modal__label">
        Name
        <input
          className="form-modal__input"
          type="text"
          required
          minLength={1}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className="form-modal__label">
        Category
        <input
          className="form-modal__input"
          type="text"
          placeholder="e.g. legs, chest, full body"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <label className="form-modal__label">
        Description
        <textarea
          className="form-modal__input"
          rows={5}
          placeholder="How to perform it (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label className="form-modal__label">
        Image URL
        <input
          className="form-modal__input"
          type="url"
          placeholder="Paste an image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </label>
      <label className="form-modal__label">
        Video URL
        <input
          className="form-modal__input"
          type="url"
          placeholder="Paste a video link (optional)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </label>
    </ModalWithForm>
  );
}

export default CustomExerciseModal;
