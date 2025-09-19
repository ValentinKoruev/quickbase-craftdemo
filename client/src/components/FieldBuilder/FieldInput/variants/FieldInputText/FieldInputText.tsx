import styles from "../../FieldInput.module.scss";

interface IFieldInputTextProps {
  name: string;
  id: string;
  value: string;
  placeholder?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const FieldInputText = ({
  name,
  id,
  value,
  placeholder = "",
  onChange,
}: IFieldInputTextProps) => {
  return (
    <input
      id={id}
      name={name}
      type="text"
      className={styles.FieldInput}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default FieldInputText;
