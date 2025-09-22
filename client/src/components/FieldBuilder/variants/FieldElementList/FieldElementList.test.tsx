import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import FieldElementList from "./FieldElementList";
import type { FieldVariantList } from "@customTypes/fieldBuilder.types";

// Mock the UI components
vi.mock("@components/UI", () => ({
  Icon: ({ name, className }: { name: string; className?: string }) => (
    <span data-testid="mock-icon" data-icon-name={name} className={className}>
      Icon Mock
    </span>
  ),
  Button: ({ children, onClick, variant, color, disabled, className }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      data-variant={variant}
      data-color={color}
    >
      {children}
    </button>
  ),
}));

// Mock the orderBy utility
vi.mock("@utils/orderBy", () => ({
  default: (arr: any[], direction: string) => {
    if (direction === "desc") {
      return [...arr].sort((a, b) => b.localeCompare(a));
    }
    return [...arr].sort();
  },
}));

describe("FieldElementList Component", () => {
  const defaultProps: FieldVariantList = {
    name: "choices",
    id: "field-choices",
    value: ["Option 1", "Option 2", "Option 3"],
    type: "list",
  };

  it("renders list with correct number of items", () => {
    const { getByTestId } = render(<FieldElementList {...defaultProps} />);
    const list = getByTestId("field-input");
    const items = list.querySelectorAll("li");

    expect(list).toBeInTheDocument();
    expect(items.length).toBe(3);
  });

  it("renders choices in ascending order by default", () => {
    const props = {
      ...defaultProps,
      value: ["B", "C", "A"],
    };

    const { getByTestId } = render(<FieldElementList {...props} />);
    const list = getByTestId("field-input");
    const items = list.querySelectorAll("li");

    // ordered A, B, C
    expect(items[0]).toHaveTextContent("A");
    expect(items[1]).toHaveTextContent("B");
    expect(items[2]).toHaveTextContent("C");
  });

  it("renders choices in descending order when specified", () => {
    const props = {
      ...defaultProps,
      value: ["B", "C", "A"],
      sort: "desc" as "desc" | "asc",
    };

    const { getByTestId } = render(<FieldElementList {...props} />);
    const list = getByTestId("field-input");
    const items = list.querySelectorAll("li");

    // ordered C, B, A
    expect(items[0]).toHaveTextContent("C");
    expect(items[1]).toHaveTextContent("B");
    expect(items[2]).toHaveTextContent("A");
  });

  it("calls onChange when an item is removed", () => {
    const mockOnChange = vi.fn();
    const { getAllByRole } = render(
      <FieldElementList {...defaultProps} onChange={mockOnChange} />
    );

    const removeButtons = getAllByRole("button");

    fireEvent.click(removeButtons[0]);

    expect(mockOnChange).toHaveBeenCalledWith({
      name: "choices",
      value: ["Option 2", "Option 3"],
    });
  });

  it("truncates long choices with maxLength", () => {
    const props = {
      ...defaultProps,
      value: ["This is a very long option that exceeds the max length"],
      maxLength: 20,
    };

    const { container } = render(<FieldElementList {...props} />);

    const normalPart = container.querySelector(".ChoiceLabel");
    const dangerPart = container.querySelector(".DangerLabel");

    expect(normalPart).not.toBeNull();
    expect(dangerPart).not.toBeNull();

    expect(normalPart?.textContent).toContain("This is a very long");
    expect(dangerPart?.textContent).toContain(
      "option that exceeds the max length"
    );
  });
});
