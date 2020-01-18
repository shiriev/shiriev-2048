import Point from "./Point";

class Cell {
    value : number;
    position : Point;

    constructor(value : number, position : Point) {
        this.value = value;
        this.position = position;
    }
}

export default Cell;