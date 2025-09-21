import FieldBuilder from "@components/FieldBuilder";
import type { FieldBuilderData } from "@customTypes/fieldBuilder.types";
import {
  createCheckboxField,
  createDropdownField,
  createListField,
  createReadonlyField,
  createTextField,
} from "@utils/fieldBuilderUtils";
import {
  beforeSaveFormat,
  defaultValueValidation,
  labelValidation,
  saveQuery,
} from "./config";

interface MultiSelectFieldBuilderProps {
  fieldData: FieldBuilderData;
}

const MultiSelectFieldBuilder: React.FC<MultiSelectFieldBuilderProps> = ({
  fieldData,
}) => {
  const textField = createTextField(
    "Label",
    "label",
    fieldData.label,
    {
      maxLength: 40,
    },
    labelValidation
  );

  const typeField = createReadonlyField("Type", "type", fieldData.type, {
    format: (val) => {
      if (val === "multiselect") return "Multi-Select";
      return val.charAt(0).toUpperCase() + val.slice(1);
    },
  });

  const requiredField = createCheckboxField(
    "Required",
    "required",
    fieldData.required,
    {
      tooltip: "A Value is required for this field.",
    }
  );

  const defaultValueField = createTextField(
    "Default Value",
    "defaultValue",
    fieldData.default ?? "",
    {
      maxLength: 40,
    },
    defaultValueValidation
  );

  const choicesField = createListField(
    "Choices",
    "choices",
    fieldData.choices,
    {
      maxLength: 40,
      sort: "asc",
    }
  );

  const orderField = createDropdownField(
    "Order",
    "order",
    fieldData.order || "asc",
    ["asc", "desc"],
    {
      format: (value) => {
        if (value === "asc") return "Ascending (A-Z)";
        if (value === "desc") return "Descending (Z-A)";
        return value;
      },
    }
  );

  const fields = [
    textField,
    typeField,
    requiredField,
    defaultValueField,
    choicesField,
    orderField,
  ];

  return (
    <FieldBuilder
      fields={fields}
      saveQuery={saveQuery}
      beforeSaveFormat={beforeSaveFormat}
    />
  );
};

export default MultiSelectFieldBuilder;
