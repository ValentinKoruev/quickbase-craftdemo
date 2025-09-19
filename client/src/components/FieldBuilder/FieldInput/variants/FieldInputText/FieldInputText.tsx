import type { FieldVariantText } from "@customTypes/fieldBuilder.types";
import styles from "../../FieldInput.module.scss";

const FieldInputText = ({
  name,
  id,
  value,
  placeholder = "",
  onChange,
}: FieldVariantText) => {
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
