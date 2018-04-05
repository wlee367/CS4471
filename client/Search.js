import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Room from "./Room";
import axios from 'axios';


class Search extends React.Component {
    constructor(){
        super();
        this.state = {
            buildings:[],
            rooms:[],
            value: "",
        }
        console.log(this.state);
        this.render = this.render.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChanged = this.handleChanged.bind(this);

    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
        });
        this.forceUpdate();
        console.log(event.target.value);  
        
        axios.post('/', {
            value: event.target.value,
        })
         .then(function (response) {
             console.log(response);
         })
         .catch(function (error) {
           console.log(error);
         });

         // new get request to dynamically render rooms
         axios.get('/API/building')
         .then( 
             response => {
                 this.setState({
                     rooms: response.data.rooms,
                 });
             }
         );
      }
// -------------------------------------------------------------------------------------------------------------//
      handleChanged(event) {
        this.setState({
            value: event.target.value,
        });
        this.forceUpdate();
        console.log('hahahah im hereeeee');
        console.log(event.target.value); 
        console.log(this.state);
 
        
        axios.post('/API/building', {
            roomnumber: event.target.value   
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    componentDidMount(){
        axios.get('/API/search')
        .then(resp=> {
            // console.log(resp.data);
            this.setState({
                buildings: resp.data.buildings,
            });
        }).catch(console.error);



    }
    render() {

        return (
            <div>
                <h2> SEARCH </h2>
                <hr/>
                <h3>Please choose a building:</h3>
                <select value={this.state.value} onChange={this.handleChange} >
                        {
                            this.state.buildings.map((build) =>  <option key={build} build={build}> {build} </option>)
                        }
                    <option selected>Building...</option>
                </select>

                <h3>Please choose a room:</h3>
                <select roomnumber={this.state.roomnumber} onChange={this.handleChanged}>
                {
                            this.state.rooms.map((room) =>  <option key={room}  room={room}> {room} </option>)
                        }
                    <option selected>Room...</option>
                </select>
                <hr/>
                <div>
                    <Route exact path={"/main/search"} component={Room}/>
                </div>
            </div>
        );
    }
}

export default Search;