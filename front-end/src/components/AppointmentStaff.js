import React from "react";
import Appointment from "./Appointment";

const AppointmentStaff = ({ user, serviceData, customerData }) => {
  return (
    <Appointment
      user={user}
      serviceData={serviceData}
      customerData={customerData}
      isProvider={false}
    />
  );
};

export default AppointmentStaff;
