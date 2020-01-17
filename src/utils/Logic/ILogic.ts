import Cell from "../Cell";
import Direction from "../Direction";
import Action from "../Actions/Action";

interface ILogic {
    Move(direction : Direction) : Action[];
    AddCell() : Action[];
    GetMatrix() : Cell[][];
    GetScore() : Number;
    GetStepCount() : Number;
    GetMaxValue() : Number;
}

export default ILogic;