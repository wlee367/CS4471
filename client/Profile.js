import React, { Component } from "react";

class Profile extends Component {
    render() {
        return (
            <div>
                <h2>PROFILE</h2>
                <hr/>
                <h3>First Name:</h3><br/>
                    <h2>Jose</h2>
                    <input type="text" name="firstname"/>
                    <button type="update">Update</button><br/>
                <h3>Last Name:</h3><br/>
                    <h2>Rivera</h2><br/>
                    <input type="text" name="lasttname"/><br/>
                    <button type="update">Update</button><br/>
                <h3>User Email:</h3><br/>
                    <h2>jrivera4@uwo.ca</h2>
                    <input type="text" name="email"/><br/>
                    <button type="update">Update</button><br/>
            </div>
        );
    }
}

export default Profile;