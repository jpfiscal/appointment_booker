import React from "react";
import { render, screen } from "@testing-library/react";
import AppointmentRecord from "../AppointmentRecord";
import AlertDialog from "../AlertDialog";

jest.mock("../AlertDialog", () => ({
  __esModule: true,
  default: jest.fn(() => <button data-testid="AlertDialog">Mocked AlertDialog</button>),
}));

describe("AppointmentRecord Component", () => {
  const mockProps = {
    apptId: 1,
    date: "2024-12-01",
    time: "10:00",
    serviceName: "Test Service",
    providerName: "Test Provider",
    status: "booked",
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders correctly (snapshot test)", () => {
    const { asFragment } = render(<AppointmentRecord {...mockProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("displays correct data", () => {
    render(<AppointmentRecord {...mockProps} />);

    expect(screen.getByText("2024-12-01")).toBeInTheDocument();
    expect(screen.getByText("10:00")).toBeInTheDocument();
    expect(screen.getByText("Test Service")).toBeInTheDocument();
    expect(screen.getByText("Test Provider")).toBeInTheDocument();
    expect(screen.getByText("booked")).toBeInTheDocument();
  });

  test("renders AlertDialog component", () => {
    render(<AppointmentRecord {...mockProps} />);

    expect(screen.getByTestId("AlertDialog")).toBeInTheDocument();
  });
});
