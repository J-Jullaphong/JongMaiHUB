import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "../components/NavBar";
import User from "../components/User";

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

describe("Navbar when user is not logged in", () => {
  it("should display hub, categories, search bar and login", () => {
    render(
      <NavBar
        user={User.getInstance()}
        serviceData={mockServiceData}
        isUserAuthenticated={false}
      />
    );
    const getHub = screen.getByText(/hub/i);
    const getCategories = screen.getByText(/categories/i);
    const getSearchBar = screen.getByTitle(/SearchBar/i);
    const getLogin = screen.getByText(/login/i);
    expect(getHub).toBeInTheDocument();
    expect(getCategories).toBeInTheDocument();
    expect(getSearchBar).toBeInTheDocument();
    expect(getLogin).toBeInTheDocument();
  });

  it("should not user profile", () => {
    render(
      <NavBar
        user={User.getInstance()}
        serviceData={mockServiceData}
        isUserAuthenticated={false}
      />
    );
    const userName = screen.queryByText(/username/i);
    expect(userName).toBeNull();
    const userProfile = screen.queryByText(/userprofile/i);
    expect(userProfile).toBeNull();
  });
});
