import React from 'react';

interface ImageModalProps {
  isOpen: boolean;
  imageData: string;
  animalName: string;
  onClose: () => void;
}

export default function ImageModal({ isOpen, imageData, animalName, onClose }: ImageModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <style>{`
        .modal-content {
          background: var(--surface-1);
          border-radius: 12px;
          padding: 1.5rem;
          max-width: 90vw;
          max-height: 90vh;
          overflow: auto;
          position: relative;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal-image {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          display: block;
        }
        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--surface-2);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          cursor: pointer;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: background 0.2s;
        }
        .modal-close:hover {
          background: var(--surface-3);
        }
      `}</style>

      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} title="Close">
          ✕
        </button>
        <img src={imageData} alt={animalName} className="modal-image" />
      </div>
    </div>
  );
}
