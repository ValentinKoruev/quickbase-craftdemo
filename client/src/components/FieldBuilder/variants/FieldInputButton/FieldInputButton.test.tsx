import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import FieldElementButton from "./FieldnputButton";
import type { FieldVariantButton } from "@customTypes/fieldBuilder.types";

// Mock the Button component
vi.mock("@components/UI", () => ({
  Button: (props: any) => (
    <button
      data-testid="mock-button"
      data-label={props.label}
      data-variant={props.variant}
      data-color={props.color}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  ),
}));

describe("FieldInputButton Component", () => {
  const mockOnClick = vi.fn();

  const defaultProps: FieldVariantButton = {
    type: "button",
    value: "button-value",
    button: {
      label: "Click Me",
      variant: "primary",
      color: "primary",
      onClick: mockOnClick,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the button with correct props", () => {
    const { getByTestId } = render(<FieldElementButton {...defaultProps} />);
    const button = getByTestId("mock-button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("data-label", "Click Me");
    expect(button).toHaveAttribute("data-variant", "primary");
    expect(button).toHaveAttribute("data-color", "primary");
  });

  it("passes onClick handler to Button component", () => {
    const { getByTestId } = render(<FieldElementButton {...defaultProps} />);
    const button = getByTestId("mock-button");

    button.click();

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("applies correct wrapper class", () => {
    const { container } = render(<FieldElementButton {...defaultProps} />);
    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass("FieldInputButton");
  });
});
