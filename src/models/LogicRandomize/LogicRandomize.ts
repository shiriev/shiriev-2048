import ILogicRandomize from './ILogicRandomize';
import Point from '../Point';

class LogicRandomize implements ILogicRandomize {
    getRandomPosition(mapDimension: number): Point {
        return new Point(
            this.getRandomIntInclusive(0, mapDimension - 1),
            this.getRandomIntInclusive(0, mapDimension - 1)
        );
    }
    getRandomCellValue(): number {
        return this.getRandomIntInclusive(0, 5) > 0 ? 2 : 4;
    }

    private getRandomIntInclusive(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default LogicRandomize;
