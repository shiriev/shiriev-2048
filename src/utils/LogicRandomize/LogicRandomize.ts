import ILogicRandomize from "./ILogicRandomize";
import Point from "../Point";

class LogicRandomize implements ILogicRandomize {
    getRandomPosition(matrixSize: number): Point {
        return new Point(
            this.getRandomIntInclusive(0, matrixSize - 1),
            this.getRandomIntInclusive(0, matrixSize - 1)
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