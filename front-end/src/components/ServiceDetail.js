import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Panel, Modal } from "rsuite";
import Reservation from "./Reservation";
import DataFetcher from "./DataFetcher";
import "./styles/ServiceDetail.css";

const ServiceDetail = ({ user, isUserAuthenticated }) => {
  const { providerUrl, serviceUrl } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [provider, setProvider] = useState(null);
  const [service, setService] = useState(null);
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const dataFetcher = new DataFetcher();
      try {
        const [serviceData, providerData, staffData] = await Promise.all([
          dataFetcher.getServiceData(serviceUrl.split("-")[0]),
          dataFetcher.getServiceProviderData(providerUrl.split("-")[0]),
          dataFetcher.getStaffData(),
        ]);
        setProvider(providerData);
        setService(serviceData);
        setStaffs(staffData.filter((staff) => staff.service === service.id));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpen = (staff) => {
    setSelectedStaff(staff);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

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
        <h3>Available Staff</h3>
        <div className="staffs">
          {staffs.map((staff) => (
            <div className="staff-detail" key={staff.uid}>
              <Panel shaded bodyFill className="main-panel">
                <img src={staff.profile_picture} alt={staff.name} />
                <Panel header={staff.name} style={{ backgroundColor: "white" }}>
                  <button onClick={() => handleOpen(staff)}>View</button>
                  <Modal open={open} onClose={handleClose}>
                    <Modal.Header>{service.name}</Modal.Header>
                    <Modal.Body>
                      {isUserAuthenticated ? (
                        <Reservation
                          user={user}
                          service={service}
                          staff={selectedStaff}
                          provider={provider}
                        />
                      ) : (
                        <Link to={"/login"}>
                          <h3 style={{ color: "red" }}>Click here to login!</h3>
                        </Link>
                      )}
                    </Modal.Body>
                  </Modal>
                  <p>
                    <small>Specialty: {staff.specialty}</small>
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
