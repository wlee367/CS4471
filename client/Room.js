import React, { Component } from "react";
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import events from './Events'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class Room extends React.Component {
    constructor(){
        super();
        this.state = {
            roomdata: []

        }
        this.render = this.render.bind(this);
        this.onClick = this.onClick.bind(this);

    }

    onClick(){
        axios.get('/API/roominfo')
        .then(resp=> {
            // console.log(resp.data);
            this.setState({
                roomdata: resp.data,
            });
        }).catch(console.error);
    }

    
    render() {
        return (
            <div>
                <button type="button" onClick={this.onClick}>Load all the Room info</button>
                {console.log(this.state.roomdata)}
                <h2>ROOM INFO</h2><br/>
                <h2>SCHEDULE</h2><br/>
                <BigCalendar
                    events={events}
                    views={allViews}
                    step={60}
                    showMultiDayTimes
                    defaultDate={new Date(2015, 3, 1)}
                />
                <h2>COMMENTS</h2>
            </div>
        );
    }
}

export default Room;
