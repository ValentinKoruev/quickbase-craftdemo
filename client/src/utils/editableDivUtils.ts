import { getCursorIndex, setCursorIndex } from "./cursorUtil";

export const createNewTextNode = (element: HTMLElement, value: string) => {
  element.textContent = "";
  element.appendChild(document.createTextNode(value));
};

export const appendSpanElement = (
  element: HTMLElement,
  value: string,
  className?: string
) => {
  const spanElement = document.createElement("span");
  spanElement.className = className || "";
  spanElement.textContent = value;
  element.appendChild(spanElement);
};

export const formatRangeContent = (
  div: HTMLDivElement,
  value: string,
  maxLength: number,
  specialStyle: string,
  preserveCursor: boolean = false
) => {
  if (div === null || value === null) return;

  const cursorIndex = preserveCursor ? getCursorIndex(div) : null;

  createNewTextNode(div, value.slice(0, maxLength));

  if (value.length > maxLength)
    appendSpanElement(div, value.slice(maxLength), specialStyle);

  if (preserveCursor && cursorIndex !== null) setCursorIndex(div, cursorIndex);
};
