import type { FieldVariantCheckbox } from "@customTypes/fieldBuilder.types";

import styles from "../../FieldInput.module.scss";

const FieldInputCheckbox: React.FC<FieldVariantCheckbox> = ({
  name,
  id,
  value: checked,
  tooltip,
  onChange = () => {},
}) => {
  return (
    <div data-testid="field-input" className={styles.FieldCheckboxContainer}>
      <input
        id={id}
        name={name}
        type="checkbox"
        className={styles.FieldCheckbox}
        checked={checked}
        readOnly
        onChange={() => onChange({ name, value: !checked })}
      />
      {tooltip && (
        <label htmlFor={id} className={styles.FieldCheckboxLabel}>
          {tooltip}
        </label>
      )}
    </div>
  );
};

export default FieldInputCheckbox;
