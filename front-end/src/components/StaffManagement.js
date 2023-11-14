import React, { useState, useEffect } from 'react';
import { Input, Button, Panel, Calendar, InputPicker } from 'rsuite';
import { useParams } from 'react-router-dom';
import "./styles/InputButton.css";
import DataSender from './DataSender';
import DataFetcher from './DataFetcher';

const StaffManagement = ({ customerData }) => {
    const [loading, setLoading] = useState(true);
    const [staff, setStaff] = useState(null);
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [background, setBackground] = useState('');
    const [startWorkTime, setStartWorkTime] = useState('');
    const [getOffWorkTime, setGetOffWorkTime] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [service, setService] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [staffData, setStaffData] = useState('');
    const [serviceData, setServiceData] = useState('');
    const [appointmentData, setAppointmentData] = useState('');
    const dataFetcher = new DataFetcher();
    const dataSender = new DataSender();
    const { staffUid, providerId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (staff === null) {
            try {
                const fetchStaffData = async () => {
                    const staffData = await dataFetcher.getStaffData(staffUid);
                    const appointmentData = await dataFetcher.getAppointmentByStaff(staffUid);
                    const serviceData = await dataFetcher.getServiceByServiceProvider(providerId);
                    const transformedServiceData = serviceData.map(item => ({ label: item.name, value: item.id }));
                    setStaffData(staffData);
                    setAppointmentData(appointmentData);
                    setServiceData(transformedServiceData);
                    if (staffData) {
                        setStaff(staffData);
                        setName(staffData.name);
                        setSpecialty(staffData.specialty);
                        setBackground(staffData.background);
                        setStartWorkTime(staffData.start_work_time);
                        setGetOffWorkTime(staffData.get_off_work_time);
                        setProfilePicture(staffData.profile_picture);
                        setService(staffData.service)
                    }
                    setLoading(false);
                };
                fetchStaffData();
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
    }, [staffData, staffUid]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const showAppointmentByDate = () => {
        const dateString = selectedDate.toDateString();
        const appointmentsOnDate = appointmentData.filter(
            (appointment) =>
                appointment.staff === staffUid &&
                new Date(appointment.date_time).toDateString() === dateString
        );

        if (appointmentsOnDate.length > 0) {
            const appointmentDetails = appointmentsOnDate.map((appointment, index) => {
                const appointmentTime = new Date(appointment.date_time);
                const nameCustomer = getCustomerNameById(appointment.customer);
                const timeString = appointmentTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                });
                return `${timeString} - ${nameCustomer}`;
            });

            alert(`Appointments on ${dateString}:\n${appointmentDetails.join('\n')}`);
        } else {
            alert(`No appointments on ${dateString}`);
        }
    };

    const updateStaffInfo = () => {
        if (!name || !specialty || !background || !startWorkTime || !getOffWorkTime || !profilePicture || !service) {
            window.alert('Please fill in all input fields.');
            return;
        }

        const shouldUpdate = window.confirm('Are you sure you want to update staff information?');

        if (shouldUpdate) {
            const updatedStaffData = {
                name: name,
                specialty: specialty,
                background: background,
                start_work_time: startWorkTime,
                get_off_work_time: getOffWorkTime,
                profile_picture: profilePicture,
                service: service,
            };

            window.alert('Successfully updated staff.');
            dataSender.updateStaffData(updatedStaffData, staff.uid).then(() => {
                console.log('Staff information updated.');
            });
        }
    };

    const uploadImage = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const base64Image = await dataSender.convertImageToBase64(file);
                setProfilePicture(base64Image);
            } catch (error) {
                console.error("Error converting image to base64:", error);
            }
        }
    };

    const getCustomerNameById = (customerId) => {
        const customer = customerData.find((customer) => customer.uid === customerId);
        console.log(customer);
        return customer ? customer.name : 'Unknown';
    };


    const handleSearch = () => {
        const filteredCustomers = customerData.filter((customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const customersWithAppointments = filteredCustomers.filter((customer) =>
            appointmentData.some((appointment) => appointment.customer === customer.uid)
        );

        setSearchResults(customersWithAppointments);
    };

    const displayCustomerInfo = (customer) => {
        alert(`Customer Name: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}`);
    };

    return (
        <div className="provider-management">
            <h2 className="provider-title">Staff Information: {staff ? staff.name : ''}</h2>
            {loading ? (
                <h2 className="provider-loading">Loading...</h2>
            ) : (
                <Panel
                    className="provider-information"
                >
                    <div
                        className="provider-content-container">
                        <div className="provider-picture-container">
                            <h5>Profile picture</h5>
                            <img
                                src={profilePicture}
                                alt="Profile Picture"
                                className="provider-custom-picture"
                            />
                            <br />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={uploadImage}
                            />
                        </div>
                        <div
                            className="provider-input-container">
                            <div
                                className="provider-input-field">
                                <h5>Name</h5>
                                <Input
                                    className="provider-custom-input"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(value) => setName(value)}
                                />
                            </div>
                            <div
                                className="provider-input-field">
                                <h5>Service</h5>
                                <InputPicker
                                    className="provider-custom-input"
                                    data={serviceData}
                                    value={service}
                                    onChange={(value) => setService(value)}
                                />
                            </div>
                            <div
                                className="provider-input-field">
                                <h5>Specialty</h5>
                                <Input
                                    className="provider-custom-input"
                                    placeholder="Specialty"
                                    value={specialty}
                                    onChange={(value) => setSpecialty(value)}
                                />
                            </div>
                            <div
                                className="provider-input-field">
                                <h5>Background</h5>
                                <Input
                                    className="provider-custom-input"
                                    placeholder="Background"
                                    value={background}
                                    onChange={(value) => setBackground(value)}
                                />
                            </div>
                            <div
                                className="provider-input-field">
                                <h5>Start work time</h5>
                                <Input
                                    className="provider-custom-input"
                                    type="time"
                                    placeholder="Start work time"
                                    value={startWorkTime}
                                    onChange={(value) => setStartWorkTime(value)}
                                />
                            </div>
                            <div
                                className="provider-input-field">
                                <h5>Get off work time</h5>
                                <Input
                                    className="provider-custom-input"
                                    type="time"
                                    placeholder="Get off work time"
                                    value={getOffWorkTime}
                                    onChange={(value) => setGetOffWorkTime(value)}
                                />
                            </div>
                        </div>
                    </div>
                    <br />
                    <Button appearance="primary" onClick={updateStaffInfo}
                        className="provider-add-button">
                        Update Staff Information
                    </Button>
                    <hr />
                    <h3>Booked times</h3>
                    <Calendar
                        value={selectedDate}
                        onChange={handleDateChange}
                        onSelect={showAppointmentByDate}
                        renderCell={(date) => {
                            const dateString = date.toDateString();
                            const appointmentsOnDate = appointmentData.filter(
                                (appointment) =>
                                    appointment.staff === staffUid &&
                                    new Date(appointment.date_time).toDateString() === dateString
                            );
                            if (appointmentsOnDate.length > 0) {
                                return (
                                    <div style={{ position: 'relative', padding: '5px', background: '#e6e6e6', borderRadius: '5px' }}>
                                        {appointmentsOnDate.map((appointment, index) => {
                                            const appointmentTime = new Date(appointment.date_time);
                                            const nameCustomer = getCustomerNameById(appointment.customer);
                                            const timeString = appointmentTime.toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            });
                                            return (
                                                <div key={index} style={{ margin: '5px 0', color: '#333' }}>
                                                    {timeString} - {nameCustomer}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        }}
                    />
                    <div className="search-container">
                        <h3>Search Customer</h3>
                        <Input
                            placeholder="Enter customer name"
                            value={searchTerm}
                            onChange={(value) => setSearchTerm(value)}
                        />
                        <br />
                        <Button onClick={handleSearch} appearance="primary">
                            Search
                        </Button>
                        {searchResults.length > 0 && (
                            <div>
                                <h4>Matching Customers</h4>
                                <ul>
                                    {searchResults.map((customer) => (
                                        <p key={customer.uid} onClick={() => displayCustomerInfo(customer)}>
                                            {customer.name}
                                        </p>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </Panel>
            )}
        </div>
    );
};

export default StaffManagement;

