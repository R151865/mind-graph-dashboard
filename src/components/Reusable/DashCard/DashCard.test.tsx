import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import DashCard from "./DashCard";

// Mock CSS module
jest.mock("./DashCard.module.css", () => ({
  dashCard: "mockDashCardClass",
  dashCardText: "mockDashCardTextClass",
}));

describe("<DashCard />", () => {
  test("renders correctly", () => {
    const text = "Text";
    const link = "/link";
    const isActive = false;
    const icon = <span data-testid="icon">🔍</span>;

    render(
      <MemoryRouter>
        <DashCard link={link} text={text} icon={icon} isActive={isActive} />
      </MemoryRouter>
    );

    // Assert text
    expect(screen.getByText(text)).toBeInTheDocument();

    // Assert icon
    expect(screen.getByTestId("icon")).toBeInTheDocument();

    // Assert link
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", link);
  });

  test("applies the correct CSS classes", () => {
    const text = "Text";
    const link = "/link-example";
    const isActive = false;
    const icon = <span data-testid="icon">🔍</span>;

    render(
      <MemoryRouter>
        <DashCard link={link} text={text} icon={icon} isActive={isActive} />
      </MemoryRouter>
    );

    // Assert that the correct CSS classes are applied
    expect(screen.getByText(text)).toHaveClass("mockDashCardTextClass");
    expect(screen.getByTestId("icon").parentElement).toHaveClass(
      "mockDashCardClass"
    );
  });
});
