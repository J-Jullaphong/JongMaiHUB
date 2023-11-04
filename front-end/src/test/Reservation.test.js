import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Reservation from "../components/Reservation";
import User from "../components/User";

jest.mock("../components/DataSender", () => {
    return {
        __esModule: true,
        default: jest.fn(() => {
            return {
                submitAppointmentData: jest.fn(),
            };
        }),
    };
});

jest.mock("../components/DataFetcher", () => {
    return {
        __esModule: true,
        default: jest.fn(() => {
            return {
                getAppointmentByCustomer: jest.fn(),
                getAppointmentByStaff: jest.fn(),
            };
        }),
    };
});

const currentUserMock = User.getInstance();
currentUserMock.setUID("Mock UID");
currentUserMock.setName("Mock User");
currentUserMock.setProfilePicture("data:image/jpeg;base64,mockProfilePicture");

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
];

const staffData = {
    uid: 1,
    name: "staff1",
    service_provider: "provider1",
    service: "service1",
    specialty: "specialty1",
    background: "background1",
    start_work_time: "09:00:00",
    get_off_work_time: "17:00:00",
    profile_picture: "staff1.jpg",
};

describe("Reservation", () => {
    it("should display name, specialty and background of staff correctly.", () => {
        render(
            <Reservation
                service={serviceData}
                staff={staffData}
                provider={providerData}
                user={currentUserMock}
            />
        );
        const getName = screen.getByText(/staff/i);
        const getSpecialty = screen.getByText(/specialty/i);
        const getBackground = screen.getByText(/background1/i);

        expect(getName).toBeInTheDocument();
        expect(getSpecialty).toBeInTheDocument();
        expect(getBackground).toBeInTheDocument();
    });

    it("should display continue button and step of process.", () => {
        render(
            <Reservation
                service={serviceData}
                staff={staffData}
                provider={providerData}
                user={currentUserMock}
            />
        );
        const getContinue = screen.getByText(/continue/i);
        const getStep1 = screen.getByText("1");
        const getStep2 = screen.getByText("2");
        const getStep3 = screen.getByText("3");

        expect(getContinue).toBeInTheDocument();
        expect(getStep1).toBeInTheDocument();
        expect(getStep2).toBeInTheDocument();
        expect(getStep3).toBeInTheDocument();
    });

    it("should display select date and time when click continue first time.", () => {
        render(
            <Reservation
                service={serviceData}
                staff={staffData}
                provider={providerData}
                user={currentUserMock}
            />
        );
        const getContinue = screen.getByText(/continue/i);
        fireEvent.click(getContinue);
        const getSelectDate = screen.getByText(/selected date/i);
        const getSelectTime = screen.getByText(/selected time/i);
        const getStep1 = screen.queryByText("1");

        expect(getSelectDate).toBeInTheDocument();
        expect(getSelectTime).toBeInTheDocument();
        expect(getStep1).toBe(null);
    });
});