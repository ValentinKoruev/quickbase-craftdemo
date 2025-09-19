import classNames from "classnames";
import styles from "../../FieldInput.module.scss";

interface IFieldInputDropdownProps {
  name: string;
  id: string;
  choices: string[];
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const FieldInputDropdown: React.FC<IFieldInputDropdownProps> = ({
  id,
  name,
  onChange,
  choices,
}) => {
  return (
    <select
      id={id}
      name={name}
      onChange={onChange}
      className={classNames(styles.FieldInput, styles.FieldSelect)}
    >
      {choices?.map((choice, index) => (
        <option key={`choice-${index}`} value={choice}>
          {choice}
        </option>
      ))}
    </select>
  );
};

export default FieldInputDropdown;
