import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "firebase/compat/auth";

import HubScreen from "./components/HubScreen";
import NavBar from "./components/NavBar";
import LoginScreen from "./components/LoginScreen";
import SearchScreen from "./components/SearchScreen";
import DataFetcher from "./components/DataFetcher";

const App = () => {
    const [serviceData, setServiceData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const dataFetcher = new DataFetcher();
            try {
                const serviceData = await dataFetcher.getServiceData();
                console.log("Received JSON data:", serviceData);
                setServiceData(serviceData);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="App">
            <header className="app-header">
                <NavBar />
                <Routes>
                    <Route path="/" element={<HubScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route
                        path="/search"
                        element={<SearchScreen serviceData={serviceData} loading={loading} />}
                    />
                </Routes>
            </header>
        </div>
    );
};

export default App;
