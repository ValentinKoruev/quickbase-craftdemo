import classNames from "classnames";
import { Icon } from "@components/UI";
import type { FieldVariantList } from "@customTypes/fieldBuilder.types";

import styles from "../../FieldInput.module.scss";

const FieldInputList: React.FC<FieldVariantList> = ({
  choices,
  onChoiceChange,
}) => {
  const handleRemoveChoice = (index: number) => {
    if (choices === undefined) return;
    const newChoices = choices.filter((_, i) => i !== index);
    onChoiceChange(newChoices);
  };

  return (
    <ul className={classNames(styles.FieldInput, styles.FieldList)}>
      {choices?.map((choice, index) => (
        <li key={`choice-${index}`}>
          <span className={styles.ChoiceLabel}>{choice}</span>
          <button
            onClick={() => handleRemoveChoice(index)}
            type="button"
            className={styles.ChoiceRemoveButton}
          >
            <Icon name="x-mark" className={styles.ChoiceIcon} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FieldInputList;
