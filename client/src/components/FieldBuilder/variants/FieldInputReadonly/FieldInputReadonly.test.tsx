import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import FieldInputReadonly from "./FieldInputReadonly";
import type { FieldVariantReadOnly } from "@customTypes/fieldBuilder.types";

describe("FieldInputReadonly Component", () => {
  const defaultProps: FieldVariantReadOnly = {
    value: "Read only value",
    type: "readonly",
  };

  it("renders with the correct value", () => {
    const { getByTestId } = render(<FieldInputReadonly {...defaultProps} />);
    const readonlyField = getByTestId("field-input");

    expect(readonlyField).toBeInTheDocument();
    expect(readonlyField).toHaveTextContent("Read only value");
  });

  it("applies the correct CSS class", () => {
    const { getByTestId } = render(<FieldInputReadonly {...defaultProps} />);
    const readonlyField = getByTestId("field-input");

    expect(readonlyField.className).toContain("FieldReadOnly");
  });
});
