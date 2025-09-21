import apiQueries from "@queries/api";
import type { IFieldBuilderProps } from "@components/FieldBuilder";
import type {
  FieldBuilderData,
  FieldValue,
} from "@customTypes/fieldBuilder.types";
2;

export const multiselectorBuilderConfig: (
  fieldData: FieldBuilderData
) => IFieldBuilderProps = (fieldData) => {
  return {
    saveQuery: async (fieldData) => {
      return await apiQueries.fieldQueries.saveField(
        Object.entries(fieldData).reduce<FieldBuilderData>(
          (acc, [key, value]) => {
            if (key === "defaultValue") {
              return { ...acc, default: value as string };
            }
            return { ...acc, [key]: value };
          },
          {} as FieldBuilderData
        )
      );
    },
    beforeSaveFormat: (data: Record<string, FieldValue>) => {
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
    },
    fields: [
      {
        label: "Label",
        name: "label",
        variant: {
          type: "text",
          name: "label",
          id: "label",
          value: fieldData.label,
        },
        validation: (value: FieldValue) => {
          if (typeof value !== "string" || value.trim() === "") {
            return "Label is required.";
          }
          return null;
        },
      },
      {
        label: "Type",
        name: "type",
        variant: {
          type: "readonly",
          value: fieldData.type,
        },
      },
      {
        label: "Required",
        name: "required",
        initialValue: fieldData.required,
        variant: {
          type: "checkbox",
          id: "required",
          name: "required",
          value: fieldData.required ?? false,
        },
      },
      {
        label: "Default Value",
        name: "defaultValue",
        variant: {
          type: "text",
          id: "defaultValue",
          name: "defaultValue",
          value: fieldData.default ?? "",
          maxLength: 40,
        },
      },
      {
        label: "Choices",
        name: "choices",
        variant: {
          type: "list",
          id: "choices",
          name: "choices",
          value: fieldData.choices ?? [],
          sort: fieldData.order,
        },
        validation: (value: FieldValue) => {
          if (value && !Array.isArray(value)) {
            return "Choices must be an array.";
          }
          if (Array.isArray(value) && value.some((v) => v.trim() === "")) {
            return "Choices cannot contain empty values.";
          }
          if (
            value &&
            Array.isArray(value) &&
            new Set(value).size !== value.length
          ) {
            return "Choices must be unique.";
          }
          if (
            value &&
            Array.isArray(value) &&
            value.some((v) => v.length > 40)
          ) {
            return "Each choice must be 40 characters or less.";
          }
          if (value && value.length > 50) {
            return "Too many choices. Maximum allowed is 50.";
          }
          return null;
        },
      },
      {
        label: "Order",
        name: "order",
        variant: {
          type: "dropdown",
          id: "order",
          name: "order",
          value: fieldData.order ?? "asc",
          choices: ["asc", "desc"],
        },
      },
    ],
  };
};
