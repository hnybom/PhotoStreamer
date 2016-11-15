/**
 * Created by hnybom on 16.8.2016.
 */
import React from 'react';
import Photo from './Photo.jsx';

export default class PhotoList extends React.Component {

    render() {
        let rows = [];
        if (this.props.list) {
            this.props.list.map((item, index) => {
                rows.push(<Photo url={item.path} index={index}/>);
            });
        }
        return (
            <div className="images">
                {rows}
            </div>
        );
    }
}

PhotoList.propTypes = {
    list: React.PropTypes.array,
};

