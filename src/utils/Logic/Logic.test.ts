import {} from '@testing-library/react';
import { mock } from 'jest-mock-extended'
import Logic from './Logic';
import IRandomize from '../Randomize/IRandomize';
import each from 'jest-each'
import Point from '../Point';
import AddCellAction from '../Actions/AddCellAction';
import Cell from '../Cell';


test('Initial Logic returns empty values', () => {
    const mapSize = 4;
    const expectedMatrix = Array(mapSize).fill([]).map(() => Array(mapSize).fill(0));
    const logic = new Logic(4, mock<IRandomize>());

    expect(logic.maxValue).toEqual(0);
    expect(logic.score).toEqual(0);
    expect(logic.stepCount).toEqual(0);
    expect(logic.matrix).toEqual(expectedMatrix);
});

each([[-5], [0], [1], [null]])
.test('Logic`s constructor throws error when mapSize < 2 or null (mapSize = %s)', (mapSize) => {
    const act = () => {  
        const logic = new Logic(mapSize, mock<IRandomize>());
    }
    expect(act).toThrow(RangeError);
});

test('AddValue adds cells on random position', () => {
    const mapSize = 3;
    const randomize = mock<IRandomize>();
    randomize.getRandomPosition.calledWith(mapSize)
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

    const logic = new Logic(mapSize, randomize);
    expect(logic.addCell()).toEqual([new AddCellAction(new Cell(2, new Point(0, 0)))]);
    expect(logic.addCell()).toEqual([new AddCellAction(new Cell(2, new Point(1, 2)))]);
    expect(logic.addCell()).toEqual([new AddCellAction(new Cell(4, new Point(2, 0)))]);

    expect(logic.maxValue).toEqual(4);
    expect(logic.score).toEqual(0);
    expect(logic.stepCount).toEqual(0);
    expect(logic.matrix).toEqual(expectedMatrix);
});

/* todo add tests for moving cells*/