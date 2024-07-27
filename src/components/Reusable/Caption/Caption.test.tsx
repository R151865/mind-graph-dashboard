import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for additional matchers like .toBeInTheDocument
import Caption from "./Caption";

// Mock CSS module
jest.mock("./Caption.module.css", () => ({
  head: "mockHeadClass",
}));

describe("<Caption/> ", () => {
  test("renders text correctly", () => {
    const text = "text1";

    render(<Caption text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  test("testing correct CSS class", () => {
    const text = "Test Caption";

    render(<Caption text={text} />);

    const headingElement = screen.getByText(text);
    expect(headingElement).toHaveClass("mockHeadClass");
  });
});
