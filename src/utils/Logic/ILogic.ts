import Cell from "../Cell";
import Direction from "../Direction";
import Action from "../Actions/Action";

interface ILogic {
    move(direction : Direction) : Action[];
    addCell() : Action[];
    readonly mapSize : number;
    readonly matrix : Cell[][];
    readonly score : number;
    readonly stepCount : number;
    readonly maxValue : number;
}

export default ILogic;