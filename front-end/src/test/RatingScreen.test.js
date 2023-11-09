import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RatingScreen from "../components/RatingScreen";

jest.mock("../components/DataSender");

const mockAppointmentId = "mockAppointment001";

describe("RatingScreen", () => {
  it("should display star for rating on state one.", () => {
    render(<RatingScreen appointmentId={mockAppointmentId} />);
    const ratingStar = screen.getByRole("radiogroup");
    const rateButton = screen.getByRole("button", { name: /rate/i });

    expect(ratingStar).toBeInTheDocument();
    expect(rateButton).toBeInTheDocument();
  });

  it("should display confirmation message when click the rate button.", async () => {
    render(<RatingScreen appointmentId={mockAppointmentId} />);
    const rateButton = screen.getByRole("button", { name: /rate/i });
    fireEvent.click(rateButton);

    await waitFor(() => {
      const confirmationMessage = screen.getByText(
        /Your Rating has been recorded./i
      );
      const closeMessage = screen.getByText(/You may close this window./i);
      expect(confirmationMessage).toBeInTheDocument();
      expect(closeMessage).toBeInTheDocument();
    });
  });
});
