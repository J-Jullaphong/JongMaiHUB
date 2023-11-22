import React from "react";
import {
  render,
  screen,
} from "@testing-library/react";
import ProviderManagement from "../components/ProviderManagement";
import DataFetcher from "../components/DataFetcher";

const USER = {
  isProvider: true,
  getUID: () => "mocked-uid",
};

const SERVICE = {
  id: 1,
  name: "service1",
  service_provider: "provider1",
  service_picture: "service1.jpg",
  type: "type1",
  duration: 10,
  price: 10,
};

const STAFF = {
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

const PROVIDER = {
  uid: "provider1",
  name: "provider1",
  location: "location1",
  opening_time: "1:00",
  closing_time: "12:00",
  profile_picture: "provider1.jpg",
  cover_picture: "provider1.jpg",
};

jest.mock("../components/DataFetcher", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Provider Management", () => {
  beforeEach(() => {
    DataFetcher.mockImplementation(() => ({
      getServiceByServiceProvider: jest.fn().mockResolvedValue([SERVICE]),
      getServiceProviderData: jest.fn().mockResolvedValue([STAFF]),
      getStaffByServiceProvider: jest.fn().mockResolvedValue([PROVIDER]),
    }));
  });

  it("should display provider information and update button", async () => {
    render(<ProviderManagement user={USER} />);
    expect(await screen.findByText("Provider Management")).toBeInTheDocument();
    expect(await screen.findByText("Profile picture")).toBeInTheDocument();
    expect(await screen.findByText("Name")).toBeInTheDocument();
    expect(await screen.findByText("Location")).toBeInTheDocument();
    expect(await screen.findByText("Open Time")).toBeInTheDocument();
    expect(await screen.findByText("Close Time")).toBeInTheDocument();
  });

  it("should display staff information table and add staff button", async () => {
    render(<ProviderManagement user={USER} />);
    expect(
      await screen.findByText("STAFF IN THIS PROVIDER")
    ).toBeInTheDocument();
    expect(await screen.findByText("Staff name")).toBeInTheDocument();
    expect(await screen.findByText("Service")).toBeInTheDocument();
    expect(await screen.findByText(/add staff/i)).toBeInTheDocument();
  });

  it("should display service information table and add service button", async () => {
    render(<ProviderManagement user={USER} />);
    expect(
      await screen.findByText("SERVICE IN THIS PROVIDER")
    ).toBeInTheDocument();
    expect(await screen.findByText("Service name")).toBeInTheDocument();
    expect(await screen.findByText("Service duration")).toBeInTheDocument();
    expect(await screen.findByText("Service price")).toBeInTheDocument();
    expect(await screen.findByText(/add service/i)).toBeInTheDocument();
  });
});
