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
            roomdata: [],
            dataArrayOG: [],
            actualdaysOG: {}

        }
        this.render = this.render.bind(this);
        this.onClick = this.onClick.bind(this);

    }

    onClick(){
        axios.get('/API/roominfo')
        .then(resp=> {
            this.setState({
                roomdata: resp.data,
            });
            let dataArray = [];
            let actualdays = {};
            let data = this.state.roomdata;
            data.forEach(dataId => {
                let days = dataId.days;
                days.forEach(element => {
                    if(element !== "  "){
                        if (element === ' M')
                            element = "Monday"
                        if (element === ' Tu')
                            element = "Tuesday"
                        if (element === ' W')
                            element = "Wednesday"
                        if (element === ' Th')
                            element = "Thursday"
                        if (element === ' F')
                            element = "Friday"

                        actualdays["days"] = element;
                        actualdays["start_time"] = dataId.start;
                        actualdays["end_time"] = dataId.end;
                        dataArray.push(actualdays);
                        actualdays = {};

                
                    }
                    });
            });
            this.setState({
                dataArrayOG: dataArray,
                actualdaysOG: actualdays
            });
            
        
        }).catch(console.error);
    }

    
    render() {
        return (
            <div>
                <button type="button" onClick={this.onClick}>Submit</button>

                <h2>ROOM INFO</h2><br/>
                {
                            this.state.dataArrayOG.map((build) => 
                            <li> This room is busy on {build.days} from {build.start_time} till {build.end_time} </li>
                        )
                        
                }
                <h2>COMMENTS</h2>
            </div>
        );
    }
}

export default Room;
