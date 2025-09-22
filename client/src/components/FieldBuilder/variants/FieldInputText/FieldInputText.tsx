import { useRef } from "react";
import type { FieldVariantText } from "@customTypes/fieldBuilder.types";
import { setCursorIndex } from "@utils/cursorUtil";

import styles from "@components/FieldBuilder/variants/FieldInput.module.scss";
import useDivEditable from "@components/FieldBuilder/hooks/useDivEditable";

const FieldInputText = ({
  name,
  id,
  value,
  maxLength = 1000,
  onChange = () => {},
}: FieldVariantText) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const isInternalChangeRef = useRef(false);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    isInternalChangeRef.current = true;

    onChange({
      name,
      value: e.currentTarget.textContent || "",
    });
  };

  const onFocus = (e: React.FocusEvent<HTMLDivElement>) =>
    setCursorIndex(e.currentTarget, value.length);

  useDivEditable({
    divRef,
    isInternalChange: isInternalChangeRef.current,
    value,
    maxLength,
    specialStyle: styles.DangerLabel,
  });

  return (
    <div
      id={id}
      className={styles.FieldInput}
      ref={divRef}
      contentEditable={true}
      suppressContentEditableWarning={true}
      role="textbox"
      onInput={handleInput}
      onFocus={onFocus}
      data-testid="field-input"
    />
  );
};

export default FieldInputText;
