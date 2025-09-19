import type { FieldVariant } from "@customTypes/fieldBuilder.types";
import {
  FieldInputText,
  FieldInputReadonly,
  FieldInputCheckbox,
  FieldInputDropdown,
  FieldInputList,
} from "./variants";

import styles from "./FieldInput.module.scss";

type FieldInputProps = {
  label: string;
  variant: FieldVariant;
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
      <label
        className={styles.InputLabel}
        htmlFor={variant.type !== "readonly" ? variant.id : undefined}
      >
        {label}
      </label>
      {renderFieldVariant()}
    </div>
  );
};

export default FieldInput;
