import React from "react";
import { render, screen, fireEvent, getByTitle } from "@testing-library/react";
import NavBar from "../components/NavBar";
import User from "../components/User";

const currentUserMock = User.getInstance();
currentUserMock.setUID("Mock UID");
currentUserMock.setName("Mock User");
currentUserMock.setProfilePicture("data:image/jpeg;base64,mockProfilePicture");

const mockServiceData = [
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
      <NavBar
        user={currentUserMock}
        serviceData={mockServiceData}
        isUserAuthenticated={true}
      />
    );
    const userName = screen.getByTitle(/username/i);
    expect(userName).toBeInTheDocument();
    const userProfile = screen.getByTitle(/userprofile/i);
    expect(userProfile).toBeInTheDocument();
  });

  it("should display sign out when clicks the profile", () => {
    render(
      <NavBar
        user={currentUserMock}
        serviceData={mockServiceData}
        isUserAuthenticated={true}
      />
    );
    fireEvent.click(screen.getByText(/Mock User/i));
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });
});
