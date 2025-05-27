// __tests__/Form.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "../Form";
import { useApi } from "../ApiProvider";

jest.mock("../ApiProvider");

const mockFetchData = jest.fn();

describe("unit tests", () => {
  beforeEach(() => {
    (useApi as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: null,
      fetchData: mockFetchData,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test("shows loading indicator when loading", () => {
    (useApi as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
      fetchData: mockFetchData,
    });

    render(<Form />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders form inputs and submit button", () => {
    render(<Form />);
    expect(screen.getByTestId("breed")).toBeInTheDocument();
    expect(screen.getByTestId("age")).toBeInTheDocument();
    expect(screen.getByTestId("condition")).toBeInTheDocument();
    expect(screen.getByTestId("coverage")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("shows error message when there is an error", () => {
    (useApi as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: "Something went wrong",
      fetchData: mockFetchData,
    });

    render(<Form />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  // test("renders form inputs and submit button", () => {
  //   render(<Form />);
  //   expect(screen.getByLabelText(/breed/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
  //   expect(
  //     screen.getByLabelText(/pre-existing condition/i)
  //   ).toBeInTheDocument();
  //   expect(screen.getByLabelText(/coverage level/i)).toBeInTheDocument();
  //   expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  // });
});
