import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Panel, Modal } from "rsuite";
import Reservation from "./Reservation";
import "./styles/ServiceDetail.css";

const ServiceDetail = ({ serviceData, providerData, staffData }) => {
    const { providerUrl, serviceUrl } = useParams();
    const [open, setOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState("");
    const handleOpen = (staff) => {
        setSelectedStaff(staff)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const provider = providerData.find(
        (provider) => provider.uid === providerUrl.split("-")[0]
    );
    const service = serviceData.find(
        (service) => service.id.toString() === serviceUrl.split("-")[0]
    );

    const staffs = staffData.filter((staff) => staff.service === service.id);

    // const displayReservation = () => {
    //     return
    // }

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
                <h3>Available Staffs</h3>
                <div className="staffs">
                    {staffs.map((staff) => (
                        <div className="staff-detail" key={staff.uid}>
                            <Panel shaded bodyFill className="main-panel">
                                <img
                                    src={staff.profile_picture}
                                    alt={staff.name}
                                />
                                <Panel header={staff.name} style={{backgroundColor: "white"}}>
                                    <button onClick={() => handleOpen(staff)}>View</button>
                                    <Modal open={open} onClose={handleClose}>
                                    <Modal.Header>{service.name}</Modal.Header>
                                    <Modal.Body>{<Reservation service={service} staff={selectedStaff} provider={provider} />}</Modal.Body>
                                    </Modal>
                                    <p>
                                        <small>
                                            Specialty: {staff.specialty}
                                        </small>
                                    </p>
                                </Panel>
                            </Panel>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
