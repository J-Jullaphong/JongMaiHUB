import React, { useEffect, useState } from "react";
import { Modal, DatePicker, Button, Form, Steps } from "rsuite";
import DataFetcher from "./DataFetcher";
import DataSender from "./DataSender";

const Reservation = ({ service, staff, provider, user }) => {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 1);

    const [reservationState, setReservationState] = useState(1);
    const [selectedDateTime, setSelectedDateTime] = useState(defaultDate);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [CustomerAppointmentData, setCustomerAppointmentData] = useState([]);
    const [StaffAppointmentData, setStaffAppointmentData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const dataFetcher = new DataFetcher();
            try {
                const [CustomerAppointmentData, StaffAppointmentData] = await Promise.all([
                    dataFetcher.getAppointmentByCustomer(),
                    dataFetcher.getAppointmentByStaff(),
                ]);
                console.log("Received Customer Appointment JSON data:", CustomerAppointmentData);
                console.log("Received Staff Appointment JSON data:", StaffAppointmentData);
                setCustomerAppointmentData(CustomerAppointmentData);
                setStaffAppointmentData(StaffAppointmentData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


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

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const dataSender = new DataSender();

    const handleConfirmClick = () => {
        if (reservationState < 3) {
            setReservationState(reservationState + 1);
        } else if (reservationState === 3) {
            const formData = {
                staff: staff.uid,
                service: service.id,
                customer: user.uid,
                date_time: selectedDateTime.toISOString(),
            };
            dataSender.submitAppointmentData(formData);
            setReservationState(reservationState + 1);
        }
    };

    const handleDateChange = (dateTime) => {
        setSelectedDateTime(dateTime);
        setIsDateSelected(!!dateTime);
    };

    const createFooter = () => {
        let content;

        if (reservationState === 1) {
            content = (
                <>
                    <Button onClick={handleConfirmClick} appearance="primary">
                        Continue
                    </Button>
                    <br />
                    <br />
                    <Steps current={reservationState - 1} small>
                        <Steps.Item />
                        <Steps.Item />
                        <Steps.Item />
                    </Steps>
                </>
            );
        } else if (reservationState === 2) {
            content = (
                <>
                    <Button
                        onClick={handleConfirmClick}
                        appearance="primary"
                        disabled={!isDateSelected}
                    >
                        Continue
                    </Button>
                    <br />
                    <br />
                    <Steps current={reservationState - 1} small>
                        <Steps.Item />
                        <Steps.Item />
                        <Steps.Item />
                    </Steps>
                </>
            );
        } else if (reservationState === 3) {
            content = (
                <>
                    <p>Please Confirm your Reservation</p>
                    <Button onClick={handleConfirmClick} appearance="primary">
                        Confirm
                    </Button>
                    <br />
                    <br />
                    <Steps current={reservationState - 1} small>
                        <Steps.Item />
                        <Steps.Item />
                        <Steps.Item />
                    </Steps>
                </>
            );
        }
        return <Modal.Footer>{content}</Modal.Footer>;
    };

    const displayStateOne = () => {
        return (
            <div>
                <h3>{staff.name}</h3>
                <h4>Specialty: {staff.specialty}</h4>
                <h4>Background: {staff.background}</h4>
                {createFooter()}
            </div>
        );
    };

    const displayStateTwo = () => {
        const isDateInPast = (date) => {
            if (!date) return false;
            const today = new Date();
            const disabledDates = [
                today
            ];
            return (
                date.getTime() < today.getTime() ||
                disabledDates.some(
                    (disabled) =>
                        date.getDate() === disabled.getDate() &&
                        date.getMonth() === disabled.getMonth() &&
                        date.getFullYear() === disabled.getFullYear()
                )
            );
        };

        const isHourClosed = (hour) => {
            const today = new Date();
            const openTime = parseInt(provider.opening_time.split(":")[0]);
            const closeTime = parseInt(provider.closing_time.split(":")[0]);
            return hour < openTime || hour > closeTime;
        }


        return (
            <div>
                <Form layout="horizontal">
                    <Form.Group controlId="date-time">
                        <Form.ControlLabel>Date & Time</Form.ControlLabel>
                        <DatePicker
                            name="date-time"
                            format="dd-MM-yyyy HH:mm"
                            placement="bottomStart"
                            onChange={handleDateChange}
                            value={selectedDateTime}
                            cleanable={false}
                            limitEndYear={1}
                            shouldDisableDate={isDateInPast}
                            shouldDisableHour={isHourClosed}
                        />
                        <Form.HelpText>Required</Form.HelpText>
                    </Form.Group>
                </Form>
                {selectedDateTime ? (
                    <div>
                        <h4>
                            Selected Date: {days[selectedDateTime.getDay()]}{' '}
                            {selectedDateTime.getDate()}{' '}
                            {monthNames[selectedDateTime.getMonth()]}{' '}
                            {selectedDateTime.getFullYear()}
                        </h4>
                        <h4>
                            Selected Time:{' '}
                            {selectedDateTime.getHours() < 10
                                ? '0' + selectedDateTime.getHours()
                                : selectedDateTime.getHours()}
                            :
                            {selectedDateTime.getMinutes() < 10
                                ? '0' + selectedDateTime.getMinutes()
                                : selectedDateTime.getMinutes()}
                        </h4>
                    </div>
                ) : (
                    <h4>Please Select Date and Time</h4>
                )}
                {createFooter()}
            </div>
        );
    }

    const displayStateThree = () => {
        return (
            <div>
                <h3>{service.name}</h3>
                <h4>Selected Staff: {staff.name}</h4>
                <h4>
                    Selected Date: {days[selectedDateTime.getDay()]}{" "}
                    {selectedDateTime.getDate()}{" "}
                    {monthNames[selectedDateTime.getMonth()]}{" "}
                    {selectedDateTime.getFullYear()}
                </h4>
                <h4>
                    Selected Time:{" "}
                    {selectedDateTime.getHours() < 10
                        ? 0 + selectedDateTime.getHours().toString()
                        : selectedDateTime.getHours()}
                    :
                    {selectedDateTime.getMinutes() < 10
                        ? 0 + selectedDateTime.getMinutes().toString()
                        : selectedDateTime.getMinutes()}
                </h4>
                {createFooter()}
            </div>
        );
    };

    const displayStateFour = () => {
        return (
            <div>
                <h3>Your Reservation is recorded.</h3>
                <h4>You may close this window.</h4>
            </div>
        );
    };

    const display = () => {
        if (reservationState === 1) return displayStateOne();
        else if (reservationState === 2) return displayStateTwo();
        else if (reservationState === 3) return displayStateThree();
        else if (reservationState === 4) return displayStateFour();
    };

    useEffect(() => {
        display();
    }, [reservationState]);

    return display();
};

export default Reservation;
