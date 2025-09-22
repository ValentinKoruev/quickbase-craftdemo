import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import type { FieldVariantList } from "@customTypes/fieldBuilder.types";

import orderBy from "@utils/orderBy";
import { getCursorIndex, setCursorIndex } from "@utils/cursorUtil";
import { appendSpanElement, createNewTextNode } from "@utils/editableDivUtils";
import { Button, Icon } from "@components/UI";

import styles from "../../FieldInput.module.scss";

const FieldInputList: React.FC<FieldVariantList> = ({
  value: choices,
  name,
  sort = "asc",
  maxLength = 1000,
  onChange = () => {},
}) => {
  const addInputRef = useRef<HTMLDivElement | null>(null);
  const [addChoiceValue, setAddChoiceValue] = useState("");
  const isInternalChangeRef = useRef(false);

  const formatRangeContent = (
    value: string,
    preserveCursor: boolean = false
  ) => {
    if (addInputRef.current === null || value === null) return;

    const cursorIndex = preserveCursor
      ? getCursorIndex(addInputRef.current)
      : null;

    createNewTextNode(addInputRef.current, value.slice(0, maxLength));

    if (value.length > maxLength)
      appendSpanElement(
        addInputRef.current,
        value.slice(maxLength),
        styles.DangerLabel
      );

    if (preserveCursor && cursorIndex !== null)
      setCursorIndex(addInputRef.current, cursorIndex);
  };

  useEffect(() => {
    if (isInternalChangeRef.current === true) {
      formatRangeContent(addChoiceValue, true);
      isInternalChangeRef.current = false;
      return;
    }

    formatRangeContent(addChoiceValue);
  }, [addChoiceValue, maxLength]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    const newValue = e.currentTarget.textContent || "";
    isInternalChangeRef.current = true;

    setAddChoiceValue(newValue);
  };

  const handleRemoveChoice = (index: number) => {
    if (choices === undefined) return;
    const newChoices = choices.filter((_, i) => i !== index);
    onChange({ name, value: newChoices });
  };

  const hanndleAddChoice = () => {
    if (addChoiceValue.trim().length === 0) return;
    const newChoices = choices
      ? [...choices, addChoiceValue.trim()]
      : [addChoiceValue.trim()];

    onChange({ name, value: newChoices });
    setAddChoiceValue("");
  };

  return (
    <div className={styles.FieldListContainer}>
      <ul
        data-testid="field-input"
        className={classNames(styles.FieldInput, styles.FieldList)}
      >
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
      <div className={styles.FieldListActions}>
        <div
          ref={addInputRef}
          className={styles.AddToListInput}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={handleInput}
        />
        <Button
          variant="primary"
          color="success"
          border="block"
          label="Add"
          onClick={hanndleAddChoice}
          className={styles.AddToListButton}
        />
      </div>
    </div>
  );
};

export default FieldInputList;
