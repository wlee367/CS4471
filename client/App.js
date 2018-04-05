import React, { Component } from 'react';
import './css/App.css';
//import avatar from './assets/avatar.png';
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
                    <center><h1>Western Room Booker</h1></center>
                    <div className="imgcontainer">
                        {/*<img src={avatar} alt="Missing string" width={150} height={150}/>*/}
                    </div>

                    <input type='checkbox' id='form-switch'/>
                <form id='login-form' action="" method='post' onSubmit={this.handleSubmit}>
                    <div className="container">
                        <label form="email"><b>UWO Email Adress</b></label>
                        <input type="text" placeholder="Enter email" name="email" required/>

                        <label form="password"><b>Password</b></label>
                        <input type="text" placeholder="Enter password" name="password" required/>
                        <br/>


                        <button type = 'login'><NavLink type = 'nav' exact to={"/main"}>Log In</NavLink><br/></button>
                        <label type="reg" for='form-switch'><span>Don't have an account? Register</span></label>


                    </div>
                </form>

                <form id='register-form'>
                    <div className={"container"}>
                        <label form="firstName"><b>First Name</b></label>
                        <input type="text" placeholder="Enter first name" name="firstName" required/>
                        <label form="lastName"><b>Last Name</b></label>
                        <input type="text" placeholder="Enter last name" name="lastName" required/>
                        <label form="email"><b>UWO Email</b></label>
                        <input type="text" placeholder="Enter password" name="email" required/>
                        <label form="password"><b>Password</b></label>
                        <input type="text" placeholder="Enter password" name="password" required/>
                        <label form="password2"><b>Confirm Password</b></label>
                        <input type="text" placeholder="Confirm password" name="password2" required/>
                        <br/>

                        <NavLink  id="formswitch" exact to={"/main"}>Log In</NavLink><br/>
                        <label type="reg" for='form-switch'>Already a Member ? Sign In Now..</label>
                    </div>
                </form>
                <div>
                    <Route path={"/main"} component={Main}/></div>
                </div>
            </HashRouter>

        );
    }
}

export default App;

function stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()){
        data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2)
};
