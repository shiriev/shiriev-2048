import Point from '../Point';

interface ILogicRandomize {
    getRandomPosition(mapDimension: number): Point;
    getRandomCellValue(): number;
}

export default ILogicRandomize;
