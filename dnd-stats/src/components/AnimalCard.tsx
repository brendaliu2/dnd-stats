import { useState } from 'react';
import ImageModal from './ImageModel';
import { ConjuredAnimal } from '../types';

interface AnimalCardProps {
  animal: ConjuredAnimal;
  damageInput: string;
  onDamageInputChange: (value: string) => void;
  onApplyDamage: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function AnimalCard({
  animal,
  damageInput,
  onDamageInputChange,
  onApplyDamage,
  onDelete,
}: AnimalCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hpPercent = (animal.currentHp / animal.maxHp) * 100;
  const isDead = animal.currentHp <= 0;

  return (
    <>
      <style>{`
        .animal-card {
          background: var(--surface-1);
          border: 2px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: box-shadow 0.2s;
        }
        .animal-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-color: var(--border-strong);
        }
        .card-image-section {
          position: relative;
          overflow: hidden;
          background: var(--surface-2);
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 2px solid var(--border);
        }
        .animal-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .card-image-section:hover .animal-image {
          transform: scale(1.05);
        }
        .card-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .animal-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }
        .hp-display {
          font-size: 20px;
          font-weight: 500;
          color: #3b82f6;
          margin-bottom: 0.75rem;
          font-family: var(--font-mono, monospace);
        }
        .hp-display.dead {
          color: #ef4444;
        }
        .hp-bar {
          height: 10px;
          background: var(--surface-2);
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 1.5rem;
          border: 1px solid var(--border);
        }
        .hp-fill {
          height: 100%;
          background: #10b981;
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        .hp-fill.dead {
          background: #ef4444;
        }
        .damage-section {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .damage-section input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: 6px;
          font-size: 16px;
          background: var(--surface-2);
          color: var(--text-primary);
        }
        .damage-section input:focus {
          outline: none;
          border-color: var(--border-strong);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .damage-section input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .btn-apply {
          background: #10b981;
          color: white;
          padding: 0.75rem 1.25rem;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .btn-apply:hover:not(:disabled) {
          background: #059669;
        }
        .btn-apply:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .card-footer {
          display: flex;
          justify-content: flex-end;
          margin-top: auto;
        }
        .btn-danger {
          background: #ef4444;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-danger:hover {
          background: #dc2626;
        }
      `}</style>

      <div className="animal-card">
        {animal.imageData && (
          <div className="card-image-section" onClick={() => setIsModalOpen(true)}>
            <img src={animal.imageData} alt={animal.name} className="animal-image" />
          </div>
        )}

        <div className="card-content">
          <div className="animal-name">{animal.name}</div>
          <div className={`hp-display ${isDead ? 'dead' : ''}`}>
            {animal.currentHp} / {animal.maxHp}
          </div>

          <div className="hp-bar">
            <div
              className={`hp-fill ${isDead ? 'dead' : ''}`}
              style={{ width: `${Math.max(0, hpPercent)}%` }}
            />
          </div>

          <div className="damage-section">
            <input
              type="number"
              placeholder="Damage amount"
              value={damageInput}
              onChange={(e) => onDamageInputChange(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isDead) {
                  onApplyDamage(animal.id);
                }
              }}
              disabled={isDead}
            />
            <button
              className="btn-apply"
              onClick={() => onApplyDamage(animal.id)}
              disabled={isDead}
            >
              Damage
            </button>
          </div>

          <div className="card-footer">
            <button className="btn-danger" onClick={() => onDelete(animal.id)}>
              Remove
            </button>
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        imageData={animal.imageData || ''}
        animalName={animal.name}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
