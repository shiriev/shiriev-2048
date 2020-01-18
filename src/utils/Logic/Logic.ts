import Cell from "../Cell";
import Action from "../Actions/Action";
import ILogic from "./ILogic";
import Direction from "../Direction";
import IRandomize from "../Randomize/IRandomize";
import AddCellAction from "../Actions/AddCellAction";

class Logic implements ILogic {
    readonly mapSize : number;

    move(direction: Direction): Action[] {
        throw new Error("Method not implemented.");
    }
    addCell(): Action[] {
        while(true) {
            const position = this._randomize.getRandomPosition(this.mapSize);
            if (!this._cells.some(c => c.position.equals(position))) {
                const value = this._randomize.getRandomCellValue();
                const newCell = new Cell(value, position);
                this._cells.push(newCell);
                const action = new AddCellAction(newCell);
                this._actions.push(action);
                return [action];
            }
        };
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
        if (mapSize < 2) throw new RangeError("mapSize shouldn`t be lower than 2");
        if (!randomize) throw new TypeError("randomize shouldn`t be null");
        this.mapSize = mapSize;
        this._randomize = randomize;
    }

    private _cells : Cell[] = [];
    private _actions : Action[] = [];
    private _score : number = 0;
    private _stepCount : number = 0;
    private readonly _randomize : IRandomize;
}

export default Logic;