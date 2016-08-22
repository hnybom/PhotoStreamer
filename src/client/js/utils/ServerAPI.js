import {receiveImages} from '../actions/PhotoStreamerServerActions'
import jquery from 'jquery'

export function loadPhotos(times) {
    jquery.getJSON('http://localhost:8080/api/find?from='
        + times.startDate.format('YYYY-MM-DD')
        + "&to=" + times.endDate.format('YYYY-MM-DD'), function(data) {

        receiveImages(data);

    })
}