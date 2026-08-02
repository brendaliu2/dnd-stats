import dragonImg from './images/adult-red-dragon.png';
import constrictorSnakeImg from './images/constrictor-snake.png'
import boarImg from './images/boar.png'

interface Creature {
    name: string;
    hp: number;
    challengeRating: number;
    image: string; // or your specific image type
}

const animalKey: Array<Creature> = [
    {
        "name": "adult red dragon",
        "hp": 256,
        "challengeRating": 17,
        "image": dragonImg
    },
    {
        "name": "constrictor snake",
        "hp": 13,
        "challengeRating": 1/4,
        "image": constrictorSnakeImg
    },
    {
        "name": "boar",
        "hp": 11,
        "challengeRating": 1/4,
        "image": boarImg
    },
];

const feyKey: Array<Creature> = [
    {
        "name": "adult red dragon",
        "hp": 256,
        "challengeRating": 17,
        "image": dragonImg
    }
];

animalKey.sort((a, b) => a.challengeRating - b.challengeRating);

export {animalKey, feyKey}