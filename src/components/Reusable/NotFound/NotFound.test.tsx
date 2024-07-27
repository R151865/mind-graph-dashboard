import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NotFound from "./NotFound";

describe("<NotFound />", () => {
  test("renders corretly", () => {
    render(<NotFound />);
    expect(screen.getByText("Oops!")).toBeInTheDocument();
    expect(screen.getByText("404 - Page Not Found!")).toBeInTheDocument();
  });
});
