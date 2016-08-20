import React, {Component} from 'react';
import PhotoStreamerStore from '../stores/PhotoStreamerStore.js';
import PhotoSearchBox from './PhotoSearchBox.jsx';

class PhotoStreamer extends Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = PhotoStreamerStore.getList();
    }

    componentDidMount() {
        PhotoStreamerStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        PhotoStreamerStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState(PhotoStreamerStore.getList());
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
