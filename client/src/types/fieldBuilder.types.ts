import type { IButtonProps } from "@components/UI/Button";

export type FieldVariantText = {
  type: "text";
  name: string;
  id: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  onChange?: ({ name, value }: { name: string; value: string }) => void;
};

export type FieldVariantDropdown = {
  type: "dropdown";
  name: string;
  id: string;
  value: string;
  choices?: string[];
  format?: (value: string) => string;
  onChange?: ({ name, value }: { name: string; value: string }) => void;
};

export type FieldVariantCheckbox = {
  type: "checkbox";
  name: string;
  id: string;
  value: boolean;
  tooltip?: string;
  onChange?: ({ name, value }: { name: string; value: boolean }) => void;
};

export type FieldVariantReadOnly = {
  type: "readonly";
  value: string;
  format?: (value: string) => string;
};

export type FieldVariantList = {
  type: "list";
  name: string;
  id: string;
  value: string[];
  maxLength?: number;
  sort?: "asc" | "desc";
  onChange?: ({ name, value }: { name: string; value: string[] }) => void;
};

export type FieldVariant =
  | FieldVariantText
  | FieldVariantDropdown
  | FieldVariantCheckbox
  | FieldVariantReadOnly
  | FieldVariantList
  | FieldVariantButton;

export type FieldVariantButton = {
  type: "button";
  value: string;
  button: IButtonProps;
};

export type FieldBuilderData = {
  label: string;
  type: string;
  required: boolean;
  default?: string;
  choices?: string[];
  order?: "asc" | "desc";
};

export type FieldValue = string | boolean | string[];
export interface IFieldBuilderInput {
  label: string;
  name: string;
  variant: FieldVariant;
  alias?: string;
  validation?: (value: FieldValue) => string | null;
}
