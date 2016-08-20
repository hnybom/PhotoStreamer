/**
 * Created by hnybom on 17.7.2016.
 */

import { Dispatcher } from 'flux';

class DispatcherClass extends Dispatcher {

    handleViewAction(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action,
        });
    }

    handleServerAction(action) {
        this.dispatch({
            source: 'SERVER_ACTION',
            action: action,
        });
    }
}

const AppDispatcher = new DispatcherClass();

export default AppDispatcher;