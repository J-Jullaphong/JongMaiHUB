import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "firebase/compat/auth";

import Authenticator from "./components/Authenticator";
import HubScreen from "./components/HubScreen";
import NavBar from "./components/NavBar";
import SearchScreen from "./components/SearchScreen";
import DataFetcher from "./components/DataFetcher";
import ServiceDetail from "./components/ServiceDetail";
import User from "./components/User";
import ProviderManagement from "./components/ProviderManagement";
import StaffManagement from "./components/StaffManagement";
import ServiceManagement from "./components/ServiceManagement";
import CreateNewService from "./components/CreateNewService";
import CreateNewStaff from "./components/CreateNewStaff";
import MyAppointmentScreen from "./components/MyAppointmentScreen";
import CustomerManagement from "./components/CustomerManagement";
import AppointmentStaff from "./components/AppointmentStaff";
import AppointmentProvider from "./components/AppointmentProvider";
import AboutUsScreen from "./components/AboutUsScreen";
import CreateProviderScreen from "./components/CreateProviderScreen";

const App = () => {
  const user = User.getInstance();
  const [userAuthenticated, setUserAuthenticated] = useState(
    user.getName() !== null
  );
  const [serviceData, setServiceData] = useState([]);
  const [providerData, setProviderData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const dataFetcher = new DataFetcher();
      try {
        const [serviceData, providerData, staffData, customerData] =
          await Promise.all([
            dataFetcher.getServiceData(),
            dataFetcher.getServiceProviderData(),
            dataFetcher.getStaffData(),
            dataFetcher.getCustomerData(),
          ]);
        setServiceData(serviceData);
        setProviderData(providerData);
        setStaffData(staffData);
        setCustomerData(customerData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    navigate("/login");
  }, []);

  const handleAuthenticationChange = (authenticated) => {
    setUserAuthenticated(authenticated);
  };

  return (
    <div className="App">
      <header className="app-header">
        <NavBar
          user={user}
          isUserAuthenticated={userAuthenticated}
          serviceData={serviceData}
        />
        <Routes>
          <Route path="/" element={<HubScreen />} />
          <Route
            path="/login"
            element={
              <Authenticator
                user={user}
                onAuthenticationChange={handleAuthenticationChange}
              />
            }
          />
          <Route
            path="/search"
            element={
              <SearchScreen
                serviceData={serviceData}
                providerData={providerData}
              />
            }
          />
          <Route
            path="/:providerUrl/:serviceUrl/"
            element={
              <ServiceDetail
                user={user}
                isUserAuthenticated={userAuthenticated}
                serviceData={serviceData}
                providerData={providerData}
                staffData={staffData}
              />
            }
          />
          <Route
            path="/my-profile"
            element={<CustomerManagement user={user} />}
          />
          <Route
            path="/provider-management"
            element={<ProviderManagement user={user} />}
          />
          <Route
            path="/staff-management/:providerId/:staffUid/"
            element={<StaffManagement />}
          />
          <Route
            path="/service-management/:providerId/:serviceId/"
            element={
              <ServiceManagement user={user} serviceData={serviceData} />
            }
          />
          <Route
            path="/add-staff/:providerId/"
            element={<CreateNewStaff customerData={customerData} />}
          />
          <Route
            path="/add-service/:providerId/"
            element={<CreateNewService />}
          />
          <Route
            path="/my-appointment"
            element={
              <MyAppointmentScreen
                user={user}
                serviceData={serviceData}
                providerData={providerData}
                staffData={staffData}
              />
            }
          />
          <Route
            path="/appointment-staff/:staffUid/"
            element={
              <AppointmentStaff
                user={user}
                serviceData={serviceData}
                customerData={customerData}
              />
            }
          />
          <Route
            path="/appointment-provider/:providerUid/"
            element={
              <AppointmentProvider
                user={user}
                serviceData={serviceData}
                customerData={customerData}
                staffData={staffData}
              />
            }
          />
          <Route
            path="/about-us"
            element={
              <AboutUsScreen             
              />
            }
          />
          <Route
            path="/create-provider"
            element={
              <CreateProviderScreen             
              />
            }
          />
        </Routes>
      </header>
    </div>
  );
};

export default App;
