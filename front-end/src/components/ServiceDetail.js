import React from "react";
import { useParams } from "react-router-dom";
import "./styles/ServiceDetail.css";

const ServiceDetail = ({ serviceData, providerData, staffData }) => {
    const { providerUrl, serviceUrl } = useParams();

    const provider = providerData.find(
        (provider) => provider.uid === providerUrl.split("-")[0]
    );
    const service = serviceData.find(
        (service) => service.id.toString() === serviceUrl.split("-")[0]
    );

    const staffs = staffData.filter((staff) => staff.service === service.id);

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
                <div className="staffs">
                    <h2>Available Staffs</h2>
                    {staffs.map((staff) => 
                        <div className="staff-detail" key={staff.uid}>
                        <img src={staff.profile_picture} alt={staff.name}/>
                        <h3>{staff.name}</h3>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
