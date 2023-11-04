import React, { useEffect, useState } from "react";
import { Table } from "rsuite";
import DataFetcher from "./DataFetcher";
import DataSender from "./DataSender";
import { useNavigate } from 'react-router-dom';
import "./styles/MyAppointmentScreen.css"

const MyAppointmentScreen = ({ user, serviceData, providerData, staffData }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const dataSender = new DataSender();
    const navigate = useNavigate();

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
        dataSender.deleteAppointment(appointmentId);
        navigate(`/my-appointment`);
    };

    const handleRateAppointment = (appointmentID) => {
        
    }


    const formatDateTime = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day} ${month} ${year} ${hours}:${minutes}`;
    };

    const currentDate = new Date();

    const pastAppointments = appointments.filter(appointment => new Date(appointment.date_time) < currentDate);
    const upcomingAppointments = appointments.filter(appointment => new Date(appointment.date_time) >= currentDate);

    return (
        <div className="appointments-container">
            <h1 className="appointment-title">My Appointments</h1>
            <br />
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <>
                    {upcomingAppointments.length > 0 &&
                        <div className="upcoming-container">
                            <h2>Upcoming Appointments</h2>
                            <Table
                                data={upcomingAppointments}
                                autoHeight
                                width={1000}
                                style={{ marginTop: '20px' }}
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
                                    <Table.HeaderCell>Staff</Table.HeaderCell>
                                    <Table.Cell>
                                        {rowData => {
                                            const staff = staffData.find(staff => staff.uid === rowData.staff);
                                            return staff ? staff.name : '';
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
                                align="center">
                                    <Table.HeaderCell>Cancel</Table.HeaderCell>
                                    <Table.Cell>
                                        {rowData => (
                                            <button onClick={() => handleCancelAppointment(rowData.id)}>
                                                Cancel
                                            </button>
                                        )}
                                    </Table.Cell>
                                </Table.Column>
                            </Table>
                        </div>
                    }

                    {pastAppointments.length > 0 &&
                        <div className="past-container">
                            <h2>Past Appointments</h2>
                            <Table
                                data={pastAppointments}
                                autoHeight
                                width={1000}
                                style={{ marginTop: '20px' }}
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
                                    <Table.HeaderCell>Staff</Table.HeaderCell>
                                    <Table.Cell>
                                        {rowData => {
                                            const staff = staffData.find(staff => staff.uid === rowData.staff);
                                            return staff ? staff.name : '';
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
                                align="center">
                                    <Table.HeaderCell>Rate</Table.HeaderCell>
                                    <Table.Cell>
                                        {rowData => (
                                            <button onClick={() => handleRateAppointment(rowData.id)}>
                                                Rate
                                            </button>
                                        )}
                                    </Table.Cell>
                                </Table.Column>
                            </Table>
                        </div>
                    }

                    {pastAppointments.length === 0 && upcomingAppointments.length === 0 &&
                        <h2>Sorry, You don't have any appointments.</h2>
                    }

                </>
            )}
        </div>
    );
};

export default MyAppointmentScreen;
