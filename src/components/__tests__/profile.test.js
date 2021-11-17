import { render, screen, cleanup } from "@testing-library/react";
import Profile from "../Profile";
import '@testing-library/jest-dom'

test("should render profile component", () => {
  render(<Profile />);
  const profile = screen.getByTestId("profile");
  expect(profile).toBeInTheDocument;
  expect(profile).toHaveTextContent('Welcome');
  expect(profile).toHaveTextContent('Dashboard');

});
