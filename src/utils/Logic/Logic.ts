import Cell from "../Cell";
import Action from "../Actions/Action";
import ILogic from "./ILogic";
import Direction from "../Direction";
import IRandomize from "../Randomize/IRandomize";

class Logic implements ILogic {
    readonly mapSize : number;

    move(direction: Direction): Action[] {
        throw new Error("Method not implemented.");
    }
    addCell(): Action[] {
        throw new Error("Method not implemented.");
    }

    get matrix(): Cell[][] {
        let matrix = Array(this.mapSize).fill([]).map(() => Array(this.mapSize).fill(0));
        for(const cell of this._cells) {
            matrix[cell.position.y][cell.position.x] = cell.value;
        }
        return matrix;
    }
    get score(): number {
        return this._score;
    }
    get stepCount(): number {
        return this._stepCount;
    }
    get maxValue(): number {
        return this._cells.length > 0 
            ? Math.max(...this._cells.map(cell => cell.value))
            : 0;
    }

    constructor(mapSize: number, randomize: IRandomize) {
        if (mapSize < 2) throw new RangeError("mapSize should be lower than 2");
        this.mapSize = mapSize;
    }

    private _cells : Cell[] = [];
    private _actions : Action[] = [];
    private _score : number = 0;
    private _stepCount : number = 0;
}

export default Logic;