import React, { Component } from 'react';
import {
    Route,
    HashRouter
} from "react-router-dom";
import App from './App.js';

console.log("Base in");

class Base extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                <Route path={"/"} component={App}/>
                </div>
            </HashRouter>
        );
    }
}

console.log("Base out");

export default Base;
