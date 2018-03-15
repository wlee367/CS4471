import React, { Component } from 'react';
import './CSS/App.css';
import avatar from './assets/avatar.png';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Main from "./Main";


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
                    <Route path={"/main"} component={Main}/></div>
                </div>
            </HashRouter>

        );
    }
}


export default App;
