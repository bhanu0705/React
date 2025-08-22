import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";
 
test("renders login form", () => {
  render(
    <MemoryRouter>
      <Login onLogin={() => {}} />
    </MemoryRouter>
  );
 
  expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
});
 
test("calls onLogin when form is submitted", async () => {
  const user = userEvent.setup();
  const mockLogin = jest.fn();
 
  render(
    <MemoryRouter>
      <Login onLogin={mockLogin} />
    </MemoryRouter>
  );
 
  await user.type(screen.getByLabelText(/email/i), "test@test.com");
  await user.type(screen.getByLabelText(/password/i), "secret");
await user.click(screen.getByRole("button", { name: /login/i }));
 
  expect(mockLogin).toHaveBeenCalled();
});