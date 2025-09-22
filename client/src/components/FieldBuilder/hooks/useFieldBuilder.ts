import type { FieldValue } from "@customTypes/fieldBuilder.types";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { generateFieldsMap, validateForm } from "../utils/builderUtils";
import useFieldChanges from "@hooks/useFieldChange";

interface IUseFieldBuilderProps {
  fields: any[];
  saveQuery: (fieldData: Record<string, FieldValue>) => Promise<any>;
  beforeSaveFormat?: (
    values: Record<string, FieldValue>
  ) => Record<string, FieldValue>;
}

const useFieldBuilder = ({
  fields,
  saveQuery,
  beforeSaveFormat,
}: IUseFieldBuilderProps) => {
  const initialProps = useRef<Record<string, FieldValue>>(
    generateFieldsMap(fields)
  );

  const [formData, setFormData] = useState<Record<string, FieldValue>>(
    generateFieldsMap(fields)
  );
  const [error, setError] = useState<string | null>(null);

  const saveMutation = useMutation({
    mutationFn: async (fieldData: Record<string, FieldValue>) => {
      const res = await saveQuery(fieldData);

      return res.data;
    },
    onSuccess: (data) => {
      const updatedData = { ...data };

      if (data.default) {
        updatedData.defaultValue = data.default;
        delete updatedData.default;
      }

      console.log("Field saved successfully:", updatedData);

      setFormData(() => ({ ...updatedData }));
      initialProps.current = { ...updatedData };
      setError(null);
    },
    onError: () => {
      setError("An error occurred while saving the field.");
    },
  });

  const hasFieldChanges = Boolean(
    useFieldChanges(initialProps.current, formData).size
  );

  const onCancel = () => {
    setFormData({ ...initialProps.current });
    setError(null);
  };

  const onChange = ({
    name,
    value,
  }: {
    name: string;
    value: string | string[] | boolean;
  }) => {
    setError(null);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSaveChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let currentFormData = formData;
    if (beforeSaveFormat) {
      currentFormData = beforeSaveFormat(formData);
    }

    const validationError = validateForm(currentFormData, fields);

    if (validationError) {
      setError(validationError[0]);
      return;
    }

    saveMutation.mutate(currentFormData);
  };

  const onClear = () => {
    setFormData(() => {
      const newData: Record<string, FieldValue> = {};
      for (const field of fields) {
        if (field.variant.type === "checkbox") {
          newData[field.name] = false;
          continue;
        }
        if (field.variant.type === "list") {
          newData[field.name] = [];
          continue;
        }
        if (
          field.variant.type === "readonly" ||
          field.variant.type === "dropdown"
        ) {
          newData[field.name] = field.variant.value || "";
          continue;
        }
        newData[field.name] = "";
      }
      return newData;
    });
    setError(null);
  };

  return {
    formData,
    error,
    saveMutation,
    onCancel,
    hasFieldChanges,
    onChange,
    onSaveChange,
    onClear,
  };
};

export default useFieldBuilder;
