import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import AvailabilityDay from "../AvailabilityDay";
import ServerApi from "../api/api";
import AvailabilityBlock from "../AvailabilityBlock";

jest.mock("../api/api");
jest.mock("../AvailabilityBlock", () => () => <div data-testid="AvailabilityBlock">Mocked AvailabilityBlock</div>);

describe("AvailabilityDay Component", () => {
  const mockDate = "2024-12-01";
  const mockService = { service_id: 1, service_name: "Test Service" };
  const mockClientId = 1;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders correctly with no availabilities (snapshot test)", async () => {
    ServerApi.getAvailabilitiesByService.mockResolvedValueOnce({ availabilities: [] });

    const { asFragment } = render(
      <AvailabilityDay date={mockDate} service={mockService} client_id={mockClientId} />
    );

    await waitFor(() => {
      expect(ServerApi.getAvailabilitiesByService).toHaveBeenCalledWith(1, "2024-12-01");
    });

    expect(asFragment()).toMatchSnapshot();
  });

  test("displays 'No Availabilities' when there are no availabilities", async () => {
    ServerApi.getAvailabilitiesByService.mockResolvedValueOnce({ availabilities: [] });

    render(
      <AvailabilityDay date={mockDate} service={mockService} client_id={mockClientId} />
    );

    await waitFor(() => {
      expect(screen.getByText("No Availabilities")).toBeInTheDocument();
    });
  });

  test("renders availability blocks when availabilities exist", async () => {
    const mockAvailabilities = {
      availabilities: [
        {
          date: "2024-12-01",
          "start time": "10:00",
          "end time": "11:00",
          "provider name": "Test Provider",
        },
        {
          date: "2024-12-01",
          "start time": "11:00",
          "end time": "12:00",
          "provider name": "Test Provider",
        },
      ],
    };

    ServerApi.getAvailabilitiesByService.mockResolvedValueOnce(mockAvailabilities);

    render(
      <AvailabilityDay date={mockDate} service={mockService} client_id={mockClientId} />
    );

    await waitFor(() => {
      expect(ServerApi.getAvailabilitiesByService).toHaveBeenCalledWith(1, "2024-12-01");
      expect(screen.getAllByTestId("AvailabilityBlock").length).toBe(2);
    });
  });

  test("handles API errors gracefully", async () => {
    ServerApi.getAvailabilitiesByService.mockRejectedValueOnce(new Error("API Error"));

    render(
      <AvailabilityDay date={mockDate} service={mockService} client_id={mockClientId} />
    );

    await waitFor(() => {
      expect(ServerApi.getAvailabilitiesByService).toHaveBeenCalledWith(1, "2024-12-01");
      expect(screen.getByText("No Availabilities")).toBeInTheDocument();
    });
  });
});
