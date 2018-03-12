import React, { Component } from 'react';
import './App.css';
import avatar from './assets/avatar.png';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Main from "./Main";
import Berries from "./berries";

console.log("App js");

class App extends Component{

    onClick(){
    this.setState(prevState => ({ childVisible: !prevState.childVisible}));
    }


    render() {
        return (
            <HashRouter>
                <div>
                <form>
                    <center><h1>Western Room Booker</h1></center>
                    <div className="imgcontainer">
                        <img src={avatar} alt="Missing string" width={150} height={150}/>
                    </div>

                    <div className="container">
                        <label form="uname"><b>@UWO Email Adress</b></label>
                        <input type="text" placeholder="Enter email" name="uname" required/>


                        <button type="submit" onClick={()=> this.onClick()}>Login</button>

                    </div>
                </form>
                <div>
                    <NavLink exact to={"/main"}>Log In</NavLink><br/>
                    <NavLink exact to={"/berries"}>BERRIES</NavLink>
                    <Route path={"/main"} component={Main}/>
                    <Route exact path={"/berries"} component={Berries}/></div>
                </div>
            </HashRouter>

        );
    }
}

console.log("App js exit");

export default App;
