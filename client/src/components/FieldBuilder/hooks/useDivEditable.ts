import { formatRangeContent } from "@utils/editableDivUtils";
import { useEffect } from "react";

interface UseDivEditableProps {
  divRef: React.RefObject<HTMLDivElement | null>;
  isInternalChange: boolean;
  value: string;
  maxLength: number;
  specialStyle: string;
}

const useDivEditable = ({
  divRef,
  isInternalChange,
  value,
  maxLength,
  specialStyle,
}: UseDivEditableProps) => {
  useEffect(() => {
    if (divRef.current === null) return;

    if (isInternalChange === true) {
      formatRangeContent(divRef.current, value, maxLength, specialStyle, true);
      isInternalChange = false;
      return;
    }

    formatRangeContent(divRef.current, value, maxLength, specialStyle);
  }, [value, maxLength]);
};

export default useDivEditable;
