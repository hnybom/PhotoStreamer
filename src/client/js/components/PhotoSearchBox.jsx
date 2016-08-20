import React, {Component} from 'react';
import {searchImages} from '../actions/PhotoStreamerActions'
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
        this.triggerActionsIfDatesSet();
    }

    handleEndTimeChange(date) {
        this.setState({
            endDate : date
        });
        this.triggerActionsIfDatesSet();
    }

    triggerActionsIfDatesSet() {
        if (this.state.startDate && this.state.endDate) searchImages(this.state)
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