import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignUpForm from "../SignUpForm";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("SignUpForm Component", () => {
  const mockSignup = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockImplementation(() => mockNavigate);
  });

  test("renders correctly (snapshot test)", () => {
    const { asFragment } = render(
      <Router>
        <SignUpForm signup={mockSignup} />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("submits form data and navigates", async () => {
    render(
      <Router>
        <SignUpForm signup={mockSignup} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(mockSignup).toHaveBeenCalledWith(
      "John Doe",
      "password123",
      "john.doe@example.com",
      "1234567890",
      "client"
    );
    expect(mockNavigate).toHaveBeenCalledWith("/accountInfo");
  });
});
