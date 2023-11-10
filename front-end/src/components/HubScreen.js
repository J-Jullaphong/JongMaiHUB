import React, { Component, useEffect, useState } from "react";
import { Carousel, Panel, List, Row, Col, Button } from "rsuite";
import "./styles/HubScreen.css";
import { useNavigate } from "react-router-dom";
import DataFetcher from './DataFetcher';

const handleCardClick = () => {
    alert("Clicked!");
};

const Card = ({service, rating}) => {
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
                        <img src={serviceData.service_picture} height="100" width="100" alt="Image" />
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '10px', textAlign: 'left'}}>
                        <p>{service.name}</p>
                        <p>Rating: {rating.rate}</p>
                    </td>
                </tr>
            </table>
        </Panel>
    )
}

const HubScreen = () => {
    const [serviceData, setServiceData] = useState([]);
    const [appointmentData, setAppointmentData] = useState([]);
    const [ratingData, setRatingData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const dataFetcher = new DataFetcher();
            try {
                const [serviceData, appointmentData, ratingData] = await Promise.all([
                    dataFetcher.getServiceData(),
                    dataFetcher.getAppointmentData(),
                    dataFetcher.getRatingData(),
                ]);
    
                ratingData.forEach((rating) => {
                    const serviceId = rating.appointment.service.id;
                    if (!averageRatings[serviceId]) {
                        averageRatings[serviceId] = {
                            totalRating: 0,
                            count: 0,
                        };
                    }
                    averageRatings[serviceId].totalRating += rating.rating;
                    averageRatings[serviceId].count += 1;
                });
    
                // Calculate average rating for each service
                const sortedServices = serviceData.map((service) => {
                    const serviceId = service.id;
                    const averageRating = averageRatings[serviceId]
                        ? averageRatings[serviceId].totalRating / averageRatings[serviceId].count
                        : 0;
                    return {
                        ...service,
                        averageRating,
                    };
                });
    
                // Sort services based on average rating in descending order
                const sortedServicesDescending = sortedServices.sort((a, b) => b.averageRating - a.averageRating);
    
                // Select the top 4 services
                const top4Services = sortedServicesDescending.slice(0, 4);
    
                setServiceData(serviceData);
                setAppointmentData(appointmentData);
                setRatingData(ratingData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    

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
                    <Card service ={serviceData[0]}/>
                </Col>
                <Col md={6} sm={12}>
                    <Card service ={serviceData[1]}/>
                </Col>
                <Col md={6} sm={12}>
                    <Card service ={serviceData[2]}/>
                </Col>
                <Col md={6} sm={12}>
                  <Card service ={serviceData[3]}/>
                </Col>
            </Row>
            </div>
        </div>
    );
}

export default HubScreen;
