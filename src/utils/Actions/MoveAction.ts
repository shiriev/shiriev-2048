import Action from "./Action";
import Direction from "../Direction";

class MoveAction extends Action {
    Direction : Direction;

    constructor(direction : Direction) {
        super();
        this.Direction = direction;
    }
}

export default MoveAction;