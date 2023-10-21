import React, { Component } from "react";
import { Carousel } from "rsuite";
import "./styles/HubScreen.css";

class HubScreen extends Component {
    render() {
        return (
            <div className="container">
                <div className="group">
                    <h2>Popular Services</h2>
                </div>
                <div className="popular-carousel">
                    <Carousel autoplay style={{ borderRadius: 50 }}>
                        <img src="images/beauty-clinic.png" />
                        <img src="images/barber.png" />
                    </Carousel>
                </div>
                <div className="group">
                    <h2>Recommended Services</h2>
                </div>
            </div>
        );
    }
}

export default HubScreen;
