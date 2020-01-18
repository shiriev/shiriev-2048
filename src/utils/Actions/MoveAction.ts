import Action from "./Action";
import Direction from "../Direction";

class MoveAction extends Action {
    direction : Direction;

    constructor(direction : Direction) {
        super();
        this.direction = direction;
    }
}

export default MoveAction;