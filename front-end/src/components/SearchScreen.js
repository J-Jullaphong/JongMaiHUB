import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Filter from "./Filter";
import DataFetcher from "./DataFetcher";
import "./styles/SearchScreen.css";

const SearchScreen = () => {
    const [searchQuery] = useSearchParams();
    const [serviceData, setServiceData] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
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

    useEffect(() => {
        const filterData = () => {
            const filteredData = serviceData.filter((service) => {
                return service.name
                    .toLowerCase()
                    .includes(searchQuery.get("name").toLowerCase());
            });
            setSearchResult(filteredData);
        };
        filterData();
    }, [searchQuery, serviceData]);

    const displayServices = searchResult.map((service) => {
        return (
            <div className="service" key={service.id}>
                <img src={service.service_picture} alt={service.name} />
                <div className="service-detail">
                <h2>{service.name}</h2>
                <br />
                <p>
                    {service.type} | {service.duration} Minutes |{" "}
                    {service.price} Baht
                </p>
                </div>
            </div>
        );
    });

    return (
        <div style={{ display: "flex" }}>
            <div className="filter-box">
                <Filter />
            </div>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : searchResult.length === 0 ? (
                    <h1>No Matching Results for {searchQuery.get("name")}</h1>
                ) : (
                    displayServices
                )}
            </div>
        </div>
    );
};

export default SearchScreen;
