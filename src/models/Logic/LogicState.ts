import Cell from '../Cell';
import {Action} from '../Actions';

class LogicState {
    cells: Cell[] = [];
    actions: Action[] = [];
    score: number = 0;
    stepCount: number = 0;
    mapDimension: number = 0;
}

export default LogicState;
