import React, { useState, useEffect } from 'react';
import { Input, Button, Panel, Calendar } from 'rsuite';
import DataSender from './DataSender';
import { useParams } from 'react-router-dom';
import DataFetcher from './DataFetcher';

const StaffManagement = ({ appointmentData }) => {
    const [staff, setStaff] = useState(null);
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [background, setBackground] = useState('');
    const [startWorkTime, setStartWorkTime] = useState('');
    const [getOffWorkTime, setGetOffWorkTime] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [staffData, setStaffData] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const dataFetcher = new DataFetcher();
    const dataSender = new DataSender();
    const { staffUid } = useParams();

    useEffect(() => {
    if (staff === null) {
        try {
            const fetchStaffData = async () => {
                const staffData = await dataFetcher.getStaffData(staffUid);
                const customerData = await dataFetcher.getAppointmentByStaff(staffUid);
                setStaffData(staffData);
                setCustomerData(customerData);
                if (staffData) {
                    setStaff(staffData);
                    setName(staffData.name);
                    setSpecialty(staffData.specialty);
                    setBackground(staffData.background);
                    setStartWorkTime(staffData.start_work_time);
                    setGetOffWorkTime(staffData.get_off_work_time);
                    setProfilePicture(staffData.profile_picture);
                }
            };
            fetchStaffData();
        } catch (error) {
            console.error(error);
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
        const updatedStaffData = {
            name,
            specialty,
            background,
            startWorkTime,
            getOffWorkTime,
            profilePicture,
        };

        dataSender.updateStaffData(updatedStaffData, staff.uid).then(() => {
            console.log('Staff information updated.');
        });
    };
    
    const getCustomerNameById = (customerId) => {
        const customer = customerData.find((customer) => customer.uid === customerId);
        console.log(customer);
        return customer ? customer.name : 'Unknown';
    };

    return (
        <div>
            <Panel header={`Staff Management: ${staff ? staff.name : ''}`}>
                <h3>Staff Information:</h3>
                <Input
                    placeholder="Name"
                    value={name}
                    onChange={(value) => setName(value)}
                />
                <Input
                    placeholder="Specialty"
                    value={specialty}
                    onChange={(value) => setSpecialty(value)}
                />
                <Input
                    placeholder="Background"
                    value={background}
                    onChange={(value) => setBackground(value)}
                />
                <Input
                    placeholder="Start Work Time"
                    value={startWorkTime}
                    onChange={(value) => setStartWorkTime(value)}
                />
                <Input
                    placeholder="Get Off Work Time"
                    value={getOffWorkTime}
                    onChange={(value) => setGetOffWorkTime(value)}
                />
                <Button appearance="primary" onClick={updateStaffInfo}>
                    Update Staff Information
                </Button>
                <hr />
                <h3>Booked Times for {selectedDate.toDateString()}:</h3>
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
                                <div>
                                    {appointmentsOnDate.map((appointment, index) => {
                                        const appointmentTime = new Date(appointment.date_time);
                                        const nameCustomer = getCustomerNameById(appointment.customer);
                                        const timeString = appointmentTime.toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        });
                                        return (
                                            <div key={index}>
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
            </Panel>
        </div>
    );
};

export default StaffManagement;
