import React, { useEffect, useState } from "react";
import { Modal, DatePicker, Button, Form, Steps } from "rsuite";
import DataFetcher from "./DataFetcher";
import DataSender from "./DataSender";

const Reservation = ({ service, staff, user }) => {
  const defaultDateTime = new Date();

  const [reservationState, setReservationState] = useState(1);
  const [selectedDate, setSelectedDate] = useState(defaultDateTime);
  const [selectedHour, setSelectedHour] = useState(defaultDateTime);
  const [selectedMinute, setSelectedMinute] = useState(defaultDateTime);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isHourSelected, setIsHourSelected] = useState(false);
  const [isMinuteSelected, setIsMinuteSelected] = useState(false);
  const [CustomerAppointmentData, setCustomerAppointmentData] = useState([]);
  const [StaffAppointmentData, setStaffAppointmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dataFetcher = new DataFetcher();
      try {
        const [CustomerAppointmentData, StaffAppointmentData] =
          await Promise.all([
            dataFetcher.getAppointmentByCustomer(user.uid),
            dataFetcher.getAppointmentByStaff(staff.uid),
          ]);
        console.log(
          "Received Customer Appointment JSON data:",
          CustomerAppointmentData
        );
        console.log(
          "Received Staff Appointment JSON data:",
          StaffAppointmentData
        );
        setCustomerAppointmentData(CustomerAppointmentData);
        setStaffAppointmentData(StaffAppointmentData);
      } catch (error) {
        console.log(error);
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
      const selectedDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        selectedHour.getHours(),
        selectedMinute.getMinutes()
      );
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsDateSelected(!!date);
  };

  const handleHourChange = (hour) => {
    setSelectedHour(hour);
    setIsHourSelected(!!hour);
  };

  const handleMinuteChange = (minute) => {
    setSelectedMinute(minute);
    setIsMinuteSelected(!!minute);
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
            disabled={!isDateSelected || !isHourSelected || !isMinuteSelected}
          >
            Continue
          </Button>
          <br />
          <br />
          <Steps current={reservationState - 1} small>
            <Steps.Item />
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
            <Steps.Item />
          </Steps>
        </>
      );
    } else if (reservationState === 4) {
      content = (
        <>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Steps current={reservationState - 1} small>
            <Steps.Item />
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
    const unavailableDate = (date) => {
      if (!date) return false;
      const today = new Date();
      const disabledDates = [today];
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

    const allAppointmentsByDate = [
      ...CustomerAppointmentData,
      ...StaffAppointmentData,
    ].filter((appointment) => {
      return (
        new Date(appointment.date_time).getDate() === selectedDate.getDate()
      );
    });

    const bookedMinutes = allAppointmentsByDate.map((appointment) => {
      const startTime = new Date(appointment.date_time);
      const endTime = new Date(appointment.date_time);
      endTime.setMinutes(startTime.getMinutes() + service.duration);
      return {
        start: startTime.getHours() * 60 + startTime.getMinutes(),
        end: endTime.getHours() * 60 + endTime.getMinutes(),
      };
    });

    const unavailableHours = (hour) => {
      const openTime = parseInt(staff.start_work_time.split(":")[0]);
      const closeTime = parseInt(staff.get_off_work_time.split(":")[0]);
      return hour < openTime || hour > closeTime;
    };

    const unavailableMinutes = (minute) => {
      return bookedMinutes.some((range) => {
        return (
          selectedHour.getHours() * 60 + minute + service.duration >=
            range.start && selectedHour.getHours() * 60 + minute <= range.end
        );
      });
    };

    return (
      <div>
        <Form layout="horizontal">
          <Form.Group controlId="date-time">
            <Form.ControlLabel>Date</Form.ControlLabel>
            <DatePicker
              name="date"
              format="dd-MM-yyyy"
              placement="bottomStart"
              onChange={handleDateChange}
              value={selectedDate}
              cleanable={false}
              limitEndYear={1}
              shouldDisableDate={unavailableDate}
            />
            <Form.HelpText>Required</Form.HelpText>
            <br />
            <Form.ControlLabel>Time</Form.ControlLabel>
            {isDateSelected ? (
              <DatePicker
                name="hour-time"
                format="HH"
                placement="bottomStart"
                onChange={handleHourChange}
                value={selectedHour}
                cleanable={false}
                shouldDisableHour={unavailableHours}
              />
            ) : (
              <DatePicker name="hour-time" format="HH" disabled />
            )}
            {isHourSelected ? (
              <DatePicker
                name="minute-time"
                format="mm"
                placement="bottomStart"
                onChange={handleMinuteChange}
                value={selectedMinute}
                cleanable={false}
                shouldDisableMinute={unavailableMinutes}
              />
            ) : (
              <DatePicker name="minute-time" format="mm" disabled />
            )}
            <Form.HelpText>Required</Form.HelpText>
          </Form.Group>
        </Form>
        {selectedDate && selectedHour && selectedMinute ? (
          <div>
            <h4>
              Selected Date: {days[selectedDate.getDay()]}{" "}
              {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}{" "}
              {selectedDate.getFullYear()}
            </h4>
            <h4>
              Selected Time:{" "}
              {selectedHour.getHours() < 10
                ? "0" + selectedHour.getHours()
                : selectedHour.getHours()}
              :
              {selectedMinute.getMinutes() < 10
                ? "0" + selectedMinute.getMinutes()
                : selectedMinute.getMinutes()}
            </h4>
          </div>
        ) : (
          <h4>Please Select Date and Time</h4>
        )}
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
          Selected Date: {days[selectedDate.getDay()]} {selectedDate.getDate()}{" "}
          {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </h4>
        <h4>
          Selected Time:{" "}
          {selectedHour.getHours() < 10
            ? 0 + selectedHour.getHours().toString()
            : selectedHour.getHours()}
          :
          {selectedMinute.getMinutes() < 10
            ? 0 + selectedMinute.getMinutes().toString()
            : selectedMinute.getMinutes()}
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
        {createFooter()}
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
