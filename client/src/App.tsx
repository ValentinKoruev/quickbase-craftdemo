import { useQuery } from "@tanstack/react-query";

import apiQueries, { apiCacheTags } from "@queries/api";
import FieldBuilder from "@components/FieldBuilder";

import styles from "./App.module.scss";

function App() {
  const {
    data: fieldData,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: [apiCacheTags.field.FIELD],
    queryFn: async () => {
      const res = await apiQueries.fieldQueries.getField();
      return res.data;
    },
  });

  if (isLoading) {
    return <div className={styles.AppContainer}>Loading...</div>;
  }

  if (!isSuccess || !fieldData) {
    return <div className={styles.AppContainer}>Error loading field data.</div>;
  }

  return (
    <div className={styles.AppContainer}>
      <FieldBuilder {...fieldData} />
    </div>
  );
}

export default App;
