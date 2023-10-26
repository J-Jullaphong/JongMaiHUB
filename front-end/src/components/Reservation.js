import React, { useEffect, useState } from "react";
import { Modal, DatePicker, Button, Form, Steps } from "rsuite";
import DataSender from "./DataSender";

const Reservation = ({ service, staff }) => {
    const [reservationState, setReservationState] = useState(1);
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [isDateSelected, setIsDateSelected] = useState(false);


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

}
export default Reservation;
