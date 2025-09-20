import { useEffect, useRef } from "react";
import type { FieldVariantText } from "@customTypes/fieldBuilder.types";
import styles from "../../FieldInput.module.scss";

const FieldInputText = ({
  name,
  id,
  value,
  placeholder = "",
  maxLength,
  onChange,
}: FieldVariantText) => {
  const divRef = useRef<HTMLDivElement>(null);
  const isUpdatingRef = useRef(false);
  const selectionPositionRef = useRef<number | null>(null);

  // Helper function to get position data for the last text node
  const getLastTextNodePosition = (
    node: Node
  ): { node: Node; length: number } | null => {
    if (!node.hasChildNodes()) {
      if (node.nodeType === Node.TEXT_NODE) {
        return { node, length: node.textContent?.length || 0 };
      }
      return null;
    }

    // Traverse child nodes from last to first
    for (let i = node.childNodes.length - 1; i >= 0; i--) {
      const child = node.childNodes[i];

      if (child.nodeType === Node.TEXT_NODE && child.textContent) {
        return { node: child, length: child.textContent.length };
      } else if (child.hasChildNodes()) {
        const result = getLastTextNodePosition(child);
        if (result) return result;
      }
    }

    return null;
  };

  // Calculate total text offset from root to specific node and position
  const getTotalOffset = (
    root: Node,
    targetNode: Node,
    nodeOffset: number
  ): number => {
    let offset = 0;

    const traverse = (node: Node): boolean => {
      if (node === targetNode) {
        offset += nodeOffset;
        return true;
      }

      if (node.nodeType === Node.TEXT_NODE) {
        offset += node.textContent?.length || 0;
      } else {
        for (let i = 0; i < node.childNodes.length; i++) {
          const child = node.childNodes[i];
          if (traverse(child)) return true;
        }
      }

      return false;
    };

    traverse(root);
    return offset;
  };

  // Position cursor at specific text offset in a node tree
  const positionCursorAtOffset = (
    root: Node,
    targetOffset: number,
    selection: Selection
  ): boolean => {
    let currentOffset = 0;
    const range = document.createRange();

    const traverse = (node: Node): boolean => {
      if (node.nodeType === Node.TEXT_NODE) {
        const length = node.textContent?.length || 0;

        if (currentOffset + length >= targetOffset) {
          const offset = targetOffset - currentOffset;
          range.setStart(node, offset);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
          return true;
        }

        currentOffset += length;
      } else {
        for (let i = 0; i < node.childNodes.length; i++) {
          if (traverse(node.childNodes[i])) return true;
        }
      }

      return false;
    };

    return traverse(root);
  };

  // Update the content with styled spans when value changes from props
  useEffect(() => {
    if (divRef.current && !isUpdatingRef.current) {
      isUpdatingRef.current = true;

      // Get current cursor position and whether we're at the end
      let isAtEnd = false;
      if (document.activeElement === divRef.current) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);

          // Check if cursor is at the end of text
          const lastPosition = getLastTextNodePosition(divRef.current);

          if (
            lastPosition &&
            range.startContainer === lastPosition.node &&
            range.startOffset === lastPosition.length
          ) {
            isAtEnd = true;
          } else if (divRef.current.contains(range.startContainer)) {
            selectionPositionRef.current = getTotalOffset(
              divRef.current,
              range.startContainer,
              range.startOffset
            );
          }
        }
      }

      // Update content with styled spans if needed
      if (maxLength && value && value.length > maxLength) {
        // Create the styled content with excess characters highlighted
        divRef.current.innerHTML = "";

        // Add the allowed part
        const normalTextNode = document.createTextNode(
          value.slice(0, maxLength)
        );
        divRef.current.appendChild(normalTextNode);

        // Add the excess part with styling
        const spanElement = document.createElement("span");
        spanElement.className = styles.DangerLabel;
        spanElement.textContent = value.slice(maxLength);
        divRef.current.appendChild(spanElement);
      } else {
        // Just set the content normally
        divRef.current.textContent = value || placeholder || "";
      }

      // Restore cursor position or move to end if it was focused before
      if (document.activeElement === divRef.current) {
        const selection = window.getSelection();

        if (selection) {
          // If we were at the end before or if it's a new content, move to end
          if (isAtEnd || !selectionPositionRef.current) {
            moveToEnd(selection);
          } else {
            try {
              // Position cursor at the right offset in the correct node
              positionCursorAtOffset(
                divRef.current,
                selectionPositionRef.current,
                selection
              );
            } catch (e) {
              // If anything goes wrong, move to end as fallback
              moveToEnd(selection);
            }
          }
        }
      }

      isUpdatingRef.current = false;
    }
  }, [value, placeholder, maxLength]);

  const moveToEnd = (selection: Selection) => {
    if (!divRef.current) return;

    // Find the last text node
    const range = document.createRange();
    let lastNode: Node | null = null;
    let lastTextNode: Node | null = null;

    // Find the last text node to place the cursor at
    const findLastTextNode = (node: Node) => {
      for (let i = node.childNodes.length - 1; i >= 0; i--) {
        const child = node.childNodes[i];
        if (child.nodeType === Node.TEXT_NODE && child.textContent) {
          lastTextNode = child;
          return true;
        } else if (child.hasChildNodes()) {
          if (findLastTextNode(child)) {
            return true;
          }
        }
      }
      return false;
    };

    if (divRef.current.hasChildNodes()) {
      if (!findLastTextNode(divRef.current)) {
        lastNode = divRef.current;
      }
    } else {
      lastNode = divRef.current;
    }

    const nodeForCursor = lastTextNode || lastNode;
    if (nodeForCursor) {
      const length = nodeForCursor.textContent?.length || 0;
      range.setStart(nodeForCursor, length);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (isUpdatingRef.current) return;

    // Get the raw text content
    const textContent = e.currentTarget.textContent || "";

    // Save the current selection position
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      selectionPositionRef.current = range.startOffset;
    }

    // Call the onChange handler with the raw text content
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
      contentEditable={true}
      suppressContentEditableWarning={true}
      role="textbox"
    />
  );
};

export default FieldInputText;
