export type FieldVariantText = {
  type: "text";
  name: string;
  id: string;
  value: string;
  placeholder?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export type FieldVariantDropdown = {
  type: "dropdown";
  name: string;
  id: string;
  choices: string[];
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export type FieldVariantCheckbox = {
  type: "checkbox";
  name: string;
  id: string;
  checked: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export type FieldVariantReadOnly = {
  type: "readonly";
  value: string;
};

export type FieldVariantList = {
  type: "list";
  name: string;
  id: string;
  choices: string[];
  onChoiceChange: (newChoices: string[]) => void;
};

export type FieldVariant =
  | FieldVariantText
  | FieldVariantDropdown
  | FieldVariantCheckbox
  | FieldVariantReadOnly
  | FieldVariantList;

export type FieldBuilderData = {
  label: string;
  type: string;
  defaultValue?: string;
  choices?: string[];
  order?: "asc" | "desc";
};
