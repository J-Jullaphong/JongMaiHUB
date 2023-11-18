import React, { useEffect, useState } from "react";
import { Table, Calendar, Button } from "rsuite";
import DataFetcher from "./DataFetcher";
import { useParams } from 'react-router-dom';

const AppointmentStaff = ({
    user,
    serviceData,
    providerData,
    customerData,
}) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedAppointment, setSelectedAppointment] = useState([]);
    const [filterType, setFilterType] = useState("all");
    const [staff, setStaff] = useState('');
    const { staffUid } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const dataFetcher = new DataFetcher();
            try {
                const [StaffData, StaffAppointmentData] = await Promise.all([
                    dataFetcher.getStaffData(staffUid),
                    dataFetcher.getAppointmentByStaff(staffUid),
                ]);

                const sortedData = StaffAppointmentData.sort((a, b) => {
                    return new Date(a.date_time) - new Date(b.date_time);
                });
                setStaff(StaffData);
                setAppointments(sortedData);
                setSelectedAppointment(sortedData.filter(
                    (sortedData) => new Date(sortedData.date_time) >= new Date()
                ));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    const displayCustomerInfo = (customer) => {
        alert(`Customer Name: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone_number}`);
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
        const currentDate = new Date();
        switch (type) {
            case "today":
                const todayStart = new Date();
                todayStart.setHours(0, 0, 0, 0);
                const todayEnd = new Date();
                todayEnd.setHours(23, 59, 59, 999);
                setSelectedAppointment(appointments.filter(
                    (appointment) =>
                        new Date(appointment.date_time) >= todayStart &&
                        new Date(appointment.date_time) <= todayEnd
                ));
                break;
            case "thisWeek":
                const nextWeek = new Date();
                nextWeek.setDate(currentDate.getDate() + 7);
                setSelectedAppointment(appointments.filter(
                    (appointment) => new Date(appointment.date_time) >= currentDate &&
                        new Date(appointment.date_time) < nextWeek
                ));
                break;
            case "thisMonth":
                const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                setSelectedAppointment(appointments.filter(
                    (appointment) => new Date(appointment.date_time) >= currentDate &&
                        new Date(appointment.date_time) <= nextMonth
                ));
                break;
            case "custom":
                const dateString = date.toDateString();
                setSelectedAppointment(appointments.filter(
                    (appointment) => new Date(appointment.date_time).toDateString() === dateString
                ));
                break;
            default:
                setSelectedAppointment(appointments.filter(
                    (appointment) => new Date(appointment.date_time) >= currentDate
                ));
        }
    };


    return (
        <div className="appointments-container">
            <h2 className="appointment-title">Staff Appointments : {staff ? staff.name : ''}</h2>
            <div className="filter-buttons">
                <Button onClick={() => handleFilterChange("all")} appearance={filterType === "all" ? "primary" : "default"}>All</Button>
                <Button onClick={() => handleFilterChange("today")} appearance={filterType === "today" ? "primary" : "default"}>Today</Button>
                <Button onClick={() => handleFilterChange("thisWeek")} appearance={filterType === "thisWeek" ? "primary" : "default"}>This Week</Button>
                <Button onClick={() => handleFilterChange("thisMonth")} appearance={filterType === "thisMonth" ? "primary" : "default"}>This Month</Button>
            </div>
            {loading ? (
                <h2 className="loading">Loading...</h2>
            ) : (
                <>
                    <div className="past-container">
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
                                        appointment.staff === staffUid &&
                                        new Date(appointment.date_time).toDateString() === dateString
                                );
                                const numberOfAppointments = appointmentsOnDate.length;
                                if (appointmentsOnDate.length > 0) {
                                    return (
                                        <div style={{ position: 'relative', padding: '5px', background: '#e6e6e6', borderRadius: '5px' }}>
                                            {numberOfAppointments > 0 && (
                                                <div style={{ margin: '5px 0', color: '#333' }}>
                                                    {numberOfAppointments} {numberOfAppointments === 1 ? 'Appointment' : 'Appointments'}
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
                    {selectedAppointment.length > 0 &&
                        <div className="upcoming-container">
                            <h5>Appointments</h5>
                            <Table
                                className="table-upcoming"
                                data={selectedAppointment}
                                autoHeight
                                width={1000}
                            >
                                <Table.Column
                                    width={200}
                                    align="center">
                                    <Table.HeaderCell>Provider</Table.HeaderCell>
                                    <Table.Cell>
                                        {rowData => {
                                            const service = serviceData.find(service => service.id === rowData.service);
                                            const provider = providerData.find(provider => provider.uid === service.service_provider);
                                            return provider ? provider.name : '';
                                        }}
                                    </Table.Cell>
                                </Table.Column>
                                <Table.Column
                                    width={200}
                                    align="center">
                                    <Table.HeaderCell>Service</Table.HeaderCell>
                                    <Table.Cell>
                                        {rowData => {
                                            const service = serviceData.find(service => service.id === rowData.service);
                                            return service ? service.name : '';
                                        }}
                                    </Table.Cell>
                                </Table.Column>
                                <Table.Column
                                    width={200}
                                    align="center">
                                    <Table.HeaderCell>Customer</Table.HeaderCell>
                                    <Table.Cell>
                                        {rowData => {
                                            const customer = customerData.find(customer => customer.uid === rowData.customer);
                                            return customer ? customer.name : '';
                                        }}
                                    </Table.Cell>
                                </Table.Column>
                                <Table.Column
                                    width={200}
                                    align="center">
                                    <Table.HeaderCell>Start</Table.HeaderCell>
                                    <Table.Cell>
                                        {rowData => formatDateTime(rowData.date_time)}
                                    </Table.Cell>
                                </Table.Column>
                                <Table.Column
                                    width={200}
                                >
                                    <Table.HeaderCell>Customer Information</Table.HeaderCell>
                                    <Table.Cell>
                                        {rowData => {
                                            const customer = customerData.find(customer => customer.uid === rowData.customer);
                                            return (
                                                <button
                                                    className="cancel-button"
                                                    onClick={() => displayCustomerInfo(customer)}
                                                >
                                                    View
                                                </button>
                                            );
                                        }}
                                    </Table.Cell>
                                </Table.Column>
                            </Table>
                        </div>
                    }
                    {selectedAppointment.length === 0 &&
                        <div className="upcoming-container">
                            <h5>Sorry, You don't have any appointments.</h5>
                        </div>
                    }

                </>
            )}
        </div>
    );
};

export default AppointmentStaff;

