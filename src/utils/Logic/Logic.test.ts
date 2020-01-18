import {} from '@testing-library/react';
import Logic from './Logic';
import Randomize from '../Randomize/Randomize';
import each from 'jest-each'

test('Initial Logic returns empty values', () => {
    const blockSize = 4;
    const expectedMatrix = Array(blockSize).fill([]).map(() => Array(blockSize).fill(0));
    const logic = new Logic(4, new Randomize());

    expect(logic.maxValue).toEqual(0);
    expect(logic.score).toEqual(0);
    expect(logic.stepCount).toEqual(0);
    expect(logic.matrix).toEqual(expectedMatrix);
});

each([[-5], [0], [1], [null]])
.test('Logic`s constructor throws error when blockSize < 2 or null (blockSize = %s)', (blockSize) => {
    const act = () => {  
        const logic = new Logic(blockSize, new Randomize());
    }
    expect(act).toThrow(RangeError);
});

/* todo add tests for adding and moving cells*/