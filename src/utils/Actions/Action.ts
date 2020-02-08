import ICloneable from '../ICloneable';

abstract class Action implements ICloneable {
    abstract clone(): Action;
}

export default Action;