import React, { useEffect, useState } from "react";
import { Button, Container, Divider, SelectPicker, Slider } from "rsuite";
import { useNavigate } from "react-router-dom";

const Filter = ({ serviceData, searchQuery }) => {
    const uniqueServiceTypesSet = new Set();

    const uniqueServiceTypes = serviceData.reduce((result, service) => {
        if (!uniqueServiceTypesSet.has(service.type)) {
            uniqueServiceTypesSet.add(service.type);
            result.push({ label: service.type, value: service.type });
        }
        return result;
    }, []);

    const servicePrice = new Set(
        serviceData.map((service) => parseFloat(service.price))
    );
    const serviceMinPrice = Math.min(...servicePrice);
    const serviceMaxPrice = Math.max(...servicePrice);

    const serviceDuration = new Set(
        serviceData.map((service) => parseInt(service.duration))
    );
    const serviceMinDuration = Math.min(...serviceDuration);
    const serviceMaxDuration = Math.max(...serviceDuration);

    const [type, setType] = useState("");
    const [maxPrice, setMaxPrice] = useState(serviceMaxDuration);
    const [maxDuration, setMaxDuration] = useState(serviceMaxDuration);

    const navigate = useNavigate();

    useEffect(() => {
        setMaxPrice(serviceMaxPrice);
        setMaxDuration(serviceMaxDuration);
    }, [serviceMaxPrice, serviceMaxDuration]);

    const handleTypeSelect = (selectedType) => {
        setType(selectedType);
    };

    const handlePriceSelect = (selectedPrice) => {
        setMaxPrice(selectedPrice);
    };

    const handleDurationSelect = (selectedDuration) => {
        setMaxDuration(selectedDuration);
    };

    const handleApplyFilter = () => {
        const updateSearchParams = new URLSearchParams();
        if (searchQuery.has("name"))
            updateSearchParams.set("name", searchQuery.get("name"));
        if (type !== "") updateSearchParams.set("type", type);
        if (maxPrice !== serviceMaxPrice)
            updateSearchParams.set("maxPrice", maxPrice);
        if (maxDuration !== serviceMaxDuration)
            updateSearchParams.set("maxDuration", maxDuration);
        navigate(
            window.location.pathname + "?" + updateSearchParams.toString()
        );
    };

    const handleClearFilter = () => {
        setType("");
        setMaxPrice(serviceMaxPrice);
        setMaxDuration(serviceMaxDuration);
        handleApplyFilter();
        const updateSearchParams = new URLSearchParams(searchQuery.toString());
        updateSearchParams.delete("type");
        updateSearchParams.delete("maxPrice");
        updateSearchParams.delete("maxDuration");
        navigate(window.location.pathname + "?" + updateSearchParams.toString());
    };

    return (
        <Container style={{ backgroundColor: "#D1E0F3", alignItems: "center", borderRadius: "25px" }}>
            <h4 style={{ paddingBottom: "5%" }}>Type:</h4>
            <SelectPicker
                label="Type"
                width="80%"
                data={uniqueServiceTypes}
                value={type}
                onChange={handleTypeSelect}
            />

            <Divider style={{ width: "80%" }} />
            <h4 style={{ paddingBottom: "5%" }}>Max Price</h4>
            <h6>{maxPrice} Baht</h6>
            <br />
            <Slider
                progress
                min={serviceMinPrice}
                max={serviceMaxPrice}
                value={maxPrice}
                onChange={handlePriceSelect}
                style={{ width: "80%" }}
                onCreate={(slider) => slider.handleSet(maxPrice)}
            />
            <Divider style={{ width: "80%" }} />
            <h4>Max Duration</h4>
            <h6>{maxDuration} Minutes</h6>
            <br />
            <Slider
                progress
                min={serviceMinDuration}
                max={serviceMaxDuration}
                value={maxDuration}
                onChange={handleDurationSelect}
                style={{ width: "80%" }}
                onCreate={(slider) => slider.handleSet(maxDuration)}
            />
            <Divider style={{ width: "80%" }} />
            <Button onClick={handleApplyFilter} appearance="primary">Apply Filter</Button>
            <br />
            <Button onClick={handleClearFilter}>Clear Filter</Button>
            <br />
        </Container>
    );
};

export default Filter;
