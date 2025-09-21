import classNames from "classnames";
import orderBy from "@utils/orderBy";
import { Icon } from "@components/UI";
import type { FieldVariantList } from "@customTypes/fieldBuilder.types";

import styles from "../../FieldInput.module.scss";

const FieldInputList: React.FC<FieldVariantList> = ({
  value: choices,
  sort = "asc",
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
            {choice.trim().length > 40 ? (
              <>
                <span className={styles.ChoiceLabel}>
                  {choice.slice(0, 40)}
                  <span className={styles.DangerLabel}>
                    {choice.slice(40, choice.length)}
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
