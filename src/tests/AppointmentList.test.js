import React from "react";
import { render, screen } from "@testing-library/react";
import AppointmentList from "../AppointmentList";
import ServerApi from "../api/api";
import AppointmentRecord from "../AppointmentRecord";

jest.mock("../api/api");
jest.mock("../AppointmentRecord", () => ({
  __esModule: true,
  default: jest.fn(() => <tr data-testid="AppointmentRecord">Mocked AppointmentRecord</tr>),
}));

describe("AppointmentList Component", () => {
  const mockClientId = 1;
  const mockServiceId = 1;
  const mockProviderId = 1;
  const mockBookingStart = "2024-12-01";
  const mockBookingEnd = "2024-12-31";

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders correctly with no appointments (snapshot test)", async () => {
    ServerApi.getAppointments.mockResolvedValueOnce({ appointments: [] });

    const { asFragment } = render(
      <AppointmentList
        client_id={mockClientId}
        service_id={mockServiceId}
        provider_id={mockProviderId}
        booking_dt_start={mockBookingStart}
        booking_dt_end={mockBookingEnd}
        status="booked"
      />
    );

    expect(asFragment()).toMatchSnapshot();
    expect(await screen.findByText("No appointments found.")).toBeInTheDocument();
  });

  test("renders appointments when available", async () => {
    const mockAppointments = {
      appointments: [
        {
          appointment_id: 1,
          date: "2024-12-05",
          time: "10:00",
          "Service Name": "Test Service",
          "Provider Name": "Test Provider",
          status: "booked",
        },
        {
          appointment_id: 2,
          date: "2024-12-06",
          time: "11:00",
          "Service Name": "Another Service",
          "Provider Name": "Another Provider",
          status: "booked",
        },
      ],
    };

    ServerApi.getAppointments.mockResolvedValueOnce(mockAppointments);

    render(
      <AppointmentList
        client_id={mockClientId}
        service_id={mockServiceId}
        provider_id={mockProviderId}
        booking_dt_start={mockBookingStart}
        booking_dt_end={mockBookingEnd}
        status="booked"
      />
    );

    expect(await screen.findAllByTestId("AppointmentRecord")).toHaveLength(2);
    expect(AppointmentRecord).toHaveBeenCalledTimes(2);
  });
});
