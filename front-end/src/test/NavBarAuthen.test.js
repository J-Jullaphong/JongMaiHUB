import React from "react";
import { render, screen, fireEvent, getByTitle } from "@testing-library/react";
import NavBar from "../components/NavBar";
import User from "../components/User";

const USER = User.getInstance();
USER.setUID("Mock UID");
USER.setName("Mock User");
USER.setProfilePicture("data:image/jpeg;base64,mockProfilePicture");

const SERVICE = [
  {
    id: 1,
    name: "Mock Hair Cut",
    type: "Hair Cut",
    duration: 30,
    price: "60.00",
    service_picture: "data:image/jpeg;base64,mockPicture1",
    service_provider: "mockProvider1",
  },
  {
    id: 2,
    name: "Mock Riding",
    type: "Animal Riding",
    duration: 30,
    price: "100.00",
    service_picture: "data:image/jpeg;base64,mockPicture2",
    service_provider: "mockProvider1",
  },
];

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Navbar when user is logged in", () => {
  it("should display their name and profile", () => {
    render(
      <NavBar user={USER} serviceData={SERVICE} isUserAuthenticated={true} />
    );
    const userProfile = screen.getByTitle(/userprofile/i);
    expect(userProfile).toBeInTheDocument();
  });

  it("should display sign out when clicks the profile", () => {
    render(
      <NavBar user={USER} serviceData={SERVICE} isUserAuthenticated={true} />
    );
    fireEvent.click(screen.getByText(/Mock User/i));
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });
});
