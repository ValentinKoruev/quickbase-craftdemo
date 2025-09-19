import styles from "../../FieldInput.module.scss";

interface IFieldInputReadonlyProps {
  value: string;
}

const FieldInputReadonly: React.FC<IFieldInputReadonlyProps> = ({ value }) => {
  return <span className={styles.FieldReadOnly}>{value}</span>;
};

export default FieldInputReadonly;
