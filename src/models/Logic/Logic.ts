import ILogic from './ILogic';
import ILogicRandomize from '../LogicRandomize/ILogicRandomize';
import Direction from '../Direction';
import Point from '../Point';
import Cell from '../Cell';
import LogicState from './LogicState';
import { Action, AddCellAction, MoveAction, MergeAction, LoseAction, RestartAction, LoadAction } from '../Actions';

class Logic implements ILogic {

    load(logicState: LogicState): Action[] {
        this._actions = [];
        this._cells = logicState.cells;
        this._mapDimension = logicState.mapDimension;
        this._score = logicState.score;
        this._stepCount = logicState.stepCount;
        return [new LoadAction(logicState.cells)];
    }

    save(): LogicState {
        const logicState = new LogicState();
        logicState.cells = this._cells.map(_ => _.clone());
        logicState.mapDimension = this.mapDimension;
        logicState.score = this._score;
        logicState.stepCount = this._stepCount;
        return logicState;
    }

    restart(): Action[] {
        this._cells = [];
        this._score = 0;
        this._stepCount = 0;

        const restartAction = new RestartAction();
        this._actions.push(restartAction);
        return [restartAction];
    }

    private canDoMove(): boolean {
        const hasFreeSpace = this._cells.length < (this.mapDimension * this.mapDimension);
        if(hasFreeSpace) {
            return true;
        }
        
        const matrix = this.matrix;

        for(let i = 0; i < matrix.length; i++) {
            for(let j = 0; j < matrix.length - 1; j++) {
                if (matrix[i][j] === matrix[i][j + 1]
                 || matrix[j][i] === matrix[j + 1][i]) {
                     return true;
                 }
            }
        }

        return false;
    }

    private getPointTransform(mapDimension: number, yDirection: Direction): {
        from(p: Point): Point;
        to(p: Point): Point;
    } {
        switch(yDirection) {
            case Direction.Left:
                return {
                    from: p => p,
                    to: p => p
                };
            case Direction.Right:
                return {
                    from: p => new Point(mapDimension - p.x - 1, p.y),
                    to: p => new Point(mapDimension - p.x - 1, p.y)
                };
            case Direction.Up:
                return {
                    from: p => new Point(p.y, p.x),
                    to: p => new Point(p.y, p.x)
                };
            case Direction.Down:
                return {
                    from: p => new Point(mapDimension - p.y - 1, p.x),
                    to: p => new Point(p.y, mapDimension - p.x - 1)
                };
        }
    }

    private dropCell(cell: Cell): void {
        this._cells.splice(this._cells.indexOf(cell), 1);
    }

    move(direction: Direction): Action[] {
        const actions: Action[] = [];
        const { from, to } = this.getPointTransform(this.mapDimension, direction);
        for(let y = 0; y < this.mapDimension; y++) {
            const cellsOnLine = this._cells
                .filter(c => from(c.position).y === y)
                .sort((c1, c2) => from(c1.position).x - from(c2.position).x);
            let freeX = 0;
            for(let num = 0; num < cellsOnLine.length; num++) {
                const currentCell = cellsOnLine[num];
                const nextCell = num + 1 < cellsOnLine.length ? cellsOnLine[num + 1] : null;
                if (nextCell !== null && currentCell.value === nextCell.value) {
                    this.dropCell(currentCell);
                    this.dropCell(nextCell);
                    const newValue = currentCell.value * 2;
                    const newCell = new Cell(newValue, to(new Point(freeX, y)));
                    this._cells.push(newCell);
                    const mergeAction = new MergeAction(currentCell, nextCell, newCell);
                    actions.push(mergeAction);
                    this._score += newValue;
                    num++;
                } else {
                    if (freeX < from(currentCell.position).x) {
                        const oldPosition = currentCell.position.clone();
                        currentCell.position = to(new Point(freeX, from(currentCell.position).y));
                        const newPosition = currentCell.position.clone();
                        const moveAction = new MoveAction(currentCell.value, oldPosition, newPosition);
                        actions.push(moveAction);
                    }
                }
                freeX++;
            }
        }

        if (actions.length <= 0) {
            return [];
        }
                    
        this._stepCount++;
        this._actions.push(...actions);

        const addActions = this.addCell();
        actions.push(...addActions);

        if (!this.canDoMove()) {
            actions.push(new LoseAction());
        }

        return actions;
    }

    addCell(): Action[] {
        while(true) {
            const position = this._randomize.getRandomPosition(this.mapDimension);
            if (!this._cells.some(c => c.position.equals(position))) {
                const value = this._randomize.getRandomCellValue();
                const newCell = new Cell(value, position);
                this._cells.push(newCell);
                const action = new AddCellAction(newCell);
                this._actions.push(action);
                return [action];
            }
        };
    }

    get matrix(): number[][] {
        let matrix: number[][] = Array(this.mapDimension)
            .fill([])
            .map(() => Array(this.mapDimension)
                .fill(0)
            );
        for(const cell of this._cells) {
            matrix[cell.position.y][cell.position.x] = cell.value;
        }
        return matrix;
    }

    get score(): number {
        return this._score;
    }

    get stepCount(): number {
        return this._stepCount;
    }

    get maxValue(): number {
        return this._cells.length > 0 
            ? Math.max(...this._cells.map(cell => cell.value))
            : 0;
    }

    get mapDimension(): number {
        return this._mapDimension;
    }

    get isEnd(): boolean {
        return !this.canDoMove();
    }


    constructor(mapDimension: number, randomize: ILogicRandomize) {
        if (mapDimension < 2) throw new RangeError('mapDimension shouldn`t be lower than 2');
        if (!randomize) throw new TypeError('randomize shouldn`t be null');
        this._mapDimension = mapDimension;
        this._randomize = randomize;
    }


    private _cells: Cell[] = [];
    private _actions: Action[] = [];
    private _score: number = 0;
    private _stepCount: number = 0;
    private _mapDimension: number;
    private readonly _randomize: ILogicRandomize;
}

export default Logic;
