import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../components/NavBar";

jest.mock("firebase/compat/app", () => ({
    auth: () => ({
        onAuthStateChanged: (callback) => {
            callback(null);
        },
        currentUser: null,
        signOut: jest.fn(),
    }),
}));

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

describe("Navbar when user is not logged in", () => {
    it('should display hub, categories, search bar and login', () => {
        render(<NavBar />);
        const getHub = screen.getByText(/hub/i);
        const getCategories = screen.getByText(/categories/i);
        const getSearchBar = screen.getByTitle(/SearchBar/i);
        const getLogin = screen.getByText(/login/i);
        expect(getHub).toBeInTheDocument();
        expect(getCategories).toBeInTheDocument();
        expect(getSearchBar).toBeInTheDocument();
        expect(getLogin).toBeInTheDocument();
    });

    it('should display all services when clicks a category', () => {
        render(<NavBar />);
        fireEvent.click(screen.getByText(/categories/i));
        // todo use mock api 
        const getBarber = screen.getByText(/barber/i);
        expect(getBarber).toBeInTheDocument();
    });
});