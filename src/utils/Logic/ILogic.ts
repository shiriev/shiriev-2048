import Direction from '../Direction';
import Action from '../Actions/Action';
import LogicState from './LogicState';

interface ILogic {
    move(direction: Direction): Action[];
    addCell(): Action[];
    loadLogic(logicState: LogicState): void;
    saveLogic(): LogicState;
    readonly mapSize: number;
    readonly matrix: number[][];
    readonly score: number;
    readonly stepCount: number;
    readonly maxValue: number;
    readonly isEnd: boolean;
}

export default ILogic;