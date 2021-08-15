import { render, screen, cleanup } from "@testing-library/react";
import Profile2 from "../Profile2";
import '@testing-library/jest-dom'

test("should render profile2 component", () => {
  render(<Profile2 />);
  const profile2 = screen.getByTestId("profile2");
  expect(profile2).toBeInTheDocument;
  expect(profile2).toHaveTextContent('sorry not');

});
