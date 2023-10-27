import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Filter from "./Filter";
import "./styles/SearchScreen.css";
import { Avatar, Button } from "rsuite";
import { useNavigate } from "react-router-dom";

const SearchScreen = ({ serviceData, providerData }) => {
    const [searchQuery] = useSearchParams();
    const [searchResult, setSearchResult] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const navigate = useNavigate();

    const providerLists = providerData.reduce((acc, provider) => {
        acc[provider.uid] = [provider.name, provider.profile_picture];
        return acc;
    }, {});

    const filteredNameData = searchQuery.has("name")
        ? serviceData.filter(
            (service) =>
                service.name
                    .toLowerCase()
                    .includes(searchQuery.get("name").toLowerCase()) ||
                providerLists[service.service_provider][0]
                    .toLowerCase()
                    .includes(searchQuery.get("name").toLowerCase())
        )
        : serviceData;
    
    useEffect(() => {
        const filterData = () => {
            const filteredData = serviceData.filter((service) => {
                const isNameMatch = searchQuery.has("name")
                    ? service.name
                        .toLowerCase()
                        .includes(searchQuery.get("name").toLowerCase()) ||
                    providerLists[service.service_provider][0]
                        .toLowerCase()
                        .includes(searchQuery.get("name").toLowerCase())
                    : true;
                const isTypeMatch = searchQuery.has("type")
                    ? service.type.includes(searchQuery.get("type"))
                    : true;
                const isMaxPrice = searchQuery.has("maxPrice")
                    ? service.price <= parseFloat(searchQuery.get("maxPrice"))
                    : true;
                const isMaxDuration = searchQuery.has("maxDuration")
                    ? service.duration <= searchQuery.get("maxDuration")
                    : true;
                return (
                    isNameMatch && isTypeMatch && isMaxPrice && isMaxDuration
                );
            });
            setSearchResult(filteredData);
            setPageNumber(1);
        };
        filterData();
    }, [searchQuery, serviceData]);

    const handleDetailClick = (service) => {
        const providerUrl =
            service.service_provider +
            "-" +
            providerLists[service.service_provider][0]
                .toLowerCase()
                .replaceAll(" ", "-");
        const serviceUrl =
            service.id + "-" + service.name.toLowerCase().replaceAll(" ", "-");
        navigate(`/${providerUrl}/${serviceUrl}/`);
    };

    const displayServices = searchResult
        .slice(0, pageNumber * 5)
        .map((service) => (
            <div className="service" key={service.id}>
                <img src={service.service_picture} alt={service.name} />
                <div className="service-detail">
                    <div style={{ display: "flex", alignItems: "center" }}>
                    </div>
                    <div>
                        <h3>
                            <Avatar
                                circle
                                title={providerLists[service.service_provider][0]}
                                src={providerLists[service.service_provider][1]}
                                style={{ paddingLeft: "20px", marginRight: "1vw" }}
                                size="md"
                            />
                            {providerLists[service.service_provider][0]}
                        </h3>
                        <h5>
                            {service.name}
                        </h5>
                    </div>
                    <p>
                        {service.type} | {service.duration} Minutes |{" "}
                        {service.price} Baht
                    </p>
                    <Button
                        className="details-button"
                        onClick={() => handleDetailClick(service)}
                    >
                        Details
                    </Button>
                </div>
            </div>
        ));
    
    const handleLoadMoreClick = () => {
        setPageNumber(pageNumber + 1);
    };

    return (
        <div style={{ display: "flex" }}>
            <div className="filter-box">
                <Filter
                    serviceData={filteredNameData}
                    searchQuery={searchQuery}
                />
            </div>
            <div>
                {searchResult.length === 0 ? (
                    <h1>No Matching Results for {searchQuery.get("name")}</h1>
                ) : (
                    <div>
                        {displayServices}
                        <div className="load-more">
                            {searchResult.length > pageNumber * 5 && (
                                <Button
                                    appearance="ghost"
                                    onClick={handleLoadMoreClick}
                                >
                                    Load More ({searchResult.length - pageNumber * 5} more available)
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchScreen;