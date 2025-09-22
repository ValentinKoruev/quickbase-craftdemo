import { useEffect, useRef, useState, type FormEvent } from "react";
import type { AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";
import type {
  FieldValue,
  IFieldBuilderInput,
} from "@customTypes/fieldBuilder.types";

import { Button } from "@components/UI";

import styles from "./FieldBuilder.module.scss";

import {
  FieldInputButton,
  FieldInputCheckbox,
  FieldInputDropdown,
  FieldInputList,
  FieldInputReadonly,
  FieldInputText,
} from "./variants";
import useFieldBuilder from "./hooks/useFieldBuilder";

export interface IFieldBuilderProps {
  title?: string;
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
  title,
}) => {
  const {
    error,
    formData,
    saveMutation,
    hasFieldChanges,
    onCancel,
    onChange,
    onClear,
    onSaveChange,
  } = useFieldBuilder({
    fields,
    saveQuery,
    beforeSaveFormat,
  });

  const renderFieldVariant = (field: IFieldBuilderInput) => {
    switch (field.variant.type) {
      case "text":
        return (
          <FieldInputText
            {...field.variant}
            value={formData[field.name] as string}
            onChange={onChange}
          />
        );
      case "readonly":
        return (
          <FieldInputReadonly
            {...field.variant}
            value={formData[field.name] as string}
          />
        );
      case "dropdown":
        return (
          <FieldInputDropdown
            {...field.variant}
            value={formData[field.name] as string}
            onChange={onChange}
          />
        );
      case "checkbox":
        return (
          <FieldInputCheckbox
            {...field.variant}
            value={formData[field.name] as boolean}
            onChange={onChange}
          />
        );
      case "list":
        return (
          <FieldInputList
            {...field.variant}
            value={formData[field.name] as string[]}
            onChange={onChange}
          />
        );
      case "button":
        return <FieldInputButton {...field.variant} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.FieldBuilder}>
      <div className={styles.FieldBuilderHeader}>
        <h3 className={styles.FieldBuilderTitle}>{title ?? "Field Builder"}</h3>
      </div>
      <form
        className={styles.FieldBuilderFormContainer}
        onSubmit={onSaveChange}
      >
        {fields.map((field) => {
          return (
            <div
              key={`field-${field.name}`}
              className={styles.FieldInputContainer}
            >
              <span className={styles.InputLabel}>{field.label}</span>
              {renderFieldVariant(field)}
            </div>
          );
        })}
        {/* The empty divs are for grid column spacing.*/}
        <div className={styles.GridWhitespace} aria-hidden="true"></div>
        <div>{error && <span className={styles.Error}>{error}</span>}</div>
        <div className={styles.GridWhitespace} aria-hidden="true"></div>
        <div className={styles.Actions}>
          <Button
            onClick={onClear}
            inline
            variant="secondary"
            color="danger"
            label="Clear"
            type="button"
          />

          {hasFieldChanges && (
            <div className={styles.ModifiedActions}>
              <Button
                inline
                variant="primary"
                color="success"
                border="rounded"
                label="Save changes"
                type="submit"
                loader={{
                  isLoading: saveMutation.isPending,
                  applyStyles: true,
                }}
              />

              <Button
                onClick={onCancel}
                inline
                variant="text"
                color="danger"
                label="Cancel"
                type="button"
                loader={{
                  isLoading: saveMutation.isPending,
                }}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default FieldBuilder;
