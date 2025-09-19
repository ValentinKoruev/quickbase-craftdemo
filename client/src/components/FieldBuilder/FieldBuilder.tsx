import FieldInput from "@components/FieldBuilder/FieldInput";
import styles from "./FieldBuilder.module.scss";
import { Button } from "@components/UI";

interface IFieldBuilderProps {
  fieldLabel?: string;
  fieldType?: string;
  required?: boolean;
  defaultValue?: string;
  choices?: string[];
  order?: string;
}

const FieldBuilder: React.FC<IFieldBuilderProps> = ({
  fieldLabel,
  fieldType,
  defaultValue,
  choices,
  order,
  required,
}) => {
  return (
    <div className={styles.FieldBuilder}>
      <div className={styles.FieldBuilderHeader}>
        <h3 className={styles.FieldBuilderTitle}>Field Builder</h3>
      </div>
      <div className={styles.FieldBuilderFormContainer}>
        <FieldInput variant="text" label="Label" value={fieldLabel} />
        <FieldInput
          variant="readonly"
          label="Type"
          placeholder="Multi-Select"
          value={fieldType}
        />
        <FieldInput variant="checkbox" label="Required" required={required} />
        <FieldInput variant="text" label="Default Value" value={defaultValue} />
        <FieldInput variant="list" label="Choices" choices={choices} />
        <FieldInput
          variant="dropdown"
          label="Order"
          value={order}
          choices={["Ascending", "Descending"]}
        />

        {/* TODO: This empty div is for first grid column spacing. Add aria label*/}
        <div></div>
        <div className={styles.Actions}>
          <Button
            inline
            variant="primary"
            color="success"
            border="rounded"
            label="Save changes"
          />

          <Button inline variant="text" color="danger" label="Cancel" />
        </div>
      </div>
    </div>
  );
};

export default FieldBuilder;
