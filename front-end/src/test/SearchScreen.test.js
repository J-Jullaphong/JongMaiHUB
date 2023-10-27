import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchScreen from "../components/SearchScreen";

const url = "/search?type=TypeA";

const serviceData = [
    {
        id: 1,
        name: "service1",
        service_provider: "provider1",
        service_picture: "service1.jpg",
        type: "TypeA",
        duration: 60,
        price: 50,
    },
    {
        id: 2,
        name: "service2",
        service_provider: "provider2",
        service_picture: "service2.jpg",
        type: "TypeB",
        duration: 45,
        price: 40,
    }
];

const providerData = [
    {
        uid: "provider1",
        name: "provider1",
        profile_picture: "provider1.jpg",
        opening_time: "4:00",
        closing_time: "6:00",
        location: "LocationA",
    },
    {
        uid: "provider2",
        name: "provider2",
        profile_picture: "provider2.jpg",
        opening_time: "5:00",
        closing_time: "15:00",
        location: "LocationB",
    } 
];

describe("SearchScreen", () => {
    it("should display name of service, name of service provider, and detail button", () => {
        render(
            <MemoryRouter initialEntries={[url]}>
                <SearchScreen serviceData={serviceData} providerData={providerData} />
            </MemoryRouter>
        );
        const serviceName1 = screen.getByText(/service1/i);
        const serviceProvider1 = screen.getByText(/provider1/i);
        const detailsButton1 = screen.getByText(/Details/i);

        expect(serviceName1).toBeInTheDocument();
        expect(serviceProvider1).toBeInTheDocument();
        expect(detailsButton1).toBeInTheDocument();
    });

    it("should display all services of the selected type", () => {
        render(
            <MemoryRouter initialEntries={[url]}>
                <SearchScreen serviceData={serviceData} providerData={providerData} />
            </MemoryRouter>
        );
        const serviceNames = screen.getAllByText(/service/i);
        expect(serviceNames.length).toBe(2);
    });
});
