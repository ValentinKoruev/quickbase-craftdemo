import { Button } from "@components/UI";
import type { FieldVariantButton } from "@customTypes/fieldBuilder.types";

import styles from "@components/FieldBuilder/variants/FieldElement.module.scss";

const FieldElementButton: React.FC<FieldVariantButton> = ({ button }) => {
  return (
    <div className={styles.FieldElementButton}>
      <Button {...button} />
    </div>
  );
};

export default FieldElementButton;
