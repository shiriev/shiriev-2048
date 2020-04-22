import React, { useRef, useState, useCallback } from 'react';
import './Map.css';
import Block from './Block';
import ICloneable from '../models/ICloneable';
import Cell from '../models/Cell';
import Point from '../models/Point';
import { Action, AddCellAction, MoveAction, MergeAction, RestartAction } from '../models/Actions';

class AnimatedCell implements ICloneable {
    cell: Cell;
    id: number;

    constructor(cell: Cell, id: number) {
        this.cell = cell;
        this.id = id;
    }

    clone(): AnimatedCell {
        return new AnimatedCell(this.cell.clone(), this.id);
    }
}

export type MapAnimationParams = {
    cells: AnimatedCell[];
}

export function useMapAnimation(): {mapAnimationParams: MapAnimationParams, sendActions: (currentActions: Action[]) => void} {
    const cellsRef = useRef<AnimatedCell[]>([]);
    const idCounterRef = useRef(0);
    const [cells, setCells] = useState<AnimatedCell[]>([]);
    
    const findCellOnPosition = useCallback((cellsWithId: AnimatedCell[], position: Point): AnimatedCell => {
        const cell = cellsWithId.find(CellWithId => CellWithId.cell.position.equals(position));
        if (cell === undefined) throw new Error('');
        return cell;
    }, []);

    const sendActions = useCallback((currentActions: Action[]) => {
        const newCells = [...cellsRef.current];
        for (const action of currentActions) {
            if( action instanceof AddCellAction) {
                newCells.push(new AnimatedCell(action.cell.clone(), idCounterRef.current++));
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

    return {
        mapAnimationParams: {cells: cells}, 
        sendActions
    };
}


export default function Map(props: {
    mapAnimationParams: MapAnimationParams;
    mapDimension: number;
}){
    const { mapAnimationParams, mapDimension } = props;
    return <div className='map' style={{'--map-dimension': mapDimension} as React.CSSProperties}>
        {mapAnimationParams.cells.map(cellWithId => <Block key={cellWithId.id} cell={cellWithId.cell}/>)}
    </div>
}
