import React, { useEffect, useState } from "react";
import { Modal, DatePicker, Button, Form, Steps } from "rsuite";
import DataSender from "./DataSender";

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


    const handleConfirmClick = () => {
        return reservationState < 3
            ? setReservationState(reservationState + 1)
            : NaN;
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
                </>
            );
        } else {
            content = (
                <>
                    <p>Please Confirm your Reservation</p>
                    <Button onClick={handleConfirmClick} appearance="primary">
                        Confirm
                    </Button>
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
                        />
                        <Form.HelpText>Required</Form.HelpText>
                    </Form.Group>
                </Form>
                <h4>
                    Selected Date: {selectedDateTime.getDate()}{" "}
                    {monthNames.at(selectedDateTime.getMonth())}{" "}
                    {selectedDateTime.getFullYear()}
                </h4>
                <h4>
                    Selected Time: {selectedDateTime.getHours() < 10
                        ? 0 + selectedDateTime.getHours().toString()
                        : selectedDateTime.getHours()}:
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
                    Selected Date: {selectedDateTime.getDate()}{" "}
                    {monthNames[selectedDateTime.getMonth()]}{" "}
                    {selectedDateTime.getFullYear()}
                </h4>
                <h4>
                    Selected Time: {selectedDateTime.getHours() < 10
                        ? 0 + selectedDateTime.getHours().toString()
                        : selectedDateTime.getHours()}:
                    {selectedDateTime.getMinutes() < 10
                        ? 0 + selectedDateTime.getMinutes().toString()
                        : selectedDateTime.getMinutes()}
                </h4>
                {createFooter()}
            </div>
        );
    };

    const display = () => {
        if (reservationState === 1) return displayStateOne();
        else if (reservationState === 2) return displayStateTwo();
        else if (reservationState === 3) return displayStateThree();
    };

    useEffect(() => {
        display();
    }, [reservationState]);

    return display();
};

}
export default Reservation;
