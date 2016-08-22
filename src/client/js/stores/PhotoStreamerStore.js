/**
 * Created by hnybom on 17.7.2016.
 */

import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import {PhotoStreamerConstants} from '../constants/PhotoStreamerConstants'

const CHANGE_EVENT = 'change';

// Define the store as an empty array
let _store = {
    list: [],
};

class PhotoStreamerStore extends EventEmitter {

    addChangeListener(cb) {
        this.on(CHANGE_EVENT, cb);
    }

    removeChangeListener(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    }

    getList() {
        return _store;
    }

}

const PhotoStreamerStoreInstance = new PhotoStreamerStore();

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a
// change
AppDispatcher.register((payload) => {
    const action = payload.action;

    switch (action.actionType) {
        case PhotoStreamerConstants.RECEIVE_PHOTOS:
            console.log(payload.action.data);
    }
});

export default PhotoStreamerStoreInstance;
