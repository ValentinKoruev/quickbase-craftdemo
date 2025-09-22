import lodash from "lodash";

const useFieldChanges = <T>(
  initialState: Record<string, T>,
  currentState: Record<string, T>
): Set<string> => {
  const fieldChanges = Object.keys(currentState).filter((fieldName) => {
    const initial = initialState[fieldName as keyof typeof initialState];
    const current = currentState[fieldName as keyof typeof currentState];

    if (!lodash.isEqual(initial, current)) {
      return fieldName;
    }
  });

  return new Set(fieldChanges);
};

export default useFieldChanges;
