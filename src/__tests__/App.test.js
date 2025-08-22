import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
 
function renderWithRoute(initialRoute = "/") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  );
}
 
beforeEach(() => {
  localStorage.clear();
});
 
describe("App routing & auth flow", () => {
  test("redirects '/' to /login when not logged in", () => {
    renderWithRoute("/");
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
  });
 
  test("shows Thank You page if logged in and visiting '/'", () => {
    localStorage.setItem("loggedIn", "true");
    renderWithRoute("/");
    expect(screen.getByText(/thank you/i)).toBeInTheDocument();
  });
 
  test("signup -> redirects to '/' (thank you)", async () => {
    const user = userEvent.setup();
    renderWithRoute("/signup");
 
    await user.type(screen.getByLabelText(/first name/i), "Bhanu");
    await user.type(screen.getByLabelText(/last name/i), "Tester");
    await user.type(screen.getByLabelText(/^email$/i), "test@test.com");
    await user.type(screen.getByLabelText(/^password$/i), "pass123");
    await user.type(screen.getByLabelText(/confirm password/i), "pass123");
 
await user.click(screen.getByRole("button", { name: /sign up/i }));
 
    expect(await screen.findByText(/thank you/i)).toBeInTheDocument();
  });
 
  test("forces any random route to '/' if logged in", () => {
    localStorage.setItem("loggedIn", "true");
    renderWithRoute("/random");
    expect(screen.getByText(/thank you/i)).toBeInTheDocument();
  });
 
  test("logout clears state and redirects to login", async () => {
    const user = userEvent.setup();
    localStorage.setItem("loggedIn", "true");
 
    renderWithRoute("/");
 
await user.click(screen.getByRole("button", { name: /signout/i }));
 
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(localStorage.getItem("loggedIn")).toBeNull();
  });
});