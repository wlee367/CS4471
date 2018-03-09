import React, { Component } from 'react';
import './App.css';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom"
import Home from "./Home"
import Profile from "./Profile"
import Settings from "./Settings"

class App extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <h1 className="title">Western Room Booker</h1>
                <ul className="header">
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/profile">Profile</NavLink></li>
                    <li><NavLink to="/settings">Settings</NavLink></li>
                </ul>
                <div className="content">
                    <Route exact path="/" component={Home}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/settings" component={Settings}/>
                </div>
            </div>
        </HashRouter>
    );
  }
}

export default App;
