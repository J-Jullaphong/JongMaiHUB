import React, { Component } from "react";
import { Carousel, Panel, List, Row, Col, Button } from "rsuite";
import "./styles/HubScreen.css";
import DataFetcher from './DataFetcher';

const data = {
    name: "Service Name",
    type: "Service Type",
    rating: "Service Rating",
};

const handleCardClick = () => {
    alert("Clicked!");
};

const Card = () => {
    const service = new DataFetcher().getServiceData();
    return (
        <Panel 
            shaded 
            bordered 
            style={{ 
                display: 'inline-block', 
                width: 360,
                cursor:'pointer',
                transition: 'background-color 0.2s',
                backgroundColor: 'white',
                }}
            onClick={handleCardClick}
        >
            <table className="card" style={{ width: '100%' }}>
                <tr>
                    <td style={{ padding: '10px'}}>
                        <img src="https://via.placeholder.com/100x100" height="100" width="100" alt="Image" />
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '10px', textAlign: 'left'}}>
                        <p>{service.name}</p>
                        <p>{service.type}</p>
                        <p>Rating</p>
                    </td>
                </tr>
            </table>
        </Panel>
    )
}

const HubScreen = () => {
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
            <div className="recommend-panel">
            <Row>
                <Col md={6} sm={12}>
                    <Card />
                </Col>
                <Col md={6} sm={12}>
                    <Card />
                </Col>
                <Col md={6} sm={12}>
                    <Card />
                </Col>
                <Col md={6} sm={12}>
                  <Card />
                </Col>
            </Row>
            </div>
        </div>
    );
}

export default HubScreen;
