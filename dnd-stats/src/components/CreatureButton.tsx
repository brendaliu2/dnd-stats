import { SavedAnimal } from '../types';
import '../styles/AnimalCard.css';

interface CreatureButtonProps {
  animal: SavedAnimal;
  onaddSetAnimal: (value: SavedAnimal) => void
}

export default function CreatureButton({
  animal,
  onaddSetAnimal
}: CreatureButtonProps) {
const name = animal['name']
const challengeRating = animal['challengeRating']
const displayName = `${name} (${challengeRating})`

  return (
    <>
      <div className="animal-card">
          <button className="btn-primary" onClick={() => onaddSetAnimal(animal)}>
            {displayName}
          </button>
      </div>
    </>
  );
}
