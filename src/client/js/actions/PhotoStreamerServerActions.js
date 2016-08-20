/**
 * Created by hnybom on 29.11.2015.
 */
import AppDispatcher from '../dispatcher/AppDispatcher';
import {PhotoStreamerConstants} from '../constants/PhotoStreamerConstants'

export function receiveImages(data) {
    AppDispatcher.handleViewAction({
        actionType: PhotoStreamerConstants.RECEIVE_PHOTOS,
        data: data
    });
}