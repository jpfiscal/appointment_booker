import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CalendarSettings from "../CalendarSettings";
import userContext from "../userContext";
import ServerApi from "../api/api";

jest.mock("../api/api");

describe("CalendarSettings Component", () => {
  const mockUserContext = { accountId: 1 };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders correctly when account is not linked to Google (snapshot test)", async () => {
    ServerApi.getGoogleToken.mockResolvedValueOnce({});

    const { asFragment } = render(
      <userContext.Provider value={mockUserContext}>
        <CalendarSettings />
      </userContext.Provider>
    );

    expect(asFragment()).toMatchSnapshot();
    expect(await screen.findByText("Link Your Account to Google Calendar")).toBeInTheDocument();
  });

  test("renders correctly when account is already linked to Google", async () => {
    ServerApi.getGoogleToken.mockResolvedValueOnce({ access_token: "fake-token" });

    render(
      <userContext.Provider value={mockUserContext}>
        <CalendarSettings />
      </userContext.Provider>
    );

    expect(await screen.findByText("Your account is already linked to Google Calendars")).toBeInTheDocument();
  });

  test("navigates to Google auth link on button click", async () => {
    ServerApi.getGoogleToken.mockResolvedValueOnce({});
    delete window.location;
    window.location = { href: "" };

    render(
      <userContext.Provider value={mockUserContext}>
        <CalendarSettings />
      </userContext.Provider>
    );

    const button = await screen.findByRole("button", { name: "Link to Google" });
    fireEvent.click(button);

    expect(window.location.href).toBe("http://localhost:3001/auth/google?userId=1");
  });
});
