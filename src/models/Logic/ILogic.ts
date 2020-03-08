import Direction from '../Direction';
import { Action } from '../Actions';
import LogicState from './LogicState';

interface ILogic {
    move(direction: Direction): Action[];
    addCell(): Action[];
    load(logicState: LogicState): void;
    save(): LogicState;
    restart(): Action[];
    readonly mapSize: number;
    readonly matrix: number[][];
    readonly score: number;
    readonly stepCount: number;
    readonly maxValue: number;
    readonly isEnd: boolean;
}

export default ILogic;