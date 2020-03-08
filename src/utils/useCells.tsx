import { useRef, useState, useCallback } from 'react';
import ICloneable from '../models/ICloneable';
import Cell from '../models/Cell';
import Point from '../models/Point';
import { AddCellAction, MoveAction, MergeAction, Action, RestartAction } from '../models/Actions';

export class CellWithId implements ICloneable {
    cell: Cell;
    id: number;

    constructor(cell: Cell, id: number) {
        this.cell = cell;
        this.id = id;
    }

    clone(): CellWithId {
        return new CellWithId(this.cell.clone(), this.id);
    }
}

export function useCells(): {cells: CellWithId[], sendActions: (currentActions: Action[]) => void} {
    const cellsRef = useRef<CellWithId[]>([]);
    const idCounterRef = useRef(0);
    const [cells, setCells] = useState<CellWithId[]>([]);
    
    const findCellOnPosition = useCallback((cellsWithId: CellWithId[], position: Point): CellWithId => {
        const cell = cellsWithId.find(CellWithId => CellWithId.cell.position.equals(position));
        if (cell === undefined) throw new Error('');
        return cell;
    }, []);

    const sendActions = useCallback((currentActions: Action[]) => {
        const newCells = [...cellsRef.current];
        for (const action of currentActions) {
            if( action instanceof AddCellAction) {
                newCells.push(new CellWithId(action.cell.clone(), idCounterRef.current++));
            } else if (action instanceof MoveAction) {
                const cell = findCellOnPosition(cellsRef.current, action.oldPosition);
                cell.cell.position = action.newPosition.clone();
            } else if (action instanceof MergeAction) {
                const cell1 = findCellOnPosition(cellsRef.current, action.firstCell.position);
                const cell2 = findCellOnPosition(cellsRef.current, action.secondCell.position);
                cell2.cell = action.newCell.clone();
                newCells.splice(newCells.indexOf(cell1), 1);
            } else if (action instanceof RestartAction) {
                newCells.length = 0;
            }
        }
        cellsRef.current = newCells;
        setCells(cellsRef.current);
    }, [findCellOnPosition]);

    return {cells, sendActions};
}
