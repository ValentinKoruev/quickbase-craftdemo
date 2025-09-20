export const getCursorIndex = (element: HTMLElement) => {
  let cursorIndex = 0;
  const selection = window.getSelection();

  if (!selection || selection.rangeCount === 0) return cursorIndex;

  const range = selection.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.endOffset);

  cursorIndex = preCaretRange.toString().length;
  return cursorIndex;
};

export const setCursorIndex = (editableDiv: HTMLDivElement, index: number) => {
  const range = document.createRange();
  const selection = window.getSelection();

  let charIndex = 0;
  let nodeStack: ChildNode[] = [editableDiv];
  let node: ChildNode | undefined;

  while ((node = nodeStack.shift())) {
    console.log(node);
    if (node.nodeType === 3) {
      // Text node
      const textLength = (node.textContent || "").length;
      if (charIndex + textLength >= index) {
        range.setStart(node, index - charIndex);
        range.collapse(true);
        break;
      }
      charIndex += textLength;
    } else {
      // Push child nodes in reverse order so we traverse in order
      let i = node.childNodes.length;
      while (i--) {
        nodeStack.push(node.childNodes[i]);
      }
    }
  }

  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
};
