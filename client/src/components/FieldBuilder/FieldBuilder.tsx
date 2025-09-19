import { useEffect, useRef, useState, type FormEvent } from "react";
import FieldInput from "@components/FieldBuilder/FieldInput";
import { Button } from "@components/UI";

import styles from "./FieldBuilder.module.scss";

interface IFieldBuilderProps {
  label?: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  choices?: string[];
  order?: string;
}

const FieldBuilder: React.FC<IFieldBuilderProps> = ({
  label,
  type,
  defaultValue,
  choices,
  order,
  required,
}) => {
  const initialProps = useRef({
    label: label || "",
    type: type || "multi-select",
    required: required || false,
    defaultValue: defaultValue || "",
    choices: choices || [],
    order: order || "asc",
  });

  const [formData, setFormData] = useState<IFieldBuilderProps>({
    label: label || "",
    type: type || "multi-select",
    required: required || false,
    defaultValue: defaultValue || "",
    choices: choices || [],
    order: order || "asc",
  });

  const [isFormModified, setIsFormModified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialState = initialProps.current;
    const isDifferent =
      formData.label !== initialState.label ||
      formData.type !== initialState.type ||
      formData.required !== initialState.required ||
      formData.defaultValue !== initialState.defaultValue ||
      formData.order !== initialState.order ||
      JSON.stringify(formData.choices) !== JSON.stringify(initialState.choices);

    setIsFormModified(isDifferent);
  }, [formData]);

  const validateForm = (): string | null => {
    if (!formData.label || formData.label.trim() === "") {
      return "Label is required.";
    }
    if (formData.choices && formData.choices.length > 50) {
      return "Too many choices. Maximum allowed is 50.";
    }
    if (formData.choices) {
      const uniqueChoices = new Set(formData.choices);
      if (uniqueChoices.size !== formData.choices.length) {
        return "Choices must be unique.";
      }
    }

    return null;
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setError(null);
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? !prev.required : value,
    }));
  };

  const onChoiceChange = (newChoices: string[]) => {
    setError(null);
    setFormData((prev) => ({
      ...prev,
      choices: newChoices,
    }));
  };

  const onSaveChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    let currentFormData = { ...formData };
    if (
      formData.defaultValue &&
      !formData.choices?.includes(formData.defaultValue)
    ) {
      currentFormData = {
        ...formData,
        choices: [...(formData.choices || []), formData.defaultValue],
      };
      setFormData(currentFormData);
    }

    console.log(currentFormData);
  };

  const onCancel = () => {
    console.log("canceled");
    setFormData({ ...initialProps.current });
  };

  return (
    <div className={styles.FieldBuilder}>
      <div className={styles.FieldBuilderHeader}>
        <h3 className={styles.FieldBuilderTitle}>Field Builder</h3>
      </div>
      <form
        className={styles.FieldBuilderFormContainer}
        onSubmit={onSaveChange}
      >
        <FieldInput
          label="Label"
          variant={{
            type: "text",
            name: "label",
            id: "label",
            value: formData.label ?? "",
            onChange: onChange,
          }}
        />
        <FieldInput
          label="Type"
          variant={{
            type: "readonly",
            value: formData.type ?? "",
          }}
        />
        <FieldInput
          label="Required"
          variant={{
            type: "checkbox",
            id: "required",
            name: "required",
            checked: formData.required ?? false,
            onChange: onChange,
          }}
        />
        <FieldInput
          label="Default Value"
          variant={{
            type: "text",
            id: "defaultValue",
            name: "defaultValue",
            value: formData.defaultValue ?? "",
            onChange: onChange,
          }}
        />
        <FieldInput
          label="Choices"
          variant={{
            type: "list",
            id: "choices",
            name: "choices",
            choices: formData.choices ?? [],
            onChoiceChange: onChoiceChange,
          }}
        />
        <FieldInput
          label="Order"
          variant={{
            type: "dropdown",
            id: "order",
            name: "order",
            choices: ["asc", "desc"],
            // value: formData.order ?? "asc",
            onChange: onChange,
          }}
        />
        <div></div>
        <div>{error && <span className={styles.Error}>{error}</span>}</div>
        {/* TODO: This empty div is for first grid column spacing. Add aria label*/}
        <div></div>
        <div className={styles.Actions}>
          {isFormModified && (
            <>
              <Button
                inline
                variant="primary"
                color="success"
                border="rounded"
                label="Save changes"
                type="submit"
              />

              <Button
                onClick={onCancel}
                inline
                variant="text"
                color="danger"
                label="Cancel"
                type="button"
              />
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default FieldBuilder;
