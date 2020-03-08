import Action from './Action';
import Cell from '../Cell';

class MergeAction extends Action {
    firstCell: Cell;
    secondCell: Cell;
    newCell: Cell;

    constructor(firstCell: Cell, secondCell: Cell, newCell: Cell) {
        super();
        this.firstCell = firstCell;
        this.secondCell = secondCell;
        this.newCell = newCell;
    }

    clone(): MergeAction {
        return new MergeAction(this.firstCell.clone(), this.secondCell.clone(), this.newCell.clone());
    }
}

export default MergeAction;