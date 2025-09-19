import styles from "../../FieldInput.module.scss";

interface IFieldInputCheckboxProps {
  name: string;
  id: string;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FieldInputCheckbox: React.FC<IFieldInputCheckboxProps> = ({
  name,
  id,
  checked,
  onChange,
}) => {
  return (
    <div className={styles.FieldCheckboxContainer}>
      <input
        id={id}
        name={name}
        type="checkbox"
        className={styles.FieldCheckbox}
        checked={checked}
        readOnly
        onChange={onChange}
      />
      <span className={styles.CheckboxLabel}>A Value is required</span>
    </div>
  );
};

export default FieldInputCheckbox;
