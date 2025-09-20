import { useRef } from "react";
import type { FieldVariantText } from "@customTypes/fieldBuilder.types";
import styles from "../../FieldInput.module.scss";
import useEditable from "./hooks/useEditable";

const FieldInputText = ({
  name,
  id,
  value,
  placeholder = "",
  maxLength,
  onChange,
}: FieldVariantText) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const isUpdatingRef = useRef(false);
  const selectionPositionRef = useRef<number | null>(null);

  const { handleFocus, handleMouseDown } = useEditable({
    value,
    placeholder,
    maxLength,
    divRef,
    isUpdatingRef,
    selectionPositionRef,
  });

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (isUpdatingRef.current) return;

    const textContent = e.currentTarget.textContent || "";

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      selectionPositionRef.current = range.startOffset;
    }

    onChange({
      name,
      value: textContent,
      type: "text",
    });
  };

  return (
    <div
      id={id}
      ref={divRef}
      className={styles.FieldInput}
      onInput={handleInput}
      onFocus={handleFocus}
      // onMouseDown={handleMouseDown}
      contentEditable={true}
      suppressContentEditableWarning={true}
      role="textbox"
    />
  );
};

export default FieldInputText;
