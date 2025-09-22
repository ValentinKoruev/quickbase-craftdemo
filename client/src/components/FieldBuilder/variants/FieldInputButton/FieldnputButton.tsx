import { Button } from "@components/UI";
import type { FieldVariantButton } from "@customTypes/fieldBuilder.types";

import styles from "@components/FieldBuilder/variants/FieldInput.module.scss";

const FieldElementButton: React.FC<FieldVariantButton> = ({ button }) => {
  return (
    <div className={styles.FieldInputButton}>
      <Button {...button} />
    </div>
  );
};

export default FieldElementButton;
