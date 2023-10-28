import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "firebase/compat/auth";

import HubScreen from "./components/HubScreen";
import NavBar from "./components/NavBar";
import LoginScreen from "./components/LoginScreen";
import SearchScreen from "./components/SearchScreen";
import DataFetcher from "./components/DataFetcher";
import ServiceDetail from "./components/ServiceDetail";

const App = () => {
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
                setStaffData(staffData)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    if (serviceData.length === 0 || providerData.length === 0) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="App">
                <header className="app-header">
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<HubScreen />} />
                        <Route path="/login" element={<LoginScreen />} />
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
                    </Routes>
                </header>
            </div>
        );
    }
};

export default App;
