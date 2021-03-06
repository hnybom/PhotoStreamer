/**
 * Created by hnybom on 29.11.2015.
 */
import AppDispatcher from '../dispatcher/AppDispatcher';
import {PhotoStreamerConstants} from '../constants/PhotoStreamerConstants'
import {loadPhotos} from '../utils/ServerAPI'

export function searchImages(times) {
    AppDispatcher.handleViewAction({
        actionType: PhotoStreamerConstants.SEARCH_PHOTOS,
        times: times
    });

    loadPhotos(times);

}