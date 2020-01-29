import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Block from './components/Block';
import Map from './components/Map';
import Direction from './utils/Direction'
import Logic from './utils/Logic/Logic';
import LogicRandomize from './utils/LogicRandomize/LogicRandomize';
import Cell from './utils/Cell';
import Action from './utils/Actions/Action';
import AddCellAction from './utils/Actions/AddCellAction';
import LoseAction from './utils/Actions/LoseAction';
import MoveAction from './utils/Actions/MoveAction';
import MergeAction from './utils/Actions/MergeAction';
import Point from './utils/Point';
import ICloneable from './utils/ICloneable';

const BlockSize = 4;
const InitialDigitsCount = 2;

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

function useKeyboardArrows(callback: (direction: Direction) => void): void {
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            let direction;
            switch (e.key){
                case "ArrowUp": direction = Direction.Up; break;
                case "ArrowDown": direction = Direction.Down; break;
                case "ArrowLeft": direction = Direction.Left; break;
                case "ArrowRight": direction = Direction.Right; break;
                default: return;
            };
            callback(direction);
        };
        document.addEventListener("keydown", onKeyDown, false);
        return () => document.removeEventListener("keydown", onKeyDown, false); 
    }, [callback]);
}

/* todo not use global */
let GlobalId = 0;

function App() {
    const logicRef = useRef(new Logic(BlockSize, new LogicRandomize()));
    const cellsRef = useRef<CellWithId[]>([]);
    const [cells, setCells] = useState<CellWithId[]>([]);
    const [lose, setLose] = useState(false);

    const findCellOnPosition = (cellsWithId: CellWithId[], position: Point): CellWithId => {
        const cell = cellsWithId.find(CellWithId => CellWithId.cell.position.equals(position)) 
        if(cell === undefined) throw new Error();
        return cell;
    }

    const updateCells = (actions: Action[]): void => {
        const newCells = [...cellsRef.current];
        for(const action of actions) {
            if(action instanceof AddCellAction) {
                newCells.push(new CellWithId(action.cell.clone(), GlobalId++));
            } else if(action instanceof MoveAction) {
                const cell = findCellOnPosition(cellsRef.current, action.oldPosition);
                cell.cell.position = action.newPosition.clone();
            } else if(action instanceof MergeAction) {
                const cell1 = findCellOnPosition(cellsRef.current, action.firstCell.position);
                const cell2 = findCellOnPosition(cellsRef.current, action.secondCell.position);
                cell2.cell = action.newCell.clone();
                newCells.splice(newCells.indexOf(cell1), 1);
            } else if(action instanceof LoseAction) {
                setLose(true);
            }
        }
        cellsRef.current = newCells;  
        setCells(cellsRef.current);
    }

    useEffect(() => {
        const logic = logicRef.current;
        const actions: Action[] = [];
        for (let i = 0; i < InitialDigitsCount; i++) {
            const action = logic.addCell();
            actions.push(...action);
        }
        updateCells(actions);
    }, []);

    useKeyboardArrows((direction: Direction) => {
        const logic = logicRef.current;
        const actions = logic.move(direction);
        console.log(actions);
        console.log(logic.score);
        updateCells(actions);
    });
    
    return (
        <div className="app">
            <Map>{cells.map(cellWithId => <Block key={cellWithId.id} cell={cellWithId.cell}/>)}</Map>
        </div>
    );
}

export default App;