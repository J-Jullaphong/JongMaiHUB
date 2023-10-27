import React, { useEffect, useState } from "react";
import { Modal, DatePicker, Button, Form, Steps } from "rsuite";
import DataSender from "./DataSender";
import DataFetcher from "./DataFetcher";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const Reservation = ({ service, staff }) => {
    const [reservationState, setReservationState] = useState(1);
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [isDateSelected, setIsDateSelected] = useState(false);

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

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                setIsAuthenticated(true);
                setUser(authUser);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        });
    })


    const handleConfirmClick = () => {
        const formData = {
            "staff": staff.uid,
            "service": service.id,
            "customer": user.uid,
            "date_time": selectedDateTime.toISOString()
        }
        console.log(selectedDateTime);
        if (reservationState < 3) {
            setReservationState(reservationState + 1);
        } else if (reservationState === 3) {
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
                    <br/>
                    <br/>
                    <Steps current={reservationState - 1} small>
                        <Steps.Item/>
                        <Steps.Item/>
                        <Steps.Item/>
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
                    <br/>
                    <br/>
                    <Steps current={reservationState - 1} small>
                        <Steps.Item/>
                        <Steps.Item/>
                        <Steps.Item/>
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
                    <br/>
                    <br/>
                    <Steps current={reservationState - 1} small>
                        <Steps.Item/>
                        <Steps.Item/>
                        <Steps.Item/>
                    </Steps>
                </>
            );
        }
        return <Modal.Footer>{content}</Modal.Footer>;
    }

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
            const today = new Date();
            const disabledDates = [
                new Date("2023-10-28"),
                new Date("2023-11-15"),
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

        const isHourInPast = (hour) => {
            const today = new Date();
            return hour < today.getHours();
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
                            shouldDisableHour={isHourInPast}
                        />
                        <Form.HelpText>Required</Form.HelpText>
                    </Form.Group>
                </Form>
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
        )
    }

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
