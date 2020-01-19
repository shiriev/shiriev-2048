import Action from "./Action";
import Point from "../Point";

class MoveAction extends Action {
    value: number;
    oldPosition: Point;
    newPosition: Point;

    constructor(value: number, oldPosition: Point, newPosition: Point) {
        super();
        this.value = value;
        this.oldPosition = oldPosition;
        this.newPosition = newPosition;
    }

    clone(): MoveAction {
        return new MoveAction(this.value, this.oldPosition.clone(), this.newPosition.clone());
    }
}

export default MoveAction;