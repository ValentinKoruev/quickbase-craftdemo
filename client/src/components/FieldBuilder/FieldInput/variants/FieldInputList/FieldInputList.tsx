import classNames from "classnames";
import orderBy from "@utils/orderBy";
import { Icon } from "@components/UI";
import type { FieldVariantList } from "@customTypes/fieldBuilder.types";

import styles from "../../FieldInput.module.scss";

const FieldInputList: React.FC<FieldVariantList> = ({
  value: choices,
  sort = "asc",
  maxLength = 1000,
  onChange = () => {},
}) => {
  const handleRemoveChoice = (index: number) => {
    if (choices === undefined) return;
    const newChoices = choices.filter((_, i) => i !== index);
    onChange({ name: "choices", value: newChoices, type: "list" });
  };

  return (
    <ul className={classNames(styles.FieldInput, styles.FieldList)}>
      {choices &&
        orderBy(choices, sort).map((choice, index) => (
          <li key={`choice-${index}`}>
            {choice.trim().length > maxLength ? (
              <>
                <span className={styles.ChoiceLabel}>
                  {choice.slice(0, maxLength)}
                  <span className={styles.DangerLabel}>
                    {choice.slice(maxLength, choice.length)}
                  </span>
                </span>
              </>
            ) : (
              <span className={styles.ChoiceLabel}>{choice}</span>
            )}
            {/* <span className={styles.ChoiceLabel}>{choice}</span> */}
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
