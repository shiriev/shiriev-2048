import Action from './Action';
import Cell from '../Cell';

class AddCellAction extends Action {
    cell: Cell;

    constructor(cell: Cell) {
        super();
        this.cell = cell;
    }

    clone(): AddCellAction {
        return new AddCellAction(this.cell.clone());
    }
}

export default AddCellAction;