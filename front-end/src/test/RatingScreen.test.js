import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RatingScreen from "../components/RatingScreen";

jest.mock("../components/DataSender");

const APPOINTMENT_ID = "mockAppointment001";

describe("RatingScreen", () => {
  it("should display smiley faces for rating on state one.", () => {
    render(<RatingScreen appointmentId={APPOINTMENT_ID} />);

    const satisfaction = screen.getByText(/Satisfaction/i);
    const staffPoliteness = screen.getByText(/Staff Politeness/i);
    const environment = screen.getByText(/Environment/i);
    const rateButton = screen.getByRole("button", { name: /Rate/i });

    expect(satisfaction).toBeInTheDocument();
    expect(staffPoliteness).toBeInTheDocument();
    expect(environment).toBeInTheDocument();
    expect(rateButton).toBeInTheDocument();
  });

  it("should display confirmation message when clicking the rate button.", async () => {
    render(<RatingScreen appointmentId={APPOINTMENT_ID} />);
    const rateButton = screen.getByRole("button", { name: /Rate/i });
    fireEvent.click(rateButton);

    await waitFor(() => {
      const confirmationMessage = screen.getByText(/Your Ratings have been recorded./i);
      const closeMessage = screen.getByText(/You may close this window./i);
      expect(confirmationMessage).toBeInTheDocument();
      expect(closeMessage).toBeInTheDocument();
    });
  });
});
