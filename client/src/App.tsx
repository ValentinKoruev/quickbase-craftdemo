import FieldBuilder from "@components/FieldBuilder";

import styles from "./App.module.scss";

const testProps = {
  label: "Sales Region",
  type: "multi-select",
  defaultValue: "Asia",
  choices: [
    "Asia",
    "Australia",
    "Western Europe",
    "North America",
    "Eastern Europe",
    "Latin America",
    "Middle East and Africa",
  ],
  order: "asc",
};

function App() {
  return (
    <div className={styles.AppContainer}>
      <FieldBuilder {...testProps} />
    </div>
  );
}

export default App;
