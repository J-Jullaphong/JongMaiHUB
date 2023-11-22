import React, { useEffect, useState } from "react";
import { Table, Calendar, Button } from "rsuite";
import DataFetcher from "./DataFetcher";
import { useParams } from "react-router-dom";

const Appointment = ({
  user,
  serviceData,
  staffData,
  customerData,
  isProvider,
}) => {
  const currentDate = new Date();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterType, setFilterType] = useState("all");
  const [tableWidth, setTableWidth] = useState(isProvider ? 1000 : 800);
  const { providerUid, staffUid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const dataFetcher = new DataFetcher();
      try {
        const [appointmentData] = await Promise.all([
          isProvider
            ? dataFetcher.getAppointmentByProvider(providerUid)
            : dataFetcher.getAppointmentByStaff(staffUid),
        ]);

        const sortedData = appointmentData.sort(
          (a, b) => new Date(a.date_time) - new Date(b.date_time)
        );
        setAppointments(sortedData);
        setSelectedAppointment(
          sortedData.filter(
            (sortedData) => new Date(sortedData.date_time) >= currentDate
          )
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, providerUid, staffUid, isProvider]);

  const displayCustomerInfo = (customer) => {
    alert(
      `Customer
      \nName: ${customer.name}
      \nEmail: ${customer.email}
      \nPhone: ${customer.phone_number}`
    );
  };

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

  const handleFilterChange = (type, date) => {
    setFilterType(type);
    switch (type) {
      case "today":
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        setSelectedAppointment(
          appointments.filter(
            (appointment) =>
              new Date(appointment.date_time) >= todayStart &&
              new Date(appointment.date_time) <= todayEnd
          )
        );
        break;
      case "thisWeek":
        const nextWeek = new Date();
        nextWeek.setDate(currentDate.getDate() + 7);
        setSelectedAppointment(
          appointments.filter(
            (appointment) =>
              new Date(appointment.date_time) >= currentDate &&
              new Date(appointment.date_time) < nextWeek
          )
        );
        break;
      case "thisMonth":
        const nextMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
        setSelectedAppointment(
          appointments.filter(
            (appointment) =>
              new Date(appointment.date_time) >= currentDate &&
              new Date(appointment.date_time) <= nextMonth
          )
        );
        break;
      case "custom":
        const dateString = date.toDateString();
        setSelectedAppointment(
          appointments.filter(
            (appointment) =>
              new Date(appointment.date_time) >= currentDate &&
              new Date(appointment.date_time).toDateString() === dateString
          )
        );
        break;
      default:
        setSelectedAppointment(
          appointments.filter(
            (appointment) => new Date(appointment.date_time) >= currentDate
          )
        );
    }
  };

  return (
    <div className="appointments-container">
      <h2 className="appointment-title">Provider Appointments</h2>
      <div className="filter-buttons">
        <Button
          onClick={() => handleFilterChange("all")}
          appearance={filterType === "all" ? "primary" : "default"}
        >
          All
        </Button>
        <Button
          onClick={() => handleFilterChange("today")}
          appearance={filterType === "today" ? "primary" : "default"}
        >
          Today
        </Button>
        <Button
          onClick={() => handleFilterChange("thisWeek")}
          appearance={filterType === "thisWeek" ? "primary" : "default"}
        >
          This Week
        </Button>
        <Button
          onClick={() => handleFilterChange("thisMonth")}
          appearance={filterType === "thisMonth" ? "primary" : "default"}
        >
          This Month
        </Button>
      </div>
      {loading ? (
        <h2 className="loading">Loading...</h2>
      ) : (
        <>
          <div className="upcoming-container">
            <h5>Booked times</h5>
            <Calendar
              value={selectedDate}
              onChange={(value) => {
                setSelectedDate(value);
                handleFilterChange("custom", value);
              }}
              renderCell={(date) => {
                const dateString = date.toDateString();
                const appointmentsOnDate = appointments.filter(
                  (appointment) =>
                    new Date(appointment.date_time) >= currentDate &&
                    new Date(appointment.date_time).toDateString() ===
                      dateString
                );
                const numberOfAppointments = appointmentsOnDate.length;
                if (appointmentsOnDate.length > 0) {
                  return (
                    <div
                      style={{
                        position: "relative",
                        padding: "5px",
                        background: "#e6e6e6",
                        borderRadius: "5px",
                      }}
                    >
                      {numberOfAppointments > 0 && (
                        <div style={{ margin: "5px 0", color: "#333" }}>
                          {numberOfAppointments}{" "}
                          {numberOfAppointments === 1
                            ? "Appointment"
                            : "Appointments"}
                        </div>
                      )}
                    </div>
                  );
                } else {
                  return null;
                }
              }}
            />
          </div>

          {selectedAppointment.length > 0 && (
            <div className="upcoming-container">
              <h5>Appointments</h5>
              <Table
                className="table-upcoming"
                data={selectedAppointment}
                autoHeight
                width={tableWidth}
              >
                {isProvider && (
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
                )}
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
                  <Table.HeaderCell>Customer</Table.HeaderCell>
                  <Table.Cell>
                    {(rowData) => {
                      const customer = customerData.find(
                        (customer) => customer.uid === rowData.customer
                      );
                      return customer ? customer.name : "";
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
                  <Table.HeaderCell>Customer Information</Table.HeaderCell>
                  <Table.Cell>
                    {(rowData) => {
                      const customer = customerData.find(
                        (customer) => customer.uid === rowData.customer
                      );
                      return (
                        <Button
                          className="provider-view-button"
                          onClick={() => displayCustomerInfo(customer)}
                        >
                          View
                        </Button>
                      );
                    }}
                  </Table.Cell>
                </Table.Column>
              </Table>
            </div>
          )}
          {selectedAppointment.length === 0 && (
            <div className="upcoming-container">
              <h5>You don't have any appointments.</h5>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Appointment;
