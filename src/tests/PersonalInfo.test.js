import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PersonalInfo from "../PersonalInfo";
import userContext from "../userContext";
import ServerApi from "../api/api";

jest.mock("../api/api");

describe("PersonalInfo Component", () => {
  const mockUserContext = { accountId: 1, email: "test@example.com", isProvider: false, isAdmin: false };
  const mockClientData = {
    client_id: 1,
    name: "John Doe",
    gender: "Male",
    birthday: "1990-01-01T00:00:00.000Z",
    address: "123 Main St",
    city: "Testville",
    state: "TS",
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders correctly with no client data (snapshot test)", async () => {
    ServerApi.getClient.mockResolvedValueOnce(null);

    const { asFragment } = render(
      <userContext.Provider value={mockUserContext}>
        <Router>
          <PersonalInfo />
        </Router>
      </userContext.Provider>
    );

    await waitFor(() => {
      expect(ServerApi.getClient).toHaveBeenCalledWith("test@example.com");
    });

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders correctly with client data pre-filled", async () => {
    ServerApi.getClient.mockResolvedValueOnce(mockClientData);

    render(
      <userContext.Provider value={mockUserContext}>
        <Router>
          <PersonalInfo />
        </Router>
      </userContext.Provider>
    );

    expect(await screen.findByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Male")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1990-01-01")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123 Main St")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Testville")).toBeInTheDocument();
    expect(screen.getByDisplayValue("TS")).toBeInTheDocument();
  });

  test("submits updated client data", async () => {
    ServerApi.getClient.mockResolvedValueOnce(mockClientData);
    ServerApi.updateClient.mockResolvedValueOnce({ success: true });

    render(
      <userContext.Provider value={mockUserContext}>
        <Router>
          <PersonalInfo />
        </Router>
      </userContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/Full Name:/i), {
      target: { value: "Jane Doe" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(ServerApi.updateClient).toHaveBeenCalledWith(
        1,
        "Male",
        "1990-01-01",
        "123 Main St",
        "Testville",
        "TS"
      );
    });
  });

  test("creates new client if none exists", async () => {
    ServerApi.getClient.mockResolvedValueOnce(null);
    ServerApi.createClient.mockResolvedValueOnce({ success: true });

    render(
      <userContext.Provider value={mockUserContext}>
        <Router>
          <PersonalInfo />
        </Router>
      </userContext.Provider>
    );

    fireEvent.change(screen.getByLabelText(/Full Name:/i), {
      target: { value: "Jane Doe" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(ServerApi.createClient).toHaveBeenCalledWith(
        1,
        "",
        "",
        "",
        "",
        ""
      );
    });
  });
});
