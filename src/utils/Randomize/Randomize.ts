import IRandomize from "./IRandomize";

class Randomize implements IRandomize {
    GetRandomIntInclusive(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    }
}

export default Randomize;