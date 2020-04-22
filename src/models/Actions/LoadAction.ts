import Action from './Action';
import Cell from '../Cell';

class LoadAction extends Action {
    cells: Cell[];

    constructor(cells: Cell[]) {
        super();
        this.cells = cells;
    }

    clone(): LoadAction {
        return new LoadAction(this.cells);
    }
}

export default LoadAction;
