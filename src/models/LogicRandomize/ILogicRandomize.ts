import Point from '../Point';

interface ILogicRandomize {
    getRandomPosition(mapSize: number): Point;
    getRandomCellValue(): number;
}

export default ILogicRandomize;