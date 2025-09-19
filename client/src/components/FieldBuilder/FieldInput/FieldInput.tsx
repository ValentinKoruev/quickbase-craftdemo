import classNames from "classnames";
import { Icon } from "@components/UI";

import styles from "./FieldInput.module.scss";

// TODO: extract variants to individual components
type FieldInputVariant =
  | "text"
  | "dropdown"
  | "checkbox"
  | "multi-select"
  | "readonly"
  | "list";

interface IFieldInputProps {
  name: string;
  id: string;
  variant: FieldInputVariant;
  label: string;
  value?: string;
  placeholder?: string;
  choices?: string[];
  required?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onChoiceChange?: (newChoices: string[]) => void;
}

const FieldInput: React.FC<IFieldInputProps> = ({
  id,
  name,
  variant,
  label,
  placeholder,
  value,
  choices,
  required,
  onChange,
  onChoiceChange,
}) => {
  const handleRemoveChoice = (index: number) => {
    if (choices === undefined) return;
    const newChoices = choices.filter((_, i) => i !== index);
    onChoiceChange?.(newChoices);
  };
  return (
    <div className={styles.FieldInputContainer}>
      <label className={styles.InputLabel}>{label}</label>
      {variant === "text" && (
        <input
          id={id}
          name={name}
          type="text"
          className={styles.FieldInput}
          placeholder={placeholder ?? `Enter ${label}...`}
          value={value}
          onChange={onChange}
        />
      )}
      {variant === "readonly" && (
        <span className={styles.FieldReadOnly}>
          {value ?? placeholder ?? `${label}`}
        </span>
      )}
      {variant === "list" && (
        <ul className={classNames(styles.FieldInput, styles.FieldList)}>
          {choices?.map((choice, index) => (
            <li key={`choice-${index}`}>
              <span className={styles.ChoiceLabel}>{choice}</span>
              <button
                onClick={() => handleRemoveChoice(index)}
                type="button"
                className={styles.ChoiceRemoveButton}
              >
                <Icon name="x-mark" className={styles.ChoiceIcon} />
              </button>
            </li>
          ))}
        </ul>
      )}
      {variant === "dropdown" && (
        <select
          id={id}
          name={name}
          onChange={onChange}
          className={classNames(styles.FieldInput, styles.FieldSelect)}
        >
          {choices?.map((choice, index) => (
            <option key={`choice-${index}`} value={choice}>
              {choice}
            </option>
          ))}
        </select>
      )}
      {variant === "checkbox" && (
        <div className={styles.FieldCheckboxContainer}>
          <input
            id={id}
            name={name}
            type="checkbox"
            className={styles.FieldCheckbox}
            checked={required}
            readOnly
            onChange={onChange}
          />
          <span className={styles.CheckboxLabel}>A Value is required</span>
        </div>
      )}
    </div>
  );
};

export default FieldInput;
