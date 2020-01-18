import Cell from "../Cell";
import Direction from "../Direction";
import Action from "../Actions/Action";

interface ILogic {
    move(direction : Direction) : Action[];
    addCell() : Action[];
    readonly mapSize : Number;
    readonly matrix : Cell[][];
    readonly score : Number;
    readonly stepCount : Number;
    readonly maxValue : Number;
}

export default ILogic;