import IRandomize from "./IRandomize";
import Point from "../Point";

class Randomize implements IRandomize {
    getRandomPosition(mapSize: number): import("../Point").default {
        return new Point(
            this.getRandomIntInclusive(0, mapSize - 1),
            this.getRandomIntInclusive(0, mapSize - 1)
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

export default Randomize;