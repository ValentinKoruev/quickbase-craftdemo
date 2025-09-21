import type {
  FieldVariant,
  IFieldBuilderInput,
  FieldVariantText,
  FieldVariantDropdown,
  FieldVariantCheckbox,
  FieldVariantReadOnly,
  FieldVariantList,
  FieldVariantButton,
  FieldValue,
} from "@customTypes/fieldBuilder.types";

/**
 * Generic type guard to check if an object is of a specific variant type
 * @param variant The field variant to check
 * @param type The type to check against
 */
export const isVariantType = <T extends FieldVariant["type"]>(
  variant: FieldVariant,
  type: T
): variant is Extract<FieldVariant, { type: T }> => {
  return variant.type === type;
};

/**
 * Type mapping for field variant types to their respective FieldVariant types
 */
type VariantTypeMap = {
  text: FieldVariantText;
  dropdown: FieldVariantDropdown;
  checkbox: FieldVariantCheckbox;
  readonly: FieldVariantReadOnly;
  list: FieldVariantList;
  button: FieldVariantButton;
};

/**
 * Creates a field variant based on the specified type and options
 * @param type The type of field variant to create
 * @param options Options for the field variant
 * @returns A field variant of the specified type
 */
export function createFieldVariant<T extends keyof VariantTypeMap>(
  type: T,
  options: Omit<VariantTypeMap[T], "type">
): VariantTypeMap[T] {
  return {
    type,
    ...options,
  } as VariantTypeMap[T];
}

/**
 * Generates a complete IFieldBuilderInput object based on variant type
 * @param label The label for the field
 * @param name The name identifier for the field
 * @param variant The field variant object
 * @param options Additional options for the field
 * @returns A complete IFieldBuilderInput object
 */
export function generateField<T extends FieldVariant>(
  label: string,
  name: string,
  variant: T,
  options: Partial<Omit<IFieldBuilderInput, "label" | "name" | "variant">> = {}
): IFieldBuilderInput {
  return {
    label,
    name,
    variant,
    ...options,
  };
}

/**
 * Helper function to quickly create a text field
 * @param label The label for the field
 * @param name The name identifier for the field
 * @param value The initial value of the field
 * @param options Additional options for the text field
 * @param validation Optional validation function
 * @returns A complete IFieldBuilderInput object with a text variant
 */
export function createTextField(
  label: string,
  name: string,
  value: string = "",
  options: Partial<
    Omit<FieldVariantText, "type" | "name" | "value" | "id">
  > = {},
  validation?: (value: FieldValue) => string | null
): IFieldBuilderInput {
  const variant = createFieldVariant("text", {
    name,
    id: name,
    value,
    ...options,
  });

  return generateField(label, name, variant, { validation });
}

/**
 * Helper function to quickly create a dropdown field
 * @param label The label for the field
 * @param name The name identifier for the field
 * @param value The initial value of the field
 * @param choices Available choices for the dropdown
 * @param options Additional options for the dropdown field
 * @param validation Optional validation function
 * @returns A complete IFieldBuilderInput object with a dropdown variant
 */
export function createDropdownField(
  label: string,
  name: string,
  value: string = "",
  choices: string[] = [],
  options: Partial<
    Omit<FieldVariantDropdown, "type" | "name" | "value" | "id" | "choices">
  > = {},
  validation?: (value: FieldValue) => string | null
): IFieldBuilderInput {
  const variant = createFieldVariant("dropdown", {
    name,
    id: name,
    value,
    choices,
    ...options,
  });

  return generateField(label, name, variant, { validation });
}

/**
 * Helper function to quickly create a checkbox field
 * @param label The label for the field
 * @param name The name identifier for the field
 * @param value The initial value of the field
 * @param options Additional options for the checkbox field
 * @param validation Optional validation function
 * @returns A complete IFieldBuilderInput object with a checkbox variant
 */
export function createCheckboxField(
  label: string,
  name: string,
  value: boolean = false,
  options: Partial<
    Omit<FieldVariantCheckbox, "type" | "name" | "value" | "id">
  > = {},
  validation?: (value: FieldValue) => string | null
): IFieldBuilderInput {
  const variant = createFieldVariant("checkbox", {
    name,
    id: name,
    value,
    ...options,
  });

  return generateField(label, name, variant, { validation });
}

/**
 * Helper function to quickly create a readonly field
 * @param label The label for the field
 * @param name The name identifier for the field
 * @param value The value to display
 * @param options Additional options for the readonly field
 * @param validation Optional validation function (rarely needed for readonly fields)
 * @returns A complete IFieldBuilderInput object with a readonly variant
 */
export function createReadonlyField(
  label: string,
  name: string,
  value: string,
  options: Partial<Omit<FieldVariantReadOnly, "type" | "value">> = {},
  validation?: (value: FieldValue) => string | null
): IFieldBuilderInput {
  const variant = createFieldVariant("readonly", {
    value,
    ...options,
  });

  return generateField(label, name, variant, { validation });
}

/**
 * Helper function to quickly create a list field
 * @param label The label for the field
 * @param name The name identifier for the field
 * @param value The initial list values
 * @param options Additional options for the list field
 * @param validation Optional validation function
 * @returns A complete IFieldBuilderInput object with a list variant
 */
export function createListField(
  label: string,
  name: string,
  value: string[] = [],
  options: Partial<
    Omit<FieldVariantList, "type" | "name" | "value" | "id">
  > = {},
  validation?: (value: FieldValue) => string | null
): IFieldBuilderInput {
  const variant = createFieldVariant("list", {
    name,
    id: name,
    value,
    ...options,
  });

  return generateField(label, name, variant, { validation });
}

/**
 * Helper function to quickly create a button field
 * @param label The label for the field
 * @param name The name identifier for the field
 * @param value The button text
 * @param buttonProps The button props
 * @param validation Optional validation function
 * @returns A complete IFieldBuilderInput object with a button variant
 */
export function createButtonField(
  label: string,
  name: string,
  value: string,
  buttonProps: Omit<FieldVariantButton["button"], "children">,
  validation?: (value: FieldValue) => string | null
): IFieldBuilderInput {
  const variant = createFieldVariant("button", {
    value,
    button: buttonProps,
  });

  return generateField(label, name, variant, { validation });
}

/**
 * Factory function to create a field based on the specified type
 * @param type The field type to create
 * @param label The label for the field
 * @param name The name identifier for the field
 * @param config Additional configuration based on field type
 * @returns A complete IFieldBuilderInput object for the specified field type
 */
export function createField(
  type: keyof VariantTypeMap,
  label: string,
  name: string,
  config: Record<string, any> = {}
): IFieldBuilderInput {
  const { validation, ...restConfig } = config;

  switch (type) {
    case "text":
      return createTextField(
        label,
        name,
        (restConfig.value as string) || "",
        restConfig,
        validation
      );

    case "dropdown":
      return createDropdownField(
        label,
        name,
        (restConfig.value as string) || "",
        restConfig.choices || [],
        restConfig,
        validation
      );

    case "checkbox":
      return createCheckboxField(
        label,
        name,
        (restConfig.value as boolean) || false,
        restConfig,
        validation
      );

    case "readonly":
      return createReadonlyField(
        label,
        name,
        (restConfig.value as string) || "",
        restConfig,
        validation
      );

    case "list":
      return createListField(
        label,
        name,
        (restConfig.value as string[]) || [],
        restConfig,
        validation
      );

    case "button":
      if (!restConfig.button) {
        throw new Error("Button props are required for button field type");
      }
      return createButtonField(
        label,
        name,
        (restConfig.value as string) || "",
        restConfig.button,
        validation
      );

    default:
      throw new Error(`Unsupported field type: ${type}`);
  }
}
