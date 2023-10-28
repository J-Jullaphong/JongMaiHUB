import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchScreen from "../components/SearchScreen";

const serviceData = [
    {
        id: 1,
        name: "service1",
        service_provider: "provider1",
        service_picture: "service1.jpg",
        type: "type1",
        duration: 10,
        price: 10,
    },
    {
        id: 2,
        name: "service2",
        service_provider: "provider2",
        service_picture: "service2.jpg",
        type: "type2",
        duration: 20,
        price: 20,
    },
    {
        id: 3,
        name: "service3",
        service_provider: "provider3",
        service_picture: "service3.jpg",
        type: "type3",
        duration: 30,
        price: 30,
    },
    {
        id: 4,
        name: "service4",
        service_provider: "provider4",
        service_picture: "service4.jpg",
        type: "type4",
        duration: 40,
        price: 40,
    },
    {
        id: 5,
        name: "service5",
        service_provider: "provider5",
        service_picture: "service5.jpg",
        type: "type5",
        duration: 50,
        price: 60,
    },
    {
        id: 6,
        name: "service6",
        service_provider: "provider6",
        service_picture: "service6.jpg",
        type: "type6",
        duration: 60,
        price: 60,
    }
];

const providerData = [
    {
        uid: "provider1",
        name: "provider1",
        profile_picture: "provider1.jpg",
        opening_time: "1:00",
        closing_time: "12:00",
        location: "location1",
    },
    {
        uid: "provider2",
        name: "provider2",
        profile_picture: "provider2.jpg",
        opening_time: "2:00",
        closing_time: "13:00",
        location: "location2",
    },
    {
        uid: "provider3",
        name: "provider3",
        profile_picture: "provider3.jpg",
        opening_time: "3:00",
        closing_time: "14:00",
        location: "location3",
    },
    {
        uid: "provider4",
        name: "provider4",
        profile_picture: "provider4.jpg",
        opening_time: "4:00",
        closing_time: "15:00",
        location: "Location4",
    },
    {
        uid: "provider5",
        name: "provider5",
        profile_picture: "provider5.jpg",
        opening_time: "5:00",
        closing_time: "16:00",
        location: "location5",
    },
    {
        uid: "provider6",
        name: "provider6",
        profile_picture: "provider6.jpg",
        opening_time: "6:00",
        closing_time: "17:00",
        location: "location6",
    },
];

describe("SearchScreen", () => {

    it("should display all service when search with empty string", () => {
        render(
            <MemoryRouter initialEntries={["/search?"]}>
                <SearchScreen serviceData={serviceData} providerData={providerData} />
            </MemoryRouter>
        );
        const getAllService = screen.getAllByTitle("service");
        const getAllProvider = screen.getAllByTitle("provider");
        const getAllDetails = screen.getAllByTitle("details");
        expect(getAllService.length).toBe(5);
        expect(getAllProvider.length).toBe(5);
        expect(getAllDetails.length).toBe(5);
    });

    it("should display all services of the selected type when search with type", () => {
        render(
            <MemoryRouter initialEntries={["/search?type=type1"]}>
                <SearchScreen serviceData={serviceData} providerData={providerData} />
            </MemoryRouter>
        );
        const getAllService = screen.getAllByTitle(/service/i);
        expect(getAllService.length).toBe(1);
    });

    it("should display all service of the selected max price when filter with max price", () => {
        render(
            <MemoryRouter initialEntries={["/search?maxPrice=40"]}>
                <SearchScreen serviceData={serviceData} providerData={providerData} />
            </MemoryRouter>
        );
        const getAllService = screen.getAllByTitle(/service/i);
        expect(getAllService.length).toBe(4);
    });

    it("should display service of the selected max duration when filter with max duration.", () => {
        render(
            <MemoryRouter initialEntries={["/search?maxDuration=100"]}>
                <SearchScreen serviceData={serviceData} providerData={providerData} />
            </MemoryRouter>
        );
        const getAllService = screen.getAllByTitle(/service/i);
        expect(getAllService.length).toBe(5);
    });

});
