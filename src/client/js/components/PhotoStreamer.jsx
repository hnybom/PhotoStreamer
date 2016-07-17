import React, {Component} from 'react';
import PhotoSearchBox from './PhotoSearchBox.jsx';

class PhotoStreamer extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="photoStreamer">
                <h1>Etsi kuvia</h1>
                <PhotoSearchBox />
            </div>
        );
        
    }

}

export default PhotoStreamer;
