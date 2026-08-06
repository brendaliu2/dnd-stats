import { useState } from 'react';
import ImageModal from './ImageModel';
import { ConjuredAnimal } from '../types';
import '../styles/AnimalCard.css';

interface AnimalCardProps {
  animal: ConjuredAnimal;
  damageInput: string;
  onDamageInputChange: (value: string) => void;
  onApplyDamage: (id: string) => void;
  healingInput: string;
  onHealingInputChange: (value: string) => void;
  onApplyHealing: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function AnimalCard({
  animal,
  damageInput,
  onDamageInputChange,
  onApplyDamage,
  healingInput,
  onHealingInputChange,
  onApplyHealing,
  onDelete,
}: AnimalCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hpPercent = (animal.currentHp / animal.maxHp) * 100;
  const isDead = animal.currentHp <= 0;

  return (
    <>
      <div className="animal-card">
        {animal.imageData && (
          <div className="card-image-section" onClick={() => setIsModalOpen(true)}>
            <img src={animal.imageData} alt={animal.name} className="animal-image" />
          </div>
        )}

        <div className="card-content">
          <div className="animal-name">{animal.name} {animal.count}</div>
          <div className={`hp-display ${isDead ? 'dead' : ''}`}>
            {animal.currentHp} / {animal.maxHp}
          </div>

          <div
            className={`hp-bar ${isDead ? 'dead' : ''}`}
            style={{ width: `${Math.max(0, hpPercent)}%` }}
          />

          <div className="damage-section">
            <input
              type="number"
              placeholder="she's hurt"
              value={damageInput}
              onChange={(e) => onDamageInputChange(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onApplyDamage(animal.id);
                }
              }}
            />
            <button
              className="btn-apply"
              onClick={() => onApplyDamage(animal.id)}
            >
              Damage
            </button>
          </div>

          <div className="healing-section">
            <input
              type="number"
              placeholder="she's healed"
              value={healingInput}
              onChange={(e) => onHealingInputChange(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onApplyHealing(animal.id);
                }
              }}
              disabled={animal.currentHp === animal.maxHp}
            />
            <button
              className="btn-heal"
              onClick={() => onApplyHealing(animal.id)}
              disabled={animal.currentHp === animal.maxHp}
            >
              Heal
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
