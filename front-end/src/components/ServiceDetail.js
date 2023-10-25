import React from "react";
import { useParams } from "react-router-dom";

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
        <div>
            <div className="provider">
                <img src={provider.profile_picture} alt={provider.name} />
                <h1>{provider.name}</h1>
                <p>Open: {provider.opening_time}</p>
                <p>Close: {provider.closing_time}</p>
                <p>Location: {provider.location}</p>
            </div>
            <div className="service">
                <img src={service.service_picture} alt={service.name} />
                <h1>{service.name}</h1>
                <p>Duration: {service.duration} Minutes</p>
                <p>Price: {service.price} Baht</p>
            </div>
        </div>
    );
};

export default ServiceDetail;
