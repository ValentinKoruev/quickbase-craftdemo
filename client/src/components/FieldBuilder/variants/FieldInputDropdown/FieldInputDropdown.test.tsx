import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import FieldInputDropdown from "./FieldInputDropdown";
import type { FieldVariantDropdown } from "@customTypes/fieldBuilder.types";

describe("FieldInputDropdown Component", () => {
  const defaultProps: FieldVariantDropdown = {
    name: "type",
    id: "field-type",
    value: "multi-select",
    type: "dropdown",
    choices: ["text", "multi-select", "checkbox"],
  };

  it("renders dropdown with correct attributes", () => {
    const { getByTestId } = render(<FieldInputDropdown {...defaultProps} />);
    const dropdown = getByTestId("field-input");

    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveAttribute("name", "type");
    expect(dropdown).toHaveAttribute("id", "field-type");
    expect(dropdown).toHaveValue("multi-select");
  });

  it("renders all choices as options", () => {
    const { container } = render(<FieldInputDropdown {...defaultProps} />);
    const options = container.querySelectorAll("option");

    expect(options.length).toBe(3);
    expect(options[0]).toHaveTextContent("text");
    expect(options[1]).toHaveTextContent("multi-select");
    expect(options[2]).toHaveTextContent("checkbox");
  });

  it("calls onChange when selection changes", () => {
    const mockOnChange = vi.fn();
    const { getByTestId } = render(
      <FieldInputDropdown {...defaultProps} onChange={mockOnChange} />
    );

    const dropdown = getByTestId("field-input") as HTMLSelectElement;
    fireEvent.change(dropdown, { target: { value: "checkbox" } });

    expect(mockOnChange).toHaveBeenCalledWith({
      name: "type",
      value: "checkbox",
    });
  });

  it("applies correct CSS classes", () => {
    const { getByTestId } = render(<FieldInputDropdown {...defaultProps} />);
    const dropdown = getByTestId("field-input");

    expect(dropdown.className).toContain("FieldInput");
    expect(dropdown.className).toContain("FieldSelect");
  });
});
