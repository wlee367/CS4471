import React, { Component } from "react";

class Bookings extends Component {
    render() {
        return (
            <div>
                <h2>Book Any Room</h2>
                <a href="mailto:bookroom@uwo.ca?subject=Room Reservation Request&amp;body=&#10;Name: %0A%0a&#10;
                Email address: %0A%0a&#10;Phone number: %0A%0a&#10;What is the date of your booking? %0A%0a&#10;
                Start Time: %0A%0a&#10;End Time: %0A%0a&#10;Who is this booking for: Department, Student Group or External group? %0A%0a&#10;
                What is the group name? %0A%0a&#10;If this is a USC club booking have you submitted an event proposal to the USC? %0A%0a&#10;
                Is everyone attending a Western student, staff, or faculty member? %0A%0a&#10;What is the purpose of this booking? %0A%0a&#10;
                How many people will be attending? %0A%0a&#10;Building preference: %0A%0a&#10;Room preference: %0A%0a&#10;
                Do you require multimedia equipment? %0A%0a&#10;Please include any extra information about your booking here:">
                Request to Book a Room</a>
                <h2>Book a Study Space</h2>
                <a href = "https://www.lib.uwo.ca/services/studyspace.html">Western Libraries Study Spaces</a>
            </div>
        );
    }
}

export default Bookings;
