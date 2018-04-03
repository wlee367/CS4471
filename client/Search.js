import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Room from "./Room";

class Search extends Component {
    render() {
        return (
            <div>
                <h2>SEARCH</h2>
                <hr/>
                <h3>Please choose a building:</h3>
                <select>
                    <option>3M Centre</option>
                    <option>Advanced Facility for Avian Research</option>
                    <option>Allyn & Betty Taylor Library</option>
                    <option>Alumni Hall</option>
                    <option>Chemistry Building</option>
                    <option>D.B. Weldon Library</option>
                    <option>Delaware Hall REsidence</option>
                    <option>Elborn College</option>
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