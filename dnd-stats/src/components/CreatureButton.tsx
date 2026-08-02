import { useState } from 'react';
import ImageModal from './ImageModel';
import { ConjuredAnimal } from '../types';
import '../styles/AnimalCard.css';

interface CreatureButtonProps {
  animal: ConjuredAnimal;
}

export default function CreatureButton({
  animal,
  onaddSetAnimal
}: CreatureButtonProps) {
const name = animal['name']
const hp = animal['hp']
const challengeRating = animal['challengeRating']
const image = animal['image']
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
