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

const App = () => {
    const user = User.getInstance();
    const [userAuthenticated, setUserAuthenticated] = useState(user.getName() !== null);
    const [serviceData, setServiceData] = useState([]);
    const [providerData, setProviderData] = useState([]);
    const [staffData, setStaffData] = useState([]);
    const [customerData, setCustomerData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const dataFetcher = new DataFetcher();
            try {
                const [serviceData, providerData, staffData, customerData] = await Promise.all([
                    dataFetcher.getServiceData(),
                    dataFetcher.getServiceProviderData(),
                    dataFetcher.getStaffData(),
                    dataFetcher.getCustomerData()
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
    }, []);

    const handleAuthenticationChange = (authenticated) => {
        setUserAuthenticated(authenticated);
    };

    return (
        <div className="App">
            <header className="app-header">
                <NavBar user={user} isUserAuthenticated={userAuthenticated} serviceData={serviceData} />
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
                                serviceData={serviceData}
                                providerData={providerData}
                                staffData={staffData}
                            />
                        }
                    />
                    <Route 
                        path="/provider-management" 
                        element={
                            <ProviderManagement 
                                user={user} 
                            />
                        } 
                    />
                    <Route 
                        path="/staff-management/:staffUid" 
                        element={
                            <StaffManagement 
                                user={user} 
                                staffData={staffData} 
                                customerData={customerData} 
                            />
                        } 
                    />
                    <Route 
                        path="/service-management/:serviceId" 
                        element={
                            <ServiceManagement 
                                user={user} 
                                serviceData={serviceData} 
                            />
                        } 
                    />
                    <Route 
                        path="/add-staff/:providerId/" 
                        element={<CreateNewStaff/> } 
                    />
                    <Route 
                        path="/add-service/:providerId/" 
                        element={<CreateNewService/>} 
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