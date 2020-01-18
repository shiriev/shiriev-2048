import Point from "../Point";

interface IRandomize {
    getRandomPosition(mapSize: number): Point;
    getRandomCellValue(): number;
}

export default IRandomize;