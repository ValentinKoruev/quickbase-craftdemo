import type { FieldVariantReadOnly } from "@customTypes/fieldBuilder.types";

import styles from "../../FieldInput.module.scss";

const FieldInputReadonly: React.FC<FieldVariantReadOnly> = ({ value }) => {
  return <span className={styles.FieldReadOnly}>{value}</span>;
};

export default FieldInputReadonly;
