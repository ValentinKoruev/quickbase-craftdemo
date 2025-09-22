import type {
  FieldValue,
  IFieldBuilderInput,
} from "@customTypes/fieldBuilder.types";

export const generateFieldsMap = (fields: IFieldBuilderInput[]) => {
  return fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: field.variant.value ?? "",
    }),
    {}
  );
};

export const validateForm = (
  formData: Record<string, FieldValue>,
  fields: IFieldBuilderInput[]
): string[] | null => {
  const errors: string[] = [];
  for (const field of fields) {
    if (field.validation) {
      const error = field.validation(formData[field.name]);
      if (error) errors.push(error);
    }
  }

  return errors.length > 0 ? errors : null;
};
