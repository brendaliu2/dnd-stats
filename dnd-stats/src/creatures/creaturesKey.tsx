import dragonImg from './images/adult-red-dragon.png';

interface Creature {
    hp: number;
    challengeRating: number;
    image: string; // or your specific image type
}

const creatureKey: Record<string, Creature> = {
    "dragon": {
        "hp": 256,
        "challengeRating": 17,
        "image": dragonImg
    }
};

export default creatureKey