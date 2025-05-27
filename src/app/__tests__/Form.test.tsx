import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "../Form";
import { useApi } from "../ApiProvider";

jest.mock("../ApiProvider");

describe("Form Component", () => {
  const mockUseApi = useApi as jest.MockedFunction<typeof useApi>;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Default mock implementation
    mockUseApi.mockReturnValue({
      data: [],
      loading: true,
      error: null,
      fetchData: jest.fn(),
    });
    render(<Form />);
  });

  test("renders header and footer", () => {
    expect(screen.getByText("My Application")).toBeInTheDocument();
    // expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
  });

  // test("renders all form fields", () => {
  //   expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
  // });

  test("validates required fields", async () => {
    // fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByLabelText(/Full Name/i)).toHaveAttribute("required");
      expect(screen.getByLabelText(/Email Address/i)).toHaveAttribute(
        "required"
      );
      expect(screen.getByLabelText(/Password/i)).toHaveAttribute("required");
    });
  });

  // test("handles input changes correctly", () => {
  //   const nameInput = screen.getByLabelText(/Full Name/i) as HTMLInputElement;
  //   fireEvent.change(nameInput, { target: { value: "John Doe" } });
  //   expect(nameInput.value).toBe("John Doe");

  //   const ageInput = screen.getByLabelText(/Age/i) as HTMLInputElement;
  //   fireEvent.change(ageInput, { target: { value: "30" } });
  //   expect(ageInput.value).toBe("30");
  // });

  // test("submits form with correct data", async () => {
  //   // Mock console.log
  //   const mockConsoleLog = jest
  //     .spyOn(console, "log")
  //     .mockImplementation(() => {});

  //   // Fill out form
  //   fireEvent.change(screen.getByLabelText(/Full Name/i), {
  //     target: { value: "John Doe" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Email Address/i), {
  //     target: { value: "john@example.com" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Password/i), {
  //     target: { value: "secure123" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/Age/i), {
  //     target: { value: "30" },
  //   });

  //   // Submit form
  //   fireEvent.click(screen.getByText("Submit"));

  //   await waitFor(() => {
  //     expect(mockConsoleLog).toHaveBeenCalledWith(
  //       "Form submitted:",
  //       expect.objectContaining({
  //         name: "John Doe",
  //         email: "john@example.com",
  //         password: "secure123",
  //         age: 30,
  //       })
  //     );
  //   });

  //   mockConsoleLog.mockRestore();
  // });

  // test("validates email format", async () => {
  //   const emailInput = screen.getByLabelText(/Email Address/i);
  //   fireEvent.change(emailInput, { target: { value: "invalid-email" } });
  //   fireEvent.click(screen.getByText("Submit"));

  //   await waitFor(() => {
  //     expect(emailInput).toHaveAttribute("type", "email");
  //     expect(emailInput).toHaveValue("invalid-email");
  //   });
  // });

  // test("validates age as number", () => {
  //   const ageInput = screen.getByLabelText(/Age/i) as HTMLInputElement;
  //   expect(ageInput).toHaveAttribute("type", "number");
  //   expect(ageInput).toHaveAttribute("min", "0");
  // });
});
