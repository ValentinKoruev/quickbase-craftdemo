import axios from "@queries/axios";
import type { FieldBuilderData } from "@customTypes/fieldBuilder.types";

const fieldQueries = {
  getField: async () => {
    return await axios.get<FieldBuilderData>("/field");
  },
  saveField: async (fieldData: FieldBuilderData) => {
    return await axios.post("/field", fieldData);
  },
};

export const fieldCacheTags = {
  FIELD: "Field",
};

export default fieldQueries;
