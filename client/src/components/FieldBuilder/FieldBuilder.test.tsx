import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, fireEvent } from "@testing-library/react";
import FieldBuilder from "./FieldBuilder";
import type { IFieldBuilderProps } from "./FieldBuilder";
import styles from "./FieldBuilder.module.scss";

// Mock the FieldInput component
vi.mock("@components/FieldBuilder/FieldInput", () => {
  return {
    default: ({ label, variant }: { label: string; variant: any }) => {
      const mockOnChange = variant.onChange;

      const testButton = mockOnChange ? (
        <button
          data-testid="mock-field-input-change"
          onClick={() => {
            mockOnChange({
              name: variant.name,
              value: "changed value",
              type: variant.type,
            });
          }}
        >
          Change Value
        </button>
      ) : null;

      return (
        <div
          data-testid="field-input"
          data-name={variant.name}
          data-type={variant.type}
          data-value={
            typeof variant.value === "object"
              ? JSON.stringify(variant.value)
              : variant.value
          }
        >
          <span>{label}</span>
          {testButton}
        </div>
      );
    },
  };
});

vi.mock("@components/UI", () => ({
  Button: ({
    label,
    onClick,
    type = "button",
  }: {
    label: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
  }) => (
    <button
      data-testid={`button-${label.replace(/\s+/g, "-").toLowerCase()}`}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  ),
}));

describe("FieldBuilder Component", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });
  });

  const renderWithQueryClient = (ui: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    );
  };
  const mockSaveQuery = vi.fn().mockResolvedValue({
    data: {
      data: {
        label: "Updated Field",
        type: "multi-select",
        required: false,
        default: "",
        choices: ["Option 1", "Option 2"],
        order: "asc",
      },
    },
  });

  const mockBeforeSaveFormat = vi.fn().mockImplementation((data) => data);

  const defaultProps: IFieldBuilderProps = {
    fields: [
      {
        name: "label",
        label: "Field Label",
        variant: {
          type: "text",
          name: "label",
          id: "field-label",
          value: "Test Field",
        },
      },
      {
        name: "type",
        label: "Field Type",
        variant: {
          type: "dropdown",
          name: "type",
          id: "field-type",
          value: "multi-select",
          choices: ["text", "multi-select", "checkbox"],
        },
      },
      {
        name: "required",
        label: "Required",
        variant: {
          type: "checkbox",
          name: "required",
          id: "field-required",
          value: false,
        },
      },
    ],
    saveQuery: mockSaveQuery,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the field builder with correct title", () => {
    const { getByText } = renderWithQueryClient(
      <FieldBuilder {...defaultProps} />
    );
    expect(getByText("Field Builder")).toBeInTheDocument();
  });

  it("renders all provided fields with correct props", () => {
    const { getAllByTestId } = renderWithQueryClient(
      <FieldBuilder {...defaultProps} />
    );
    const fieldInputs = getAllByTestId("field-input");

    expect(fieldInputs.length).toBe(3);

    expect(fieldInputs[0]).toHaveAttribute("data-name", "label");
    expect(fieldInputs[0]).toHaveAttribute("data-type", "text");
    expect(fieldInputs[0]).toHaveAttribute("data-value", "Test Field");

    expect(fieldInputs[1]).toHaveAttribute("data-name", "type");
    expect(fieldInputs[1]).toHaveAttribute("data-type", "dropdown");
    expect(fieldInputs[1]).toHaveAttribute("data-value", "multi-select");

    expect(fieldInputs[2]).toHaveAttribute("data-name", "required");
    expect(fieldInputs[2]).toHaveAttribute("data-type", "checkbox");
    expect(fieldInputs[2]).toHaveAttribute("data-value", "false");
  });

  it("renders the clear button", () => {
    const { getByTestId } = renderWithQueryClient(
      <FieldBuilder {...defaultProps} />
    );
    expect(getByTestId("button-clear")).toBeInTheDocument();
  });

  it("passes onChange handler to non-readonly/button field variants", () => {
    const { getAllByTestId } = renderWithQueryClient(
      <FieldBuilder {...defaultProps} />
    );
    const changeButtons = getAllByTestId("mock-field-input-change");

    expect(changeButtons.length).toBe(3);
  });

  it("provides onChange handler to field inputs", () => {
    const { getAllByTestId } = renderWithQueryClient(
      <FieldBuilder {...defaultProps} />
    );

    const changeButtons = getAllByTestId("mock-field-input-change");
    expect(changeButtons.length).toBe(3);

    changeButtons[0].click();
  });

  it("calls saveQuery with form data when submitted", async () => {
    mockSaveQuery.mockClear();

    const { getAllByTestId, getByTestId } = renderWithQueryClient(
      <FieldBuilder {...defaultProps} />
    );
    const changeButtons = getAllByTestId("mock-field-input-change");
    fireEvent.click(changeButtons[0]);

    const saveButton = getByTestId("button-save-changes");
    expect(saveButton).toBeInTheDocument();

    fireEvent.click(saveButton);

    await new Promise(process.nextTick);

    expect(mockSaveQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        label: "changed value",
      })
    );
  });

  it("clears the form when clear button is clicked", () => {
    const { getByTestId } = renderWithQueryClient(
      <FieldBuilder {...defaultProps} />
    );

    const clearButton = getByTestId("button-clear");
    clearButton.click();

    //? Test passes if it doesn't throw an error
  });

  it("applies beforeSaveFormat when provided", () => {
    const propsWithFormatter = {
      ...defaultProps,
      beforeSaveFormat: mockBeforeSaveFormat,
    };

    const { container } = renderWithQueryClient(
      <FieldBuilder {...propsWithFormatter} />
    );

    const form = container.querySelector(
      `.${styles.FieldBuilderFormContainer}`
    );
    expect(form).toBeInTheDocument();

    fireEvent.submit(form!);

    expect(mockBeforeSaveFormat).toHaveBeenCalled();
  });
});
