import dragonImg from './images/adult-red-dragon.png';
import constrictorSnakeImg from './images/constrictor-snake.png'

interface Creature {
    name: string;
    hp: number;
    challengeRating: number;
    image: string; // or your specific image type
}

const creatureKey: Array<Creature> = [
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
];

creatureKey.sort((a, b) => a.challengeRating - b.challengeRating);

export default creatureKey