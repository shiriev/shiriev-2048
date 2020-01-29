import React, {useRef, useState, useEffect} from 'react';
import "./Map.css";
import Action from '../utils/Actions/Action';
import Block from './Block';
import Cell from '../utils/Cell';
import ICloneable from '../utils/ICloneable';
import Point from '../utils/Point';
import AddCellAction from '../utils/Actions/AddCellAction';
import MoveAction from '../utils/Actions/MoveAction';
import MergeAction from '../utils/Actions/MergeAction';

export interface MapProps {
    currentActions: Action[];
    mapSize: number;
};

class CellWithId implements ICloneable {
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

function Map(props: MapProps){
    const cellsRef = useRef<CellWithId[]>([]);
    const idCounterRef = useRef(0);
    const [cells, setCells] = useState<CellWithId[]>([]);
    const { currentActions } = props;
    
    const findCellOnPosition = (cellsWithId: CellWithId[], position: Point): CellWithId => {
        const cell = cellsWithId.find(CellWithId => CellWithId.cell.position.equals(position));
        if(cell === undefined) throw new Error();
        return cell;
    }

    useEffect(() => {
        const newCells = [...cellsRef.current];
        for(const action of currentActions) {
            if(action instanceof AddCellAction) {
                newCells.push(new CellWithId(action.cell.clone(), idCounterRef.current++));
            } else if(action instanceof MoveAction) {
                const cell = findCellOnPosition(cellsRef.current, action.oldPosition);
                cell.cell.position = action.newPosition.clone();
            } else if(action instanceof MergeAction) {
                const cell1 = findCellOnPosition(cellsRef.current, action.firstCell.position);
                const cell2 = findCellOnPosition(cellsRef.current, action.secondCell.position);
                cell2.cell = action.newCell.clone();
                newCells.splice(newCells.indexOf(cell1), 1);
            }
        }
        cellsRef.current = newCells;
        setCells(cellsRef.current);
    }, [currentActions]);

    return <div className="map">
        {cells.map(cellWithId => <Block key={cellWithId.id} cell={cellWithId.cell}/>)}
    </div>;
};

export default Map;