import classNames from "classnames";
import styles from "./FieldInput.module.scss";
import { useState } from "react";

type FieldInputVariant =
  | "text"
  | "dropdown"
  | "checkbox"
  | "multi-select"
  | "readonly"
  | "list";

interface IFieldInputProps {
  variant: FieldInputVariant;
  label: string;
  value?: string;
  placeholder?: string;
  choices?: string[];
  required?: boolean;
}

const FieldInput: React.FC<IFieldInputProps> = ({
  variant,
  label,
  placeholder,
  value,
  choices,
  required,
}) => {
  const [choicesList, setChoicesList] = useState<string[]>(choices ?? []);

  return (
    <div className={styles.FieldInputContainer}>
      <label className={styles.InputLabel}>{label}</label>
      {variant === "text" && (
        <input
          type="text"
          className={styles.FieldInput}
          placeholder={placeholder ?? `Enter ${label}...`}
          value={value}
        />
      )}
      {variant === "readonly" && (
        <span className={styles.FieldReadOnly}>
          {value ?? placeholder ?? `${label}`}
        </span>
      )}
      {variant === "list" && (
        <ul className={classNames(styles.FieldInput, styles.FieldList)}>
          {choicesList.map((choice, index) => (
            <li key={`choice-${index}`}>{choice}</li>
          ))}
        </ul>
      )}
      {variant === "dropdown" && (
        <select className={classNames(styles.FieldInput, styles.FieldSelect)}>
          {choicesList.map((choice, index) => (
            <option key={`choice-${index}`} value={choice}>
              {choice}
            </option>
          ))}
        </select>
      )}
      {variant === "checkbox" && (
        <div className={styles.FieldCheckboxContainer}>
          <input
            type="checkbox"
            className={styles.FieldCheckbox}
            checked={required}
            readOnly
          />
          <span className={styles.CheckboxLabel}>A Value is required</span>
        </div>
      )}
    </div>
  );
};

export default FieldInput;
