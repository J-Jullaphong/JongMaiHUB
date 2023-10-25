import React from "react";
import { useParams } from "react-router-dom";
import "./styles/ServiceDetail.css";

const ServiceDetail = ({ serviceData, providerData }) => {
    const { providerUrl, serviceUrl } = useParams();

    const provider = providerData.find(
        (provider) => provider.uid === providerUrl.split("-")[0]
    );
    const service = serviceData.find(
        (service) =>
            service.name.toLowerCase().replaceAll(" ", "-") === serviceUrl
    );

    return (
        <div className="detail">
            <div className="provider-detail">
                <div className="provider-image">
                    <img src={provider.profile_picture} alt={provider.name} />
                </div>
                <h2>{provider.name}</h2>
                <p>Open: {provider.opening_time}</p>
                <p>Close: {provider.closing_time}</p>
                <p>Location: {provider.location}</p>
            </div>
            <div className="service-detail">
                <div className="service-image">
                    <img src={service.service_picture} alt={service.name} />
                </div>
                <h2>{service.name}</h2>
                <p>Duration: {service.duration} Minutes</p>
                <p>Price: {service.price} Baht</p>
            </div>
        </div>
    );
};

export default ServiceDetail;
