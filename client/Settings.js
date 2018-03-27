import React, { Component } from "react";

class Settings extends Component {

    render() {
        return (
            <div>
                <h2>SETTINGS</h2>
                <hr/>
                <h3>Direct Email Notifications:</h3>
                <fieldset>
                    <div>
                        <input type="checkbox" id="enable" name="interest" value="enable" />
                            <label for="enable">Enable</label>
                    </div>
                    <div>
                        <input type="checkbox" id="disable" name="interest" value="disable"/>
                            <label for="disable">Disable</label>
                    </div>
                </fieldset>

            </div>
        );
    }
}

export default Settings;