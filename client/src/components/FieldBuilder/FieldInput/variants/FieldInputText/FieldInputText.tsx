import { useEffect, useRef } from "react";
import type { FieldVariantText } from "@customTypes/fieldBuilder.types";
import { getCursorIndex, setCursorIndex } from "@utils/cursorUtil";
import { appendSpanElement, createNewTextNode } from "./utils/textFieldUtils";
import styles from "../../FieldInput.module.scss";

const FieldInputText = ({
  name,
  id,
  value,
  maxLength = 1000,
  onChange = () => {},
}: FieldVariantText) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const isInternalChangeRef = useRef(false);

  const formatRangeContent = (
    value: string,
    preserveCursor: boolean = false
  ) => {
    if (divRef.current === null || value === null) return;

    const cursorIndex = preserveCursor ? getCursorIndex(divRef.current) : null;

    createNewTextNode(divRef.current, value.slice(0, maxLength));

    if (value.length > maxLength)
      appendSpanElement(
        divRef.current,
        value.slice(maxLength),
        styles.DangerLabel
      );

    if (preserveCursor && cursorIndex !== null)
      setCursorIndex(divRef.current, cursorIndex);
  };

  useEffect(() => {
    if (isInternalChangeRef.current === true) {
      formatRangeContent(value, true);
      isInternalChangeRef.current = false;
      return;
    }

    formatRangeContent(value);
  }, [value, maxLength]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    const newValue = e.currentTarget.textContent || "";
    isInternalChangeRef.current = true;

    onChange({
      name,
      value: newValue,
      type: "text",
    });
  };

  const onFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    setCursorIndex(e.currentTarget, value.length);
  };

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
    />
  );
};

export default FieldInputText;
