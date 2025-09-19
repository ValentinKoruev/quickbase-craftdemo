import { Button } from "@components/UI";
import type { FieldVariantButton } from "@customTypes/fieldBuilder.types";

import styles from "../../FieldInput.module.scss";

const FieldInputButton: React.FC<FieldVariantButton> = ({ button }) => {
  return (
    <div className={styles.FieldInputButton}>
      <Button {...button} />
    </div>
  );
};

export default FieldInputButton;
