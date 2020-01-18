import Cell from "../Cell";
import Action from "../Actions/Action";
import ILogic from "./ILogic";
import Direction from "../Direction";
import IRandomize from "../Randomize/IRandomize";

class Logic implements ILogic {
    readonly mapSize : Number;

    move(direction: Direction): Action[] {
        throw new Error("Method not implemented.");
    }
    addCell(): Action[] {
        throw new Error("Method not implemented.");
    }

    get matrix(): Cell[][] {
        throw new Error("Method not implemented.");
    }
    get score(): Number {
        throw new Error("Method not implemented.");
    }
    get stepCount(): Number {
        throw new Error("Method not implemented.");
    }
    get maxValue(): Number {
        throw new Error("Method not implemented.");
    }

    constructor(mapSize : Number, randomize : IRandomize) {
        this.mapSize = mapSize;
    }

    private _cells : Cell[] = [];
    private _actions : Action[] = [];
}

export default Logic;