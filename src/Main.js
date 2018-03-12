import React, { Component } from 'react';
import './Main.css';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom"
import Home from "./Home"
import Profile from "./Profile"
import Settings from "./Settings"

console.log("IN MAIN FILE");

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <center><h1 className="title">Western Room Booker</h1></center>
                    <ul className="header">
                        <li><NavLink exact to={"/main"} >Home</NavLink></li>
                        <li><NavLink exact to={"/main/profile"} >Profile</NavLink></li>
                        <li><NavLink exact to={"/main/settings"} >Settings</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route  exact path={"/main"} component={Home}/>
                        <Route  exact path={"/main/profile"} component={Profile}/>
                        <Route  exact path={"/main/settings"} component={Settings}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

console.log("Out of MAIN FILE");

export default Main;
