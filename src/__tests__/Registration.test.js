import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Registration from "../Registration";
 
test("renders signup form", () => {
  render(
    <MemoryRouter>
      <Registration onLogin={() => {}} />
    </MemoryRouter>
  );
 
  expect(screen.getByRole("heading", { name: /sign up/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
});
 
test("shows error if passwords do not match", async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <Registration onLogin={() => {}} />
    </MemoryRouter>
  );
 
  await user.type(screen.getByLabelText(/^password$/i), "pass123");
  await user.type(screen.getByLabelText(/confirm password/i), "wrong");
await user.click(screen.getByRole("button", { name: /sign up/i }));
 
  expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
});
 
test("calls onLogin when passwords match", async () => {
  const user = userEvent.setup();
  const mockLogin = jest.fn();
 
  render(
    <MemoryRouter>
      <Registration onLogin={mockLogin} />
    </MemoryRouter>
  );
 
  await user.type(screen.getByLabelText(/first name/i), "Bhanu");
  await user.type(screen.getByLabelText(/last name/i), "Tester");
  await user.type(screen.getByLabelText(/^email$/i), "test@test.com");
  await user.type(screen.getByLabelText(/^password$/i), "pass123");
  await user.type(screen.getByLabelText(/confirm password/i), "pass123");
 
await user.click(screen.getByRole("button", { name: /sign up/i }));
 
  expect(mockLogin).toHaveBeenCalled();
});