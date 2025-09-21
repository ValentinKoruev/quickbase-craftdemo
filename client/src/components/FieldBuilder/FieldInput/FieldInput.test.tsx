import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import FieldInput from "./FieldInput";
import type {
  FieldVariantText,
  FieldVariantReadOnly,
  FieldVariantDropdown,
  FieldVariantCheckbox,
  FieldVariantList,
  FieldVariantButton,
} from "@customTypes/fieldBuilder.types";

vi.mock("./variants/FieldInputText", () => ({
  default: (props: any) => (
    <div data-testid="field-input-text" data-props={JSON.stringify(props)}>
      Text Input
    </div>
  ),
}));

vi.mock("./variants/FieldInputReadonly", () => ({
  default: (props: any) => (
    <div data-testid="field-input-readonly" data-props={JSON.stringify(props)}>
      Readonly Input
    </div>
  ),
}));

vi.mock("./variants/FieldInputDropdown", () => ({
  default: (props: any) => (
    <div data-testid="field-input-dropdown" data-props={JSON.stringify(props)}>
      Dropdown Input
    </div>
  ),
}));

vi.mock("./variants/FieldInputCheckbox", () => ({
  default: (props: any) => (
    <div data-testid="field-input-checkbox" data-props={JSON.stringify(props)}>
      Checkbox Input
    </div>
  ),
}));

vi.mock("./variants/FieldInputList", () => ({
  default: (props: any) => (
    <div data-testid="field-input-list" data-props={JSON.stringify(props)}>
      List Input
    </div>
  ),
}));

vi.mock("./variants/FieldInputButton", () => ({
  default: (props: any) => (
    <div data-testid="field-input-button" data-props={JSON.stringify(props)}>
      Button Input
    </div>
  ),
}));

describe("FieldInput Component", () => {
  it("renders text variant", () => {
    const textVariant: FieldVariantText = {
      type: "text",
      name: "textField",
      id: "text-field",
      value: "text value",
      onChange: vi.fn(),
    };

    const { getByTestId } = render(
      <FieldInput label="Text Label" variant={textVariant} />
    );

    const textInput = getByTestId("field-input-text");
    expect(textInput).toBeInTheDocument();

    const passedProps = JSON.parse(
      textInput.getAttribute("data-props") || "{}"
    );
    const { onChange, ...expectedProps } = textVariant;
    expect(passedProps).toMatchObject(expectedProps);
  });

  it("renders readonly variant", () => {
    const readonlyVariant: FieldVariantReadOnly = {
      type: "readonly",
      value: "readonly value",
    };

    const { getByTestId } = render(
      <FieldInput label="Readonly Label" variant={readonlyVariant} />
    );

    const readonlyInput = getByTestId("field-input-readonly");
    expect(readonlyInput).toBeInTheDocument();

    // Verify all props are passed through
    const passedProps = JSON.parse(
      readonlyInput.getAttribute("data-props") || "{}"
    );
    expect(passedProps).toMatchObject(readonlyVariant);
  });

  it("renders dropdown variant", () => {
    const dropdownVariant: FieldVariantDropdown = {
      type: "dropdown",
      name: "dropdownField",
      id: "dropdown-field",
      value: "dropdown value",
      choices: ["Option 1", "Option 2"],
      onChange: vi.fn(),
    };

    const { getByTestId } = render(
      <FieldInput label="Dropdown Label" variant={dropdownVariant} />
    );

    const dropdownInput = getByTestId("field-input-dropdown");
    expect(dropdownInput).toBeInTheDocument();

    const passedProps = JSON.parse(
      dropdownInput.getAttribute("data-props") || "{}"
    );

    const { onChange, ...expectedProps } = dropdownVariant;
    expect(passedProps).toMatchObject(expectedProps);
  });

  it("renders checkbox variant", () => {
    const checkboxVariant: FieldVariantCheckbox = {
      type: "checkbox",
      name: "checkboxField",
      id: "checkbox-field",
      value: true,
      onChange: vi.fn(),
    };

    const { getByTestId } = render(
      <FieldInput label="Checkbox Label" variant={checkboxVariant} />
    );

    const checkboxInput = getByTestId("field-input-checkbox");
    expect(checkboxInput).toBeInTheDocument();

    const passedProps = JSON.parse(
      checkboxInput.getAttribute("data-props") || "{}"
    );

    const { onChange, ...expectedProps } = checkboxVariant;
    expect(passedProps).toMatchObject(expectedProps);
  });

  it("renders list variant", () => {
    const listVariant: FieldVariantList = {
      type: "list",
      name: "listField",
      id: "list-field",
      value: ["Item 1", "Item 2"],
      onChange: vi.fn(),
    };

    const { getByTestId } = render(
      <FieldInput label="List Label" variant={listVariant} />
    );

    const listInput = getByTestId("field-input-list");
    expect(listInput).toBeInTheDocument();

    const passedProps = JSON.parse(
      listInput.getAttribute("data-props") || "{}"
    );

    const { onChange, ...expectedProps } = listVariant;
    expect(passedProps).toMatchObject(expectedProps);
  });

  // Button variant
  it("renders button variant", () => {
    const buttonVariant: FieldVariantButton = {
      type: "button",
      value: "button value",
      button: {
        variant: "primary",
        color: "primary",
        label: "Click Me",
      },
    };

    const { getByTestId } = render(
      <FieldInput label="Button Label" variant={buttonVariant} />
    );

    const buttonInput = getByTestId("field-input-button");
    expect(buttonInput).toBeInTheDocument();

    const passedProps = JSON.parse(
      buttonInput.getAttribute("data-props") || "{}"
    );
    expect(passedProps).toMatchObject(buttonVariant);
  });

  it("correctly renders the label for each variant", () => {
    const { getByText, rerender } = render(
      <FieldInput
        label="Text Field Label"
        variant={{
          type: "text",
          name: "textField",
          id: "text-field",
          value: "text value",
        }}
      />
    );

    expect(getByText("Text Field Label")).toBeInTheDocument();

    rerender(
      <FieldInput
        label="Dropdown Label"
        variant={{
          type: "dropdown",
          name: "dropdownField",
          id: "dropdown-field",
          value: "dropdown value",
          choices: ["Option 1", "Option 2"],
        }}
      />
    );

    expect(getByText("Dropdown Label")).toBeInTheDocument();
  });

  it("adds htmlFor attribute to label for interactive variants", () => {
    const { container } = render(
      <FieldInput
        label="Text Label"
        variant={{
          type: "text",
          name: "textField",
          id: "text-field-id",
          value: "text value",
        }}
      />
    );

    const label = container.querySelector("label");
    expect(label).toHaveAttribute("for", "text-field-id");
  });

  it("does not add htmlFor attribute to label for readonly variant", () => {
    const { container } = render(
      <FieldInput
        label="Readonly Label"
        variant={{
          type: "readonly",
          value: "readonly value",
        }}
      />
    );

    const label = container.querySelector("label");
    expect(label).not.toHaveAttribute("for");
  });

  it("does not add htmlFor attribute to label for button variant", () => {
    const { container } = render(
      <FieldInput
        label="Button Label"
        variant={{
          type: "button",
          value: "button value",
          button: {
            variant: "primary",
            color: "primary",
            label: "Click Me",
          },
        }}
      />
    );

    const label = container.querySelector("label");
    expect(label).not.toHaveAttribute("for");
  });
});
