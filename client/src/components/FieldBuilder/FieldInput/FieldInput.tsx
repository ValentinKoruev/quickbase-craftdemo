import styles from "./FieldInput.module.scss";

type FieldInputVariant =
  | "text"
  | "dropdown"
  | "checkbox"
  | "radio"
  | "multi-select"
  | "readonly-text"
  | "list";

interface IFieldInputProps {
  variant: FieldInputVariant;
  label: string;
  placeholder?: string;
  choices?: string[];
}

const FieldInput: React.FC<IFieldInputProps> = ({
  variant,
  label,
  placeholder,
}) => {
  return (
    <div className={styles.FieldInputContainer}>
      <label className={styles.InputLabel}>{label}</label>
      {variant === "text" && (
        <input
          type="text"
          className={styles.FieldInput}
          placeholder={placeholder ?? `Enter ${label}`}
        />
      )}
      {variant === "readonly-text" && (
        <input
          type="text"
          className={styles.FieldInput}
          placeholder={placeholder ?? `Enter ${label}`}
          readOnly
        />
      )}
      {variant === "list" && (
        <div className={styles.ListPlaceholder}>
          <p>List Placeholder</p>
        </div>
      )}
      {/* Add other variants as needed */}
    </div>
  );
};

export default FieldInput;
