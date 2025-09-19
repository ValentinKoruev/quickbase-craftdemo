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

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    console.log(name);
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? !prev.required : value,
    }));
  };

  const onChoiceChange = (newChoices: string[]) => {
    setFormData((prev) => ({
      ...prev,
      choices: newChoices,
    }));
  };

  const onSaveChange = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
          id="label"
          name="label"
          variant="text"
          label="Label"
          value={formData.label}
          onChange={onChange}
        />
        <FieldInput
          id="type"
          name="type"
          variant="readonly"
          label="Type"
          value={formData.type}
          placeholder="Multi-Select"
        />
        <FieldInput
          id="required"
          name="required"
          variant="checkbox"
          label="Required"
          required={formData.required}
          onChange={onChange}
        />
        <FieldInput
          id="defaultValue"
          name="defaultValue"
          variant="text"
          label="Default Value"
          value={formData.defaultValue}
          onChange={onChange}
        />
        <FieldInput
          id="choices"
          name="choices"
          variant="list"
          label="Choices"
          choices={formData.choices}
          onChoiceChange={onChoiceChange}
        />
        <FieldInput
          id="order"
          name="order"
          variant="dropdown"
          label="Order"
          choices={["Ascending", "Descending"]}
          onChange={onChange}
        />

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
