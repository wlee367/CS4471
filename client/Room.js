import React, { Component } from "react";
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import events from './Events'
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class Room extends React.Component {
    render() {
        return (
            <div>
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
