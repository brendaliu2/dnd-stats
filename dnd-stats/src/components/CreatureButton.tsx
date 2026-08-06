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
let finalRating;
if (challengeRating === 0.25) {
  finalRating = '1/4';
} else if (challengeRating === 0.5) {
  finalRating = '1/2';
} else {
  finalRating = challengeRating
}
const displayName = `${name} - CR ${finalRating}`

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
