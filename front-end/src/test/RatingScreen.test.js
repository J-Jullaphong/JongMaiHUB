import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RatingScreen from "../components/RatingScreen";

jest.mock("../components/DataSender", () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return {
        submitRatingData: jest.fn(() => Promise.resolve()),
        updateRatingData: jest.fn(() => Promise.resolve()),
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
      };
    }),
  };
});

const mockAppointmentId = "mockAppointment001";

describe("RatingScreen", () => {
  it("should display star for rating on state one.", () => {
    render(<RatingScreen appointmentId={mockAppointmentId} />);
    const ratingStar = screen.getByRole("radiogroup");
    const rateButton = screen.getByRole("button", { name: /rate/i });

    expect(ratingStar).toBeInTheDocument();
    expect(rateButton).toBeInTheDocument();
  });
});
