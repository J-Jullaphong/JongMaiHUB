import React, { useEffect, useState } from "react";
import { Carousel, Panel, Row, Col, Rate } from "rsuite";
import "./styles/HubScreen.css";
import { useNavigate } from "react-router-dom";
import DataFetcher from "./DataFetcher";

const HubScreen = () => {
  const [loading, setLoading] = useState(true);
  const [providerLists, setProviderLists] = useState([]);
  const [top4ServicesByRating, setTop4ServicesByRating] = useState([]);
  const [top3ServicesByAppointments, setTop3ServicesByAppointments] = useState(
    []
  );
  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    const providerUrl =
      service.service_provider +
      "-" +
      providerLists[service.service_provider][0]
        .toLowerCase()
        .replaceAll(" ", "-");
    const serviceUrl =
      service.id + "-" + service.name.toLowerCase().replaceAll(" ", "-");
    navigate(`/${providerUrl}/${serviceUrl}/`);
  };

  const Card = ({ service }) => {
    const roundedRating = (rating) => {
      const integerPart = Math.floor(rating);
      const decimalPart = rating - integerPart;

      if (decimalPart < 0.3) {
        return integerPart;
      } else if (decimalPart >= 0.3 && decimalPart <= 0.7) {
        return integerPart + 0.5;
      } else {
        return Math.ceil(rating);
      }
    };

    return (
      <div className="card">
        <Panel
          shaded
          bordered
          style={{
            display: "flex",
            width: "100%",
            cursor: "pointer",
            transition: "background-color 0.2s",
            backgroundColor: "white",
            borderRadius: "25px",
          }}
          onClick={() => handleServiceClick(service)}
        >
          <table style={{ width: "80%" }}>
            <tr>
              <td style={{ padding: "10px" }}>
                <img
                  src={service.service_picture}
                  height="100px"
                  width="100px"
                  alt="Image"
                />
              </td>
              <td
                style={{
                  verticalAlign: "top",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                <h5>{service.name}</h5>
                <br />
                <Rate
                  defaultValue={roundedRating(service.averageRating)}
                  allowHalf
                  readOnly
                />
              </td>
            </tr>
          </table>
        </Panel>
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const dataFetcher = new DataFetcher();
      try {
        const [serviceData, appointmentData, ratingData, providerData] =
          await Promise.all([
            dataFetcher.getServiceData(),
            dataFetcher.getAppointmentData(),
            dataFetcher.getRatingData(),
            dataFetcher.getServiceProviderData(),
          ]);

        const appointmentCounts = {};
        appointmentData.forEach((appointment) => {
          const serviceId = appointment.service;
          if (!appointmentCounts[serviceId]) {
            appointmentCounts[serviceId] = 0;
          }
          appointmentCounts[serviceId] += 1;
        });

        const sortedServicesByAppointments = serviceData.map((service) => ({
          ...service,
          appointmentCount: appointmentCounts[service.id] || 0,
        }));

        const top3ServicesByAppointments = sortedServicesByAppointments
          .sort((a, b) => b.appointmentCount - a.appointmentCount)
          .slice(0, 3);

        const averageRatings = {};

        ratingData.forEach((rating) => {
          const appointmentId = rating.appointment;
          const appointment = appointmentData.find(
            (appointment) => appointment.id === appointmentId
          );

          if (appointment) {
            const serviceId = appointment.service;
            if (!averageRatings[serviceId]) {
              averageRatings[serviceId] = {
                totalRating: 0,
                count: 0,
              };
            }
            averageRatings[serviceId].totalRating += parseFloat(rating.rating);
            averageRatings[serviceId].count += 1;
          }
        });

        const sortedServices = serviceData.map((service) => {
          const serviceId = service.id;
          const averageRating = averageRatings[serviceId]
            ? averageRatings[serviceId].totalRating /
              averageRatings[serviceId].count
            : 0;
          return {
            ...service,
            averageRating,
          };
        });

        const sortedServicesDescending = sortedServices.sort(
          (a, b) => b.averageRating - a.averageRating
        );

        const top4Services = sortedServicesDescending.slice(0, 4);

        const providerLists = providerData.reduce((acc, provider) => {
          acc[provider.uid] = provider.name;
          return acc;
        }, {});
        
        setProviderLists(providerLists);
        setTop4ServicesByRating(top4Services);
        setTop3ServicesByAppointments(top3ServicesByAppointments);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="container">
      <div className="group">
        <h3 className="hub-title">Popular Services</h3>
      </div>
      <div className="popular-carousel">
        <Carousel autoplay style={{ borderRadius: 50, height: "50vh" }}>
          {top3ServicesByAppointments.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className="carousel-item"
            >
              <img src={service.service_picture} alt={service.name} />
              <div className="carousel-text">
                <p>{service.name}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="group">
        <h3 className="hub-title">Recommended Services</h3>
      </div>
      <div className="recommend-panel">
        <Row>
          {top4ServicesByRating.map((service) => (
            <Col md={6} sm={12} key={service.id}>
              <Card service={service} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HubScreen;
