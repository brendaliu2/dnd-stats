import '../styles/ImageModal.css';

interface ImageModalProps {
  isOpen: boolean;
  imageData: string;
  animalName: string;
  onClose: () => void;
}

export default function ImageModal({ isOpen, imageData, animalName, onClose }: ImageModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} title="Close">
          ✕
        </button>
        <img src={imageData} alt={animalName} className="modal-image" />
      </div>
    </div>
  );
}
