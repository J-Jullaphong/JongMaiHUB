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

    useEffect(() => {
        const fetchData = async () => {
            const dataFetcher = new DataFetcher();
            try {
                const serviceData = await dataFetcher.getServiceData();
                const providerData = await dataFetcher.getServiceProviderData();
                console.log("Received JSON data:", serviceData);
                console.log("Received JSON data:", providerData);
                setServiceData(serviceData);
                setProviderData(providerData);
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
