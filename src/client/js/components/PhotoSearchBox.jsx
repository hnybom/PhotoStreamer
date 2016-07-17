import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class PhotoSearchBox extends Component {
    
    constructor() {
        super();
        this.state = {
            startDate : moment(),
            endDate : moment()
        }
    }

    handleStartTimeChange(date) {
        this.setState({
            startDate : date
        });
    }

    handleEndTimeChange(date) {
        this.setState({
            endDate : date
        });
    }
    
    render() {
        return (
            <div>
                <DatePicker dateFormat="DD.MM.YYYY" selected={this.state.startDate} onChange={this.handleStartTimeChange.bind(this)} />
                <DatePicker dateFormat="DD.MM.YYYY" selected={this.state.endDate} onChange={this.handleEndTimeChange.bind(this)} />
            </div>
        );
    }
}

export default PhotoSearchBox;