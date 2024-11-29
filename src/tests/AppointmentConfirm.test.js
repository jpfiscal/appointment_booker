import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AppointmentConfirm from "../AppointmentConfirm";
import ServerApi from "../api/api";

jest.mock("../api/api");

describe("AppointmentConfirm Component", () => {
  const mockNavigate = jest.fn();
  const mockLocation = {
    state: {
      userId: 1,
      availability: {
        date: "2024-12-01",
        "start time": "10:00",
        "end time": "11:00",
        "provider name": "Test Provider",
      },
      service: { service_id: 1, service_name: "Test Service" },
      client_id: 1,
    },
  };

  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockImplementation(() => mockNavigate);
    jest.spyOn(require("react-router-dom"), "useLocation").mockImplementation(() => mockLocation);
  });

  test("renders correctly with provided data (snapshot test)", () => {
    const { asFragment } = render(
      <Router>
        <AppointmentConfirm />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("displays appointment details", () => {
    render(
      <Router>
        <AppointmentConfirm />
      </Router>
    );

    expect(screen.getByText("Confirm your appointment")).toBeInTheDocument();
    expect(screen.getByText("Date:")).toBeInTheDocument();
    expect(screen.getByText("2024-12-01")).toBeInTheDocument();
    expect(screen.getByText("Time:")).toBeInTheDocument();
    expect(screen.getByText("10:00")).toBeInTheDocument();
    expect(screen.getByText("Service:")).toBeInTheDocument();
    expect(screen.getByText("Test Service")).toBeInTheDocument();
    expect(screen.getByText("Provider:")).toBeInTheDocument();
    expect(screen.getByText("Test Provider")).toBeInTheDocument();
  });

  test("fetches and sets Google token state", async () => {
    ServerApi.getGoogleToken.mockResolvedValueOnce({ token: "fake-token" });

    render(
      <Router>
        <AppointmentConfirm />
      </Router>
    );

    await waitFor(() => {
      expect(ServerApi.getGoogleToken).toHaveBeenCalledWith(1);
    });
  });

  test("submits the appointment and navigates away", async () => {
    ServerApi.bookAppointment.mockResolvedValueOnce({ success: true });
    ServerApi.createGoogleCalendarEvent.mockResolvedValueOnce({ success: true });

    render(
      <Router>
        <AppointmentConfirm />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Include any additional information/i), {
      target: { value: "Test note" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Confirm/i }));

    await waitFor(() => {
      expect(ServerApi.bookAppointment).toHaveBeenCalledWith(
        1,
        1,
        [undefined],
        "Test note"
      );
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("handles API errors gracefully", async () => {
    ServerApi.bookAppointment.mockRejectedValueOnce(new Error("Booking error"));

    render(
      <Router>
        <AppointmentConfirm />
      </Router>
    );

    fireEvent.click(screen.getByRole("button", { name: /Confirm/i }));

    await waitFor(() => {
      expect(screen.getByText("Problem occured while trying to book an appointment"));
    });
  });
});
