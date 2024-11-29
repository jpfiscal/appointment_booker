import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import VertNav from "../VertNav";
import userContext from "../userContext";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("VertNav Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockImplementation(() => mockNavigate);
  });

  test("renders correctly for client user (snapshot test)", () => {
    const mockUserContext = { isProvider: false, isAdmin: false };

    const { asFragment } = render(
      <userContext.Provider value={mockUserContext}>
        <Router>
          <VertNav />
        </Router>
      </userContext.Provider>
    );

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText("My Account")).toBeInTheDocument();
    expect(screen.getByText("Book an Appointment")).toBeInTheDocument();
  });

  test("renders correctly for provider/admin user", () => {
    const mockUserContext = { isProvider: true, isAdmin: false };

    render(
      <userContext.Provider value={mockUserContext}>
        <Router>
          <VertNav />
        </Router>
      </userContext.Provider>
    );

    expect(screen.getByText("Manage Appointments")).toBeInTheDocument();
    expect(screen.getByText("Manage Services")).toBeInTheDocument();
  });

  test("navigates to services page on button click", () => {
    const mockUserContext = { isProvider: false, isAdmin: false };

    render(
      <userContext.Provider value={mockUserContext}>
        <Router>
          <VertNav />
        </Router>
      </userContext.Provider>
    );

    fireEvent.click(screen.getByText("Book an Appointment"));
    expect(mockNavigate).toHaveBeenCalledWith("/services");
  });

  test("renders empty nav for unauthenticated user", () => {
    render(
      <userContext.Provider value={null}>
        <Router>
          <VertNav />
        </Router>
      </userContext.Provider>
    );

    expect(screen.getByText("My Account")).not.toBeVisible();
  });
});
