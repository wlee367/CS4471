import React, { Component } from "react";

class Settings extends Component {
    constructor() {
        super();

        this.state = {
            button: 'enable'
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
          button: event.target.value
        });
      }

    render() {
        return (
            <div>
                <h2>SETTINGS</h2>
                <hr/>
                <h3>Direct Email Notifications:</h3>
                 <form>
                    <div>
                        <label>
                             <input type="radio" value="enable" name = 'button' checked={this.state.button === 'enable'} onChange={this.handleChange} />
                            Enable
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="radio" value="disable" name = 'button' checked={this.state.button === 'disable'} onChange={this.handleChange}/>
                            Disable
                        </label>
                    </div>
               </form>

            </div>
        );
    }
}
export default Settings;
