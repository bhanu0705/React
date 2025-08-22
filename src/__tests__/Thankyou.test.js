import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Thankyou from "../Thankyou";
 
test("renders thank you message", () => {
  render(
    <MemoryRouter>
      <Thankyou handleLogout={() => {}} />
    </MemoryRouter>
  );
 
  expect(screen.getByText(/thank you/i)).toBeInTheDocument();
});
 
test("calls handleLogout on signout", async () => {
  const user = userEvent.setup();
  const mockLogout = jest.fn();
 
  render(
    <MemoryRouter>
      <Thankyou handleLogout={mockLogout} />
    </MemoryRouter>
  );
 
await user.click(screen.getByRole("button", { name: /signout/i }));
  expect(mockLogout).toHaveBeenCalled();
});