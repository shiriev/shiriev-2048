import Action from './Action';

class RestartAction extends Action {
    clone(): RestartAction {
        return new RestartAction();
    }
}

export default RestartAction;