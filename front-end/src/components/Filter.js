import React, { useState } from "react";
import { Button, Container, Divider, SelectPicker, Slider } from "rsuite";
import { useNavigate, useSearchParams } from "react-router-dom";

const categories = [
    { value: "barber", label: "Barber" },
    { value: "beauty clinic", label: "Beauty Clinic" },
    { value: "salon", label: "Salon" },
    { value: "massage", label: "Massage" },
];

const Filter = () => {
    const [type, setType] = useState("");
    const [maxPrice, setMaxPrice] = useState(0);
    const [maxDuration, setMaxDuration] = useState(0);

    const navigate = useNavigate();
    const [prevSearchParams] = useSearchParams();

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
        var nameParam = prevSearchParams.get("name");
        if (nameParam) {
            updateSearchParams.set("name", prevSearchParams.get("name"));
        }
        updateSearchParams.set("type", type);
        updateSearchParams.set("maxPrice", maxPrice);
        updateSearchParams.set("maxDuration", maxDuration);
        navigate(
            window.location.pathname + "?" + updateSearchParams.toString()
        );
    };

    const handleClearFilter = () => {
        setType("");
        setMaxPrice(0);
        setMaxDuration(0);
        handleApplyFilter();
    };

    return (
        <Container style={{ backgroundColor: "#D1E0F3", alignItems: "center" }}>
            <h4 style={{ paddingBottom: "5%" }}>Type:</h4>
            <SelectPicker
                label="Type"
                style={{ width: "80%" }}
                data={categories}
                value={type}
                onSelect={handleTypeSelect}
            />
            <Divider style={{ width: "80%" }} />
            <h4 style={{ paddingBottom: "5%" }}>Price:</h4>
            <Slider
                progress
                max={100}
                value={maxPrice}
                onChange={handlePriceSelect}
                handleTitle={maxPrice}
                style={{ width: "80%" }}
            />
            <Divider style={{ width: "80%" }} />
            <h4>Duration:</h4>
            <Slider
                progress
                max={100}
                value={maxDuration}
                onChange={handleDurationSelect}
                handleTitle={maxDuration}
                style={{ width: "80%" }}
            />
            <Divider style={{ width: "80%" }} />
            <Button onClick={handleApplyFilter} appearance="primary">
                Apply Filter
            </Button>
            <br />
            <Button onClick={handleClearFilter}>Clear Filter</Button>
            <br />
        </Container>
    );
};

export default Filter;
