import { useEffect, useRef, useState, type FormEvent } from "react";
import type { AxiosResponse } from "axios";
import type {
  FieldValue,
  IFieldBuilderInput,
} from "@customTypes/fieldBuilder.types";
import FieldInput from "@components/FieldBuilder/FieldInput";
import { Button } from "@components/UI";

import styles from "./FieldBuilder.module.scss";

export interface IFieldBuilderProps {
  fields: IFieldBuilderInput[];
  saveQuery: (
    fieldData: Record<string, FieldValue>
  ) => Promise<AxiosResponse<any, any>>;
  beforeSaveFormat?: (
    values: Record<string, FieldValue>
  ) => Record<string, FieldValue>;
}

const FieldBuilder: React.FC<IFieldBuilderProps> = ({
  fields = [],
  saveQuery,
  beforeSaveFormat,
}) => {
  const initialProps = useRef<Record<string, FieldValue>>(
    fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.variant.value ?? "",
      }),
      {}
    )
  );

  const [formData, setFormData] = useState<Record<string, FieldValue>>(
    fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.variant.value ?? "",
      }),
      {}
    )
  );

  const [isFormModified, setIsFormModified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialState = initialProps.current;

    for (const key of Object.keys(formData)) {
      if (
        typeof formData[key] === "object" &&
        typeof initialState[key] === "object"
      ) {
        if (
          JSON.stringify(formData[key]) !== JSON.stringify(initialState[key])
        ) {
          setIsFormModified(true);
          return;
        }
        continue;
      }

      if (String(formData[key]).trim() !== String(initialState[key]).trim()) {
        setIsFormModified(true);
        return;
      }
    }

    setIsFormModified(false);
  }, [formData]);

  const validateForm = (
    formData: Record<string, FieldValue>
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

  const onChange = ({
    name,
    value,
    type: inputType,
  }: {
    name: string;
    value: string | string[] | boolean;
    type: string;
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
      console.log("test");
      currentFormData = beforeSaveFormat(formData);
    }

    const validationError = validateForm(currentFormData);

    if (validationError) {
      setError(validationError[0]);
      return;
    }

    try {
      const res = await saveQuery(currentFormData);
      console.log(res);
      // TODO: fix whatever this is
      const data = { ...res.data.data, defaultValue: res.data.data.default };

      console.log("Client saved data:", currentFormData);

      console.log("Field saved successfully:", data);

      setFormData(() => ({ ...data }));
      initialProps.current = { ...data };
      setIsFormModified(false);
      setError(null);
    } catch (err) {
      setError("An error occurred while saving the field.");
    }
  };

  const onCancel = () => {
    setFormData({ ...initialProps.current });
    setError(null);
  };

  const onClear = () => {
    setFormData({
      label: "",
      type: "multi-select",
      required: false,
      defaultValue: "",
      choices: [],
      order: "asc",
    });
    setError(null);
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
        {fields.map((field) => {
          return (
            <FieldInput
              key={field.name}
              label={field.label}
              variant={
                field.variant.type === "readonly" ||
                field.variant.type === "button"
                  ? { ...field.variant, value: formData[field.name] as any }
                  : {
                      ...field.variant,
                      value: formData[field.name] as any,
                      onChange,
                    }
              }
            />
          );
        })}
        <div></div>
        <div>{error && <span className={styles.Error}>{error}</span>}</div>
        {/* TODO: This empty div is for first grid column spacing. Add aria label*/}
        <div></div>
        <div className={styles.Actions}>
          <Button
            onClick={onClear}
            inline
            variant="secondary"
            color="danger"
            label="Clear"
            type="button"
          />

          {isFormModified && (
            <div className={styles.ModifiedActions}>
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
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FieldBuilder;
