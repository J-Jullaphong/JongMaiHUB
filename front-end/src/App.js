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
import MyAppointmentScreen from "./components/MyAppointmentScreen";

const App = () => {
  const user = User.getInstance();
  const [userAuthenticated, setUserAuthenticated] = useState(
    user.getName() !== null
  );
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState([]);
  const [providerData, setProviderData] = useState([]);
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dataFetcher = new DataFetcher();
      try {
        const [serviceData, providerData, staffData] = await Promise.all([
          dataFetcher.getServiceData(),
          dataFetcher.getServiceProviderData(),
          dataFetcher.getStaffData(),
        ]);
        console.log("Received Service JSON data:", serviceData);
        console.log("Received Provider JSON data:", providerData);
        console.log("Received Staff JSON data:", staffData);
        setServiceData(serviceData);
        setProviderData(providerData);
        setStaffData(staffData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    navigate("/login")
  }, []);

  const handleAuthenticationChange = (authenticated) => {
    setUserAuthenticated(authenticated);
  };

  return (
    <div className="App">
      <header className="app-header">
        <NavBar user={user} isUserAuthenticated={userAuthenticated} serviceData={serviceData}/>
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
        </Routes>
      </header>
    </div>
  );
};

export default App;
