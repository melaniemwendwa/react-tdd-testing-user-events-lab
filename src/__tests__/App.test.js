import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import App from "../App";


// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);
  expect(screen.getByLabelText(/coding/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/design/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/writing/i)).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);
  expect(screen.getByLabelText(/coding/i)).not.toBeChecked();
  expect(screen.getByLabelText(/design/i)).not.toBeChecked();
  expect(screen.getByLabelText(/writing/i)).not.toBeChecked();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", async () => {
  render(<App />);
  await userEvent.type(screen.getByPlaceholderText(/your name/i), "Mel");
  await userEvent.type(screen.getByPlaceholderText(/your email/i), "mel@example.com");

  expect(screen.getByDisplayValue("Mel")).toBeInTheDocument();
  expect(screen.getByDisplayValue("mel@example.com")).toBeInTheDocument();
});

test("checked status of checkboxes changes when user clicks them", async () => {
  render(<App />);
  const codingBox = screen.getByLabelText(/coding/i);
  expect(codingBox).not.toBeChecked();

  await userEvent.click(codingBox);
  expect(codingBox).toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", async () => {
  render(<App />);
  await userEvent.type(screen.getByPlaceholderText(/your name/i), "Mel");
  await userEvent.type(screen.getByPlaceholderText(/your email/i), "mel@example.com");
  await userEvent.click(screen.getByLabelText(/design/i));
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(screen.getByText(/thank you, mel/i)).toBeInTheDocument();
  expect(screen.getByText(/we’ve received your email: mel@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/your interests: design/i)).toBeInTheDocument();
});
