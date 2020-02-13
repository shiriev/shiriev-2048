import Action from './Action';

class LoseAction extends Action {
    clone(): LoseAction {
        return new LoseAction();
    }
}

export default LoseAction;