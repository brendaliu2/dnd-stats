import dragonImg from './images/adult-red-dragon.png';
import constrictorSnakeImg from './images/constrictor-snake.png'
import boarImg from './images/boar.png'
import sabertoothImg from './images/saber-tooth-tiger.png'
import giantEagle from './images/giant-eagle.png'

interface Creature {
    name: string;
    hp: number;
    hitDie: number;
    challengeRating: number;
    image: string; // or your specific image type
}

const animalKey: Array<Creature> = [
    {
        "name": "adult red dragon",
        "hp": 256,
        "hitDie": 19,
        "challengeRating": 17,
        "image": dragonImg
    },
    {
        "name": "constrictor snake",
        "hp": 13,
        "hitDie": 2,
        "challengeRating": 1/4,
        "image": constrictorSnakeImg
    },
    {
        "name": "boar",
        "hp": 11,
        "hitDie": 2,
        "challengeRating": 1/4,
        "image": boarImg
    },
    {
        "name": "saber-tooth tiger",
        "hp": 52,
        "hitDie": 7,
        "challengeRating": 2,
        "image": sabertoothImg
    },
    {
        "name": "giant eagle",
        "hp": 26,
        "hitDie": 4,
        "challengeRating": 1,
        "image": giantEagle
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