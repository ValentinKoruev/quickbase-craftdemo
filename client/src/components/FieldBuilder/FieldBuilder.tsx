import FieldInput from "@components/FieldBuilder/FieldInput";
import styles from "./FieldBuilder.module.scss";

const FieldBuilder = () => {
  return (
    <div className={styles.FieldBuilder}>
      <div className={styles.FieldBuilderHeader}>
        <h3 className={styles.FieldBuilderTitle}>Field Builder</h3>
      </div>
      <div className={styles.FieldBuilderFormContainer}>
        <FieldInput variant="text" label="Label" />
        <FieldInput
          variant="readonly-text"
          label="Type"
          placeholder="Multi-Select"
        />
        <FieldInput variant="text" label="Default Value" />
        <FieldInput variant="list" label="Choices" />
      </div>
    </div>
  );
};

export default FieldBuilder;
