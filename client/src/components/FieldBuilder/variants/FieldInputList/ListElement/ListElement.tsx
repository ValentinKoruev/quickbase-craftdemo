import styles from "@components/FieldBuilder/variants/FieldInput.module.scss";
import { Icon } from "@components/UI";

interface IListElementProps {
  choice: string;
  index: number;
  maxLength: number;
  handleRemoveChoice: (index: number) => void;
}

const ListElement = ({
  choice,
  index,
  maxLength,
  handleRemoveChoice,
}: IListElementProps) => {
  return (
    <li key={`choice-${index}`}>
      {choice.trim().length > maxLength ? (
        <>
          <span className={styles.ChoiceLabel}>
            {choice.slice(0, maxLength)}
            <span className={styles.DangerLabel}>
              {choice.slice(maxLength, choice.length)}
            </span>
          </span>
        </>
      ) : (
        <span className={styles.ChoiceLabel}>{choice}</span>
      )}
      <button
        onClick={() => handleRemoveChoice(index)}
        type="button"
        className={styles.ChoiceRemoveButton}
      >
        <Icon name="x-mark" className={styles.ChoiceIcon} />
      </button>
    </li>
  );
};

export default ListElement;
