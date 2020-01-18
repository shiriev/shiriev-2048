import Point from "./Point";

class Cell {
    value : Number;
    position : Point;

    constructor(value : Number, position : Point) {
        this.value = value;
        this.position = position;
    }
}

export default Cell;