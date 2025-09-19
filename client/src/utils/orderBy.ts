const orderBy = (arr: string[], order: "asc" | "desc") => {
  if (order === "asc") {
    return arr.sort((a, b) => a.localeCompare(b));
  } else {
    return arr.sort((a, b) => b.localeCompare(a));
  }
};

export default orderBy;
