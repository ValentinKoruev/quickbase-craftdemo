import classNames from "classnames";
import { Icon } from "@components/UI";

import styles from "./FieldInput.module.scss";
import {
  FieldInputText,
  FieldInputReadonly,
  FieldInputCheckbox,
  FieldInputDropdown,
  FieldInputList,
} from "./variants";

// TODO: Extract to types file, reuse in field input components
type FieldVariantText = {
  type: "text";
  name: string;
  id: string;
  value: string;
  placeholder?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

type FieldVariantDropdown = {
  type: "dropdown";
  name: string;
  id: string;
  choices: string[];
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

type FieldVariantCheckbox = {
  type: "checkbox";
  name: string;
  id: string;
  checked: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

type FieldVariantReadOnly = {
  type: "readonly";
  value: string;
};

type FieldVariantList = {
  type: "list";
  name: string;
  id: string;
  choices: string[];
  onChoiceChange: (newChoices: string[]) => void;
};

type FieldInputProps = {
  label: string;
  variant:
    | FieldVariantText
    | FieldVariantDropdown
    | FieldVariantCheckbox
    | FieldVariantReadOnly
    | FieldVariantList;
};

const FieldInput: React.FC<FieldInputProps> = ({ variant, label }) => {
  const renderFieldVariant = () => {
    switch (variant.type) {
      case "text":
        return <FieldInputText {...variant} />;
      case "readonly":
        return <FieldInputReadonly {...variant} />;
      case "dropdown":
        return <FieldInputDropdown {...variant} />;
      case "checkbox":
        return <FieldInputCheckbox {...variant} />;
      case "list":
        return <FieldInputList {...variant} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.FieldInputContainer}>
      <label className={styles.InputLabel}>{label}</label>
      {renderFieldVariant()}
    </div>
  );
};

export default FieldInput;
