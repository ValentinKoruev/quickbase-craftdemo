import type {
  FieldBuilderData,
  FieldValue,
} from "@customTypes/fieldBuilder.types";
import apiQueries from "@queries/api";

export const saveQuery = async (fieldData: Record<string, FieldValue>) => {
  return await apiQueries.fieldQueries.saveField(
    Object.entries(fieldData).reduce<FieldBuilderData>((acc, [key, value]) => {
      if (key === "defaultValue") {
        return { ...acc, default: value as string };
      }
      return { ...acc, [key]: value };
    }, {} as FieldBuilderData)
  );
};

export const beforeSaveFormat = (data: Record<string, FieldValue>) => {
  let formattedData = { ...data };

  if (
    formattedData.defaultValue && !Array.isArray(formattedData.choices)
      ? false
      : Array.isArray(formattedData.choices) &&
        !formattedData.choices.includes(
          String(formattedData.defaultValue).trim()
        )
  ) {
    formattedData = {
      ...formattedData,
      choices: [
        ...(Array.isArray(formattedData.choices)
          ? formattedData.choices.filter(
              (choice): choice is string => typeof choice === "string"
            )
          : []),
        formattedData.defaultValue as string,
      ],
    };
  }

  return formattedData;
};

export const labelValidation = (value: FieldValue) => {
  if (typeof value !== "string" || value.trim() === "") {
    return "Label is required.";
  }
  return null;
};

export const defaultValueValidation = (value: FieldValue) => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return "Default value is cannot be empty.";
  }
  if (value && (value as string).length > 40) {
    return "Default value must be 40 characters or less.";
  }
  return null;
};

export const choicesValidation = (value: FieldValue) => {
  if (value && !Array.isArray(value)) {
    return "Choices must be an array.";
  }
  if (Array.isArray(value) && value.some((v) => v.trim() === "")) {
    return "Choices cannot contain empty values.";
  }
  if (value && Array.isArray(value) && new Set(value).size !== value.length) {
    return "Choices must be unique.";
  }
  if (value && Array.isArray(value) && value.some((v) => v.length > 40)) {
    return "Each choice must be 40 characters or less.";
  }
  if (value && value.length > 50) {
    return "Too many choices. Maximum allowed is 50.";
  }
  return null;
};
