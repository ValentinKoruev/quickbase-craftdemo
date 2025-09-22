import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import FieldElementCheckbox from "./FieldElementCheckbox";

describe("FieldElementCheckbox Component", () => {
  const defaultProps = {
    name: "required",
    id: "field-required",
    value: false,
    type: "checkbox" as const,
  };

  it("renders checkbox with correct attributes", () => {
    const { container } = render(<FieldElementCheckbox {...defaultProps} />);
    const checkbox = container.querySelector('input[type="checkbox"]');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("name", "required");
    expect(checkbox).toHaveAttribute("id", "field-required");
    expect(checkbox).not.toBeChecked();
  });

  it("shows the checkbox input", () => {
    const { container } = render(<FieldElementCheckbox {...defaultProps} />);
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
  });

  it("renders checkbox as checked when value is true", () => {
    const { container } = render(
      <FieldElementCheckbox {...defaultProps} value={true} />
    );
    const checkbox = container.querySelector('input[type="checkbox"]');

    expect(checkbox).toBeChecked();
  });

  it("calls onChange with toggled value when clicked", () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <FieldElementCheckbox {...defaultProps} onChange={mockOnChange} />
    );

    const checkbox = container.querySelector('input[type="checkbox"]');

    fireEvent.click(checkbox!);

    expect(mockOnChange).toHaveBeenCalledWith({
      name: "required",
      value: true,
    });
  });

  it("toggles from true to false when clicked", () => {
    const mockOnChange = vi.fn();
    const { container } = render(
      <FieldElementCheckbox
        {...defaultProps}
        value={true}
        onChange={mockOnChange}
      />
    );

    const checkbox = container.querySelector('input[type="checkbox"]');

    fireEvent.click(checkbox!);

    expect(mockOnChange).toHaveBeenCalledWith({
      name: "required",
      value: false,
    });
  });

  it("has appropriate CSS classes", () => {
    const { container } = render(<FieldElementCheckbox {...defaultProps} />);

    const checkboxContainer = container.firstChild;
    const checkbox = container.querySelector('input[type="checkbox"]');

    expect(checkboxContainer).toHaveClass("FieldCheckboxContainer");
    expect(checkbox).toHaveClass("FieldCheckbox");
  });
});
