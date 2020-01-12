import Point from "./Point";

class Cell {
    Value : Number;
    Position : Point;

    constructor(value : Number, position : Point) {
        this.Value = value;
        this.Position = position;
    }
}

export default Cell;