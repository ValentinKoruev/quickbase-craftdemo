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
