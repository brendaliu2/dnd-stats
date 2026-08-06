export interface ConjuredAnimal {
  id: string;
  name: string;
  count: number;
  maxHp: number;
  currentHp: number;
  imageData?: string;
}

export interface SavedAnimal {
  name: string;
  hp: number;
  hitDie: number;
  challengeRating: number;
  image: string;
}