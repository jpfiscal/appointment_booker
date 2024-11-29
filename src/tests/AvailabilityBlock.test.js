import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AvailabilityBlock from "../AvailabilityBlock";
import userContext from "../userContext";

jest.mock("../helpers/helper", () => ({
  convertToDate: jest.fn(() => "2024-12-01"),
}));

describe("AvailabilityBlock Component", () => {
  const mockNavigate = jest.fn();
  const mockAvailability = {
    date: "2024-12-01",
    "start time": "10:00",
    "end time": "11:00",
  };
  const mockService = { service_id: 1, service_name: "Test Service" };
  const mockClientId = 1;
  const mockUserContext = { accountId: 1 };

  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockImplementation(() => mockNavigate);
  });

  test("renders correctly (snapshot test)", () => {
    const { asFragment } = render(
      <userContext.Provider value={mockUserContext}>
        <Router>
          <AvailabilityBlock availability={mockAvailability} service={mockService} client_id={mockClientId} />
        </Router>
      </userContext.Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("displays availability details", () => {
    render(
      <userContext.Provider value={mockUserContext}>
        <Router>
          <AvailabilityBlock availability={mockAvailability} service={mockService} client_id={mockClientId} />
        </Router>
      </userContext.Provider>
    );

    expect(screen.getByText("10:00 - 11:00")).toBeInTheDocument();
  });

  test("handles click and navigates to confirmation page", () => {
    render(
      <userContext.Provider value={mockUserContext}>
        <Router>
          <AvailabilityBlock availability={mockAvailability} service={mockService} client_id={mockClientId} />
        </Router>
      </userContext.Provider>
    );

    fireEvent.click(screen.getByText("10:00 - 11:00"));

    expect(mockNavigate).toHaveBeenCalledWith("/appointment/confirm", {
      state: { userId: 1, availability: mockAvailability, service: mockService, client_id: mockClientId },
    });
  });

  test("applies correct styles for availability block", () => {
    render(
      <userContext.Provider value={mockUserContext}>
        <Router>
          <AvailabilityBlock availability={mockAvailability} service={mockService} client_id={mockClientId} />
        </Router>
      </userContext.Provider>
    );

    const timeBlock = screen.getByText("10:00 - 11:00").parentElement;
    expect(timeBlock).toHaveStyle({ height: "60px", top: "120px", zIndex: "10" });
  });

  test("adds 'Past' class for past availabilities", () => {
    jest.requireMock("../helpers/helper").convertToDate.mockReturnValueOnce("2024-12-02");

    render(
      <userContext.Provider value={mockUserContext}>
        <Router>
          <AvailabilityBlock availability={mockAvailability} service={mockService} client_id={mockClientId} />
        </Router>
      </userContext.Provider>
    );

    const timeBlock = screen.getByText("10:00 - 11:00").parentElement;
    expect(timeBlock).toHaveClass("timeBlockPast");
  });
});
