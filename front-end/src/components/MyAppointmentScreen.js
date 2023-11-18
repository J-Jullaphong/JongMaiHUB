import React, { useEffect, useState } from "react";
import { Modal, Table } from "rsuite";
import DataFetcher from "./DataFetcher";
import DataSender from "./DataSender";
import RatingScreen from "./RatingScreen";
import { useNavigate } from "react-router-dom";
import "./styles/MyAppointmentScreen.css";

const MyAppointmentScreen = ({
  user,
  serviceData,
  providerData,
  staffData,
}) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const dataSender = new DataSender();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const dataFetcher = new DataFetcher();
      try {
        const [CustomerAppointmentData] = await Promise.all([
          dataFetcher.getAppointmentByCustomer(user.getUID()),
        ]);

        const sortedData = CustomerAppointmentData.sort((a, b) => {
          return new Date(b.date_time) - new Date(a.date_time);
        });

        setAppointments(sortedData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, appointments]);

  const handleCancelAppointment = (appointmentId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (shouldDelete) {
      dataSender.deleteAppointment(appointmentId);
      window.alert("Successfully cancel appointment.");
      navigate(`/my-appointment`);
    }
  };

  const handleRateAppointment = (appointmentId) => {
    setOpen(true);
    setSelectedAppointment(appointmentId);
  };

  const handleClose = () => setOpen(false);

  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day} ${month} ${year} ${hours}:${minutes}`;
  };

  const currentDate = new Date();

  const pastAppointments = appointments.filter(
    (appointment) => new Date(appointment.date_time) < currentDate
  );
  const upcomingAppointments = appointments.filter(
    (appointment) => new Date(appointment.date_time) >= currentDate
  );

  return (
    <div className="appointments-container">
      <h2 className="appointment-title">My Appointments</h2>
      {loading ? (
        <h2 className="loading">Loading...</h2>
      ) : (
        <>
          {upcomingAppointments.length > 0 && (
            <div className="upcoming-container">
              <h5>Upcoming Appointments</h5>
              <Table
                className="table-upcoming"
                data={upcomingAppointments}
                autoHeight
                width={1000}
              >
                <Table.Column width={200} align="center">
                  <Table.HeaderCell>Provider</Table.HeaderCell>
                  <Table.Cell>
                    {(rowData) => {
                      const service = serviceData.find(
                        (service) => service.id === rowData.service
                      );
                      const provider = providerData.find(
                        (provider) => provider.uid === service.service_provider
                      );
                      return provider ? provider.name : "";
                    }}
                  </Table.Cell>
                </Table.Column>
                <Table.Column width={200} align="center">
                  <Table.HeaderCell>Service</Table.HeaderCell>
                  <Table.Cell>
                    {(rowData) => {
                      const service = serviceData.find(
                        (service) => service.id === rowData.service
                      );
                      return service ? service.name : "";
                    }}
                  </Table.Cell>
                </Table.Column>
                <Table.Column width={200} align="center">
                  <Table.HeaderCell>Staff</Table.HeaderCell>
                  <Table.Cell>
                    {(rowData) => {
                      const staff = staffData.find(
                        (staff) => staff.uid === rowData.staff
                      );
                      return staff ? staff.name : "";
                    }}
                  </Table.Cell>
                </Table.Column>
                <Table.Column width={200} align="center">
                  <Table.HeaderCell>Start</Table.HeaderCell>
                  <Table.Cell>
                    {(rowData) => formatDateTime(rowData.date_time)}
                  </Table.Cell>
                </Table.Column>
                <Table.Column width={200}>
                  <Table.HeaderCell>Cancel</Table.HeaderCell>
                  <Table.Cell>
                    {(rowData) => (
                      <button
                        className="cancel-button"
                        onClick={() => handleCancelAppointment(rowData.id)}
                      >
                        Cancel
                      </button>
                    )}
                  </Table.Cell>
                </Table.Column>
              </Table>
            </div>
          )}

          {pastAppointments.length > 0 && (
            <div className="past-container">
              <h5>Past Appointments</h5>
              <Table
                className="table-pastAppointment"
                data={pastAppointments}
                autoHeight
                width={1000}
              >
                <Table.Column width={200} align="center">
                  <Table.HeaderCell>Provider</Table.HeaderCell>
                  <Table.Cell>
                    {(rowData) => {
                      const service = serviceData.find(
                        (service) => service.id === rowData.service
                      );
                      const provider = providerData.find(
                        (provider) => provider.uid === service.service_provider
                      );
                      return provider ? provider.name : "";
                    }}
                  </Table.Cell>
                </Table.Column>
                <Table.Column width={200} align="center">
                  <Table.HeaderCell>Service</Table.HeaderCell>
                  <Table.Cell>
                    {(rowData) => {
                      const service = serviceData.find(
                        (service) => service.id === rowData.service
                      );
                      return service ? service.name : "";
                    }}
                  </Table.Cell>
                </Table.Column>
                <Table.Column width={200} align="center">
                  <Table.HeaderCell>Staff</Table.HeaderCell>
                  <Table.Cell>
                    {(rowData) => {
                      const staff = staffData.find(
                        (staff) => staff.uid === rowData.staff
                      );
                      return staff ? staff.name : "";
                    }}
                  </Table.Cell>
                </Table.Column>
                <Table.Column width={200} align="center">
                  <Table.HeaderCell>Start</Table.HeaderCell>
                  <Table.Cell>
                    {(rowData) => formatDateTime(rowData.date_time)}
                  </Table.Cell>
                </Table.Column>
                <Table.Column width={200} align="center">
                  <Table.HeaderCell>Rate</Table.HeaderCell>
                  <Table.Cell>
                    {(rowData) => (
                      <button
                        className="rate-button"
                        onClick={() => handleRateAppointment(rowData.id)}
                      >
                        Rate
                      </button>
                    )}
                  </Table.Cell>
                </Table.Column>
              </Table>
            </div>
          )}

          {pastAppointments.length === 0 &&
            upcomingAppointments.length === 0 && (
              <h2>Sorry, You don't have any appointments.</h2>
            )}

          <Modal open={open} onClose={handleClose}>
            <Modal.Header>Please Rate</Modal.Header>
            <Modal.Body>
              <RatingScreen appointmentId={selectedAppointment} />
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
};

export default MyAppointmentScreen;
