import {} from '@testing-library/react';
import { mock } from 'jest-mock-extended'
import each from 'jest-each'
import ILogicRandomize from '../LogicRandomize/ILogicRandomize';
import Logic from './Logic';
import LogicState from './LogicState';
import Direction from '../Direction';
import Point from '../Point';
import Cell from '../Cell';
import {AddCellAction, MoveAction, MergeAction, LoseAction, RestartAction} from '../Actions';


test(`Initial ${Logic.name} returns empty values and empty state`, () => {
    const mapDimension = 4;
    const expectedMatrix = Array(mapDimension).fill([]).map(() => Array(mapDimension).fill(0));
    const logic = new Logic(mapDimension, mock<ILogicRandomize>());

    expect(logic.maxValue).toEqual(0);
    expect(logic.score).toEqual(0);
    expect(logic.stepCount).toEqual(0);
    expect(logic.isEnd).toEqual(false);
    expect(logic.matrix).toEqual(expectedMatrix);

    const logicState = logic.save();
    expect(logicState.mapDimension).toEqual(mapDimension);
    expect(logicState.score).toEqual(0);
    expect(logicState.stepCount).toEqual(0);
    expect(logicState.cells).toEqual([]);
    expect(logicState.actions).toEqual([]);
});

each([[-5], [0], [1], [null]])
.test(`${Logic.name}\`s constructor throws error when mapDimension < 2 or null (mapDimension = %s)`, (mapDimension) => {
    const act = () => {  
        new Logic(mapDimension, mock<ILogicRandomize>());
    }
    expect(act).toThrow(RangeError);
});

test(`${Logic.prototype.addCell.name} adds cells on random position`, () => {
    const mapDimension = 3;
    const randomize = mock<ILogicRandomize>();
    randomize.getRandomPosition.calledWith(mapDimension)
        .mockReturnValueOnce(new Point(0, 0))
        .mockReturnValueOnce(new Point(1, 2))
        .mockReturnValueOnce(new Point(0, 0))
        .mockReturnValueOnce(new Point(2, 0));
        
    randomize.getRandomCellValue.calledWith()
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(4);

    const expectedMatrix = [
        [2, 0, 4],
        [0, 0, 0],
        [0, 2, 0],
    ];

    const logic = new Logic(mapDimension, randomize);
    expect(logic.addCell()).toEqual([new AddCellAction(new Cell(2, new Point(0, 0)))]);
    expect(logic.addCell()).toEqual([new AddCellAction(new Cell(2, new Point(1, 2)))]);
    expect(logic.addCell()).toEqual([new AddCellAction(new Cell(4, new Point(2, 0)))]);

    expect(logic.maxValue).toEqual(4);
    expect(logic.score).toEqual(0);
    expect(logic.stepCount).toEqual(0);
    expect(logic.matrix).toEqual(expectedMatrix);

    const logicState = logic.save();
    expect(logicState.mapDimension).toEqual(3);
    expect(logicState.score).toEqual(0);
    expect(logicState.stepCount).toEqual(0);
    expect(logicState.cells.length).toEqual(3);
    expect(logicState.actions.length).toEqual(3);
});

test(`${Logic.prototype.load.name} set state of logic`, () => {
    const mapDimension = 3;
    const randomize = mock<ILogicRandomize>();

    const expectedMatrix = [
        [2, 0, 4],
        [8, 0, 0],
        [0, 2, 0],
    ];

    const logic = new Logic(mapDimension, randomize);
    const logicState = new LogicState();
    logicState.actions = [];
    logicState.cells = [
        new Cell(2, new Point(0, 0)),
        new Cell(4, new Point(2, 0)),
        new Cell(8, new Point(0, 1)),
        new Cell(2, new Point(1, 2)),
    ];
    logicState.mapDimension = mapDimension;
    logicState.score = 34;
    logicState.stepCount = 6;
    logic.load(logicState);

    expect(logic.maxValue).toEqual(8);
    expect(logic.score).toEqual(34);
    expect(logic.stepCount).toEqual(6);
    expect(logic.isEnd).toEqual(false);
    expect(logic.matrix).toEqual(expectedMatrix);
});

test(`${Logic.prototype.move.name} moves cells to left, add value and make actions`, () => {
    const mapDimension = 4;
    const randomize = mock<ILogicRandomize>();
    randomize.getRandomPosition.calledWith(mapDimension)
        .mockReturnValueOnce(new Point(1, 2));
        
    randomize.getRandomCellValue.calledWith()
        .mockReturnValueOnce(2);

    const logic = new Logic(mapDimension, randomize);
    const logicState = new LogicState();
    logicState.cells = calculateCellsByMatrix([
        [0, 2, 2, 0],
        [8, 0, 4, 0],
        [0, 16, 0, 16],
        [0, 0, 0, 0],
    ]);
    logicState.mapDimension = mapDimension;
    logicState.score = 10;
    logicState.stepCount = 7;
    logic.load(logicState);

    const expectedMatrix = [
        [4, 0, 0, 0],
        [8, 4, 0, 0],
        [32, 2, 0, 0],
        [0, 0, 0, 0],
    ];
    const expectedActions = [
        new MergeAction(new Cell(2, new Point(1, 0)), new Cell(2, new Point(2, 0)), new Cell(4, new Point(0, 0))),
        new MoveAction(4, new Point(2, 1), new Point(1, 1)),
        new MergeAction(new Cell(16, new Point(1, 2)), new Cell(16, new Point(3, 2)), new Cell(32, new Point(0, 2))),
        new AddCellAction(new Cell(2, new Point(1, 2)))
    ];

    const actions = logic.move(Direction.Left);

    expect(logic.maxValue).toEqual(32);
    expect(logic.score).toEqual(46);
    expect(actions).toEqual(expectedActions);
    expect(logic.save().actions).toEqual(expectedActions);
    expect(logic.stepCount).toEqual(8);
    expect(logic.isEnd).toEqual(false);
    expect(logic.matrix).toEqual(expectedMatrix);
});

test(`${Logic.prototype.move.name} should do nothing if has no way for this direction`, () => {
    const mapDimension = 4;
    const randomize = mock<ILogicRandomize>();

    const matrix = [
        [2, 4, 2, 4],
        [8, 2, 4, 0],
        [2, 16, 0, 0],
        [0, 0, 0, 0],
    ];

    const logic = new Logic(mapDimension, randomize);
    const logicState = new LogicState();
    logicState.cells = calculateCellsByMatrix(matrix);
    logicState.mapDimension = mapDimension;
    logicState.score = 10;
    logicState.stepCount = 7;
    logic.load(logicState);

    const actions = logic.move(Direction.Left);

    expect(logic.maxValue).toEqual(16);
    expect(logic.score).toEqual(10);
    expect(actions).toEqual([]);
    expect(logic.stepCount).toEqual(7);
    expect(logic.isEnd).toEqual(false);
    expect(logic.matrix).toEqual(matrix);
});

each([
    [
        Direction.Right,
        [[0, 2, 0],
        [2, 2, 2],
        [0, 2, 0]],
        new Cell(2, new Point(1, 0)),
        [[0, 2, 2],
        [0, 2, 4],
        [0, 0, 2]]
    ],
    [
        Direction.Down,
        [[0, 2, 0],
        [2, 2, 2],
        [0, 2, 0]],
        new Cell(2, new Point(1, 0)),
        [[0, 2, 0],
        [0, 2, 0],
        [2, 4, 2]]
    ],
    [
        Direction.Up,
        [[0, 2, 0],
        [2, 2, 2],
        [0, 2, 0]],
        new Cell(2, new Point(1, 2)),
        [[2, 4, 2],
        [0, 2, 0],
        [0, 2, 0]]
    ],
])
.test(`${Logic.prototype.move.name} moves cells on different directions`, (
        direction: Direction, 
        matrix: number[][], 
        newCell: Cell, 
        expectedMatrix: number[][]
    ) => {
    const mapDimension = matrix.length;
    const randomize = mock<ILogicRandomize>();
    randomize.getRandomPosition.calledWith(mapDimension)
        .mockReturnValueOnce(newCell.position.clone());
        
    randomize.getRandomCellValue.calledWith()
        .mockReturnValueOnce(newCell.value);

    const logic = new Logic(mapDimension, randomize);
    const logicState = new LogicState();
    logicState.cells = calculateCellsByMatrix(matrix);
    logicState.mapDimension = mapDimension;
    logicState.score = 0;
    logicState.stepCount = 0;
    logic.load(logicState);

    logic.move(direction);

    expect(logic.matrix).toEqual(expectedMatrix);
});


test(`${Logic.prototype.move.name} shouldn\`t return ${LoseAction.name} if has some ways but doesn\`t have free space`, () => {
    const mapDimension = 4;
    const randomize = mock<ILogicRandomize>();
    randomize.getRandomPosition.calledWith(mapDimension)
        .mockReturnValueOnce(new Point(3, 2));
    randomize.getRandomCellValue.calledWith()
        .mockReturnValueOnce(2);


    const logic = new Logic(mapDimension, randomize);
    const logicState = new LogicState();
    logicState.cells = calculateCellsByMatrix([
        [2, 4, 2, 4],
        [8, 2, 4, 2],
        [2, 16, 0, 8],
        [16, 4, 2, 4],
    ]);
    logicState.mapDimension = mapDimension;
    logicState.score = 10;
    logicState.stepCount = 7;
    logic.load(logicState);

    const actions = logic.move(Direction.Left);

    const expectedMatrix = [
        [2, 4, 2, 4],
        [8, 2, 4, 2],
        [2, 16, 8, 2],
        [16, 4, 2, 4],
    ];

    const expectedActions = [
        new MoveAction(8, new Point(3, 2), new Point(2, 2)),
        new AddCellAction(new Cell(2, new Point(3, 2))),
    ];

    expect(logic.maxValue).toEqual(16);
    expect(logic.score).toEqual(10);
    expect(actions).toEqual(expectedActions);
    expect(logic.stepCount).toEqual(8);
    expect(logic.matrix).toEqual(expectedMatrix);
});

test(`${Logic.prototype.move.name} should return ${LoseAction.name} if has no way`, () => {
    const mapDimension = 4;
    const randomize = mock<ILogicRandomize>();
    randomize.getRandomPosition.calledWith(mapDimension)
        .mockReturnValueOnce(new Point(3, 2));
    randomize.getRandomCellValue.calledWith()
        .mockReturnValueOnce(2);


    const logic = new Logic(mapDimension, randomize);
    const logicState = new LogicState();
    logicState.cells = calculateCellsByMatrix([
        [2, 4, 2, 4],
        [8, 2, 4, 16],
        [2, 16, 0, 8],
        [16, 4, 2, 4],
    ]);
    logicState.mapDimension = mapDimension;
    logicState.score = 10;
    logicState.stepCount = 7;
    logic.load(logicState);

    const actions = logic.move(Direction.Left);

    const expectedMatrix = [
        [2, 4, 2, 4],
        [8, 2, 4, 16],
        [2, 16, 8, 2],
        [16, 4, 2, 4],
    ];

    const expectedActions = [
        new MoveAction(8, new Point(3, 2), new Point(2, 2)),
        new AddCellAction(new Cell(2, new Point(3, 2))),
        new LoseAction(),
    ];

    expect(logic.maxValue).toEqual(16);
    expect(logic.score).toEqual(10);
    expect(actions).toEqual(expectedActions);
    expect(logic.stepCount).toEqual(8);
    expect(logic.isEnd).toEqual(true);
    expect(logic.matrix).toEqual(expectedMatrix);
});

test(`${Logic.prototype.save.name} should make new object`, () => {
    const mapDimension = 3;
    const randomize = mock<ILogicRandomize>();

    const logic = new Logic(mapDimension, randomize);
    const logicState = new LogicState();
    logicState.actions = [];
    logicState.cells = [
        new Cell(2, new Point(0, 0)),
    ];
    logicState.mapDimension = mapDimension;
    logicState.score = 34;
    logicState.stepCount = 6;
    logic.load(logicState);

    const firstCell = logic.save().cells[0];
    firstCell.value = 13;
    const secondCell = logic.save().cells[0];
    expect(firstCell).not.toEqual(secondCell);
});

test(`${Logic.prototype.restart.name} should reset all properties`, () => {
    const mapDimension = 3;
    const randomize = mock<ILogicRandomize>();

    const expectedMatrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];

    const logic = new Logic(mapDimension, randomize);
    const logicState = new LogicState();
    logicState.actions = [];
    logicState.cells = [
        new Cell(2, new Point(0, 0)),
        new Cell(4, new Point(2, 0)),
        new Cell(8, new Point(0, 1)),
        new Cell(2, new Point(1, 2)),
    ];
    logicState.mapDimension = mapDimension;
    logicState.score = 34;
    logicState.stepCount = 6;
    logic.load(logicState);
    const actions = logic.restart();

    expect(logic.maxValue).toEqual(0);
    expect(logic.score).toEqual(0);
    expect(logic.stepCount).toEqual(0);
    expect(logic.isEnd).toEqual(false);
    expect(logic.matrix).toEqual(expectedMatrix);
    expect(actions).toEqual([new RestartAction()]);
});


const calculateCellsByMatrix = (matrix: number[][]): Cell[] => {
    const cells: Cell[] = [];
    matrix.forEach((line, y) => {
        line.forEach((value, x) => {
            if(value > 0) {
                cells.push(new Cell(value, new Point(x, y)));
            }
        });
    });
    return cells;
}
