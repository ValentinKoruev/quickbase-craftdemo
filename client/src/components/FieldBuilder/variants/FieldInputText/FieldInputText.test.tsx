import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import FieldInputText from "./FieldInputText";
import type { FieldVariantText } from "@customTypes/fieldBuilder.types";
import * as cursorUtil from "@utils/cursorUtil";
import * as editableDivUtils from "@utils/editableDivUtils";

// Mock the modules - simpler approach
vi.mock("@utils/cursorUtil");
vi.mock("@utils/editableDivUtils");

// Setup the mocks for each test
beforeEach(() => {
  vi.mocked(cursorUtil.getCursorIndex).mockReturnValue(5);
  vi.mocked(editableDivUtils.createNewTextNode).mockImplementation(() => {});
  vi.mocked(editableDivUtils.appendSpanElement).mockImplementation(() => {});
});

describe("FieldInputText Component", () => {
  const defaultProps: FieldVariantText = {
    name: "textField",
    id: "text-field-id",
    value: "Hello World",
    type: "text",
  };

  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with the correct structure and attributes", () => {
    const { getByTestId } = render(<FieldInputText {...defaultProps} />);

    const inputDiv = getByTestId("field-input");

    expect(inputDiv).toHaveAttribute("id", defaultProps.id);
    expect(inputDiv).toHaveAttribute("contentEditable", "true");
    expect(inputDiv).toHaveAttribute("role", "textbox");
  });

  it("calls onChange with correct parameters when text is changed", () => {
    const { getByTestId } = render(
      <FieldInputText {...defaultProps} onChange={mockOnChange} />
    );

    const inputDiv = getByTestId("field-input");

    const inputEvent = new Event("input", { bubbles: true });
    Object.defineProperty(inputDiv, "textContent", {
      value: "Updated text",
      writable: true,
    });

    fireEvent(inputDiv, inputEvent);

    expect(mockOnChange).toHaveBeenCalledWith({
      name: defaultProps.name,
      value: "Updated text",
    });
  });

  it("respects maxLength prop by calling appropriate formatting functions", () => {
    render(
      <FieldInputText
        {...defaultProps}
        value="This is a very long text"
        maxLength={10}
      />
    );

    expect(editableDivUtils.createNewTextNode).toHaveBeenCalled();
    expect(editableDivUtils.appendSpanElement).toHaveBeenCalled();
  });

  it("sets cursor position on focus", () => {
    const { getByTestId } = render(<FieldInputText {...defaultProps} />);
    const inputDiv = getByTestId("field-input");

    fireEvent.focus(inputDiv);

    expect(cursorUtil.setCursorIndex).toHaveBeenCalled();
  });

  it("applies default maxLength when not provided", () => {
    render(<FieldInputText {...defaultProps} />);

    expect(editableDivUtils.createNewTextNode).toHaveBeenCalled();
  });
});
