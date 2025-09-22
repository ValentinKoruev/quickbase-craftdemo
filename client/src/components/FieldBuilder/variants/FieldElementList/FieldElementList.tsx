import { useRef, useState } from "react";
import classNames from "classnames";
import type { FieldVariantList } from "@customTypes/fieldBuilder.types";

import useDivEditable from "@components/FieldBuilder/hooks/useDivEditable";
import orderBy from "@utils/orderBy";

import { Button } from "@components/UI";
import ListElement from "./ListElement";

import styles from "@components/FieldBuilder/variants/FieldElement.module.scss";

const FieldElementList: React.FC<FieldVariantList> = ({
  value: choices,
  name,
  sort = "asc",
  maxLength = 1000,
  onChange = () => {},
}) => {
  const addInputRef = useRef<HTMLDivElement | null>(null);
  const [addChoiceValue, setAddChoiceValue] = useState("");
  const isInternalChangeRef = useRef(false);

  useDivEditable({
    divRef: addInputRef,
    isInternalChange: isInternalChangeRef.current,
    value: addChoiceValue,
    maxLength,
    specialStyle: styles.DangerLabel,
  });

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    isInternalChangeRef.current = true;

    setAddChoiceValue(e.currentTarget.textContent || "");
  };

  const handleRemoveChoice = (index: number) => {
    const newChoices = choices.filter((_, i) => i !== index);
    onChange({ name, value: newChoices });
  };

  const handleAddChoice = () => {
    if (addChoiceValue.trim().length === 0) return;
    const newChoices = [...choices, addChoiceValue.trim()];

    onChange({ name, value: newChoices });
    setAddChoiceValue("");
  };

  return (
    <div className={styles.FieldListContainer}>
      <ul
        data-testid="field-input"
        className={classNames(styles.FieldElement, styles.FieldList)}
      >
        {choices &&
          orderBy(choices, sort).map((choice, index) => (
            <ListElement
              key={`choice-${index}`}
              choice={choice}
              index={index}
              maxLength={maxLength}
              handleRemoveChoice={handleRemoveChoice}
            />
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
          onClick={handleAddChoice}
          className={styles.AddToListButton}
        />
      </div>
    </div>
  );
};

export default FieldElementList;
