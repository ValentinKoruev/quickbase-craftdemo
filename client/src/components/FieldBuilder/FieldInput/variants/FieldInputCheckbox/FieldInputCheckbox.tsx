import type { FieldVariantCheckbox } from "@customTypes/fieldBuilder.types";

import styles from "../../FieldInput.module.scss";

const FieldInputCheckbox: React.FC<FieldVariantCheckbox> = ({
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
