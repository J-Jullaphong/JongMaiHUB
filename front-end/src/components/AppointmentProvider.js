import React from "react";
import Appointment from "./Appointment";

const AppointmentProvider = ({
  user,
  serviceData,
  staffData,
  customerData,
}) => {
  return (
    <Appointment
      user={user}
      serviceData={serviceData}
      customerData={customerData}
      staffData={staffData}
      isProvider={true}
    />
  );
};

export default AppointmentProvider;
