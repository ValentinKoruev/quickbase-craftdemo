import classNames from "classnames";
import type { FieldVariantDropdown } from "@customTypes/fieldBuilder.types";

import styles from "../../FieldInput.module.scss";

const FieldInputDropdown: React.FC<FieldVariantDropdown> = ({
  id,
  name,
  value,
  choices,
  format = (val) => val,
  onChange = () => {},
}) => {
  return (
    <select
      data-testid="field-input"
      id={id}
      name={name}
      value={value}
      onChange={(e) => onChange({ name, value: e.target.value })}
      className={classNames(styles.FieldInput, styles.FieldSelect)}
    >
      {choices?.map((choice, index) => (
        <option key={`choice-${index}`} value={choice}>
          {format(choice)}
        </option>
      ))}
    </select>
  );
};

export default FieldInputDropdown;
