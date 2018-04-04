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
            buildings:[]
        }
        console.log(this.state);
        this.render = this.render.bind(this.state.buildings);
    }
    componentDidMount(){
        axios.get('/API/search')
        .then(resp=> {
            // console.log(resp.data);
            this.setState({
                buildings: resp.data,
            })
        }).catch(console.error);
    }
    render() {
        // console.log(typeof(this.state.buildings));
        return (
            <div>
                <h2>SEARCH</h2>
                <hr/>
                <h3>Please choose a building:</h3>
                <select>
                    <option>

                        {this.state.buildings.map((build)=>{
                            <option>build</option>
                        })};
                    </option>
                    <option selected>Building...</option>
                </select>

                <h3>Please choose a room:</h3>
                <select>
                    <option>101</option>
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