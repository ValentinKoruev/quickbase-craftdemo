import classNames from "classnames";
import type { FieldVariantDropdown } from "@customTypes/fieldBuilder.types";

import styles from "../../FieldInput.module.scss";

const FieldInputDropdown: React.FC<FieldVariantDropdown> = ({
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
