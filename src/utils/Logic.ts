import Cell from "./Cell";
import Action from "./Actions/Action";
import ILogic from "./ILogic";
import Direction from "./Direction";
import IRandomize from "./IRandomize";

class Logic implements ILogic {
    Move(direction: Direction): Action[] {
        throw new Error("Method not implemented.");
    }
    AddCell(): Action[] {
        throw new Error("Method not implemented.");
    }
    GetMatrix(): Cell[][] {
        throw new Error("Method not implemented.");
    }
    GetScore(): Number {
        throw new Error("Method not implemented.");
    }
    GetStepCount(): Number {
        throw new Error("Method not implemented.");
    }
    GetMaxValue(): Number {
        throw new Error("Method not implemented.");
    }

    constructor(mapSize : Number, randomize : IRandomize) {

    }

    private Cells : Cell[] = [];
    private Actions : Action[] = [];
}

export default Logic;