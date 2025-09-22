import type { FieldVariantReadOnly } from "@customTypes/fieldBuilder.types";

import styles from "@components/FieldBuilder/variants/FieldInput.module.scss";

const FieldInputReadonly: React.FC<FieldVariantReadOnly> = ({
  value,
  format = (val) => val,
}) => {
  return (
    <span data-testid="field-input" className={styles.FieldReadOnly}>
      {format(value)}
    </span>
  );
};

export default FieldInputReadonly;
