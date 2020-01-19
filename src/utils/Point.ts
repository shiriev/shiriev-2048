
class Point {
    x: number = 0;
    y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    equals(p: Point): boolean {
        return p.x === this.x && p.y === this.y;
    }

    clone(): Point {
        return new Point(this.x, this.y);
    }
}

export default Point;