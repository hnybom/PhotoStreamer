/**
 * Created by hnybom on 16.8.2016.
 */
import React from 'react';

export default class Photo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <img src="{this.props.url}" />
            </div>
        );
    }
}

Photo.propTypes = {
    index: React.PropTypes.number,
    url: React.PropTypes.string,
};

