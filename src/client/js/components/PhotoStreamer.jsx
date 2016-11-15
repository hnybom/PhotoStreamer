import React, {Component} from 'react';
import PhotoStreamerStore from '../stores/PhotoStreamerStore.js';
import PhotoSearchBox from './PhotoSearchBox.jsx';
import PhotoList from './PhotoList.jsx';

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
                <div className="panel-body">
                    <PhotoList list={this.state.list}/>
                </div>
            </div>
        );
        
    }

}

export default PhotoStreamer;
