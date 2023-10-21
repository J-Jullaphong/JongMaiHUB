import React from "react";
import { render, screen, fireEvent, getByTitle } from "@testing-library/react";
import NavBar from "../components/NavBar";

const currentUserMock = {
    displayName: "testerName",
    photoURL: "testerPhoto.jpg",
};

jest.mock("firebase/compat/app", () => ({
    auth: () => ({
        onAuthStateChanged: (callback) => {
            callback(currentUserMock);
        },
        currentUser: currentUserMock,
        signOut: jest.fn(),
    }),
}));

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

describe("Navbar when user is logged in", () => {
    it('should display their name and profile', () => {
        render(<NavBar />);
        const userName = screen.getByTitle(/username/i);
        expect(userName).toBeInTheDocument();
        const userProfile = screen.getByTitle(/userprofile/i);
        expect(userProfile).toBeInTheDocument();
    });

    it('should display sign out when clicks the profile', () => {
        render(<NavBar />);
        fireEvent.click(screen.getByText(/testerName/i));
        expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    });
});
