import Point from './Point';
import ICloneable from './ICloneable';

class Cell implements ICloneable {
    value: number;
    position: Point;

    constructor(value: number, position: Point) {
        this.value = value;
        this.position = position;
    }
    
    clone(): Cell {
        return new Cell(this.value, this.position.clone());
    }
}

export default Cell;