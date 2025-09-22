import type {
  FieldBuilderData,
  FieldValue,
} from "@customTypes/fieldBuilder.types";
import apiQueries from "@queries/api";

export const saveQuery = async (fieldData: Record<string, FieldValue>) => {
  //! This doesn't actually work, just for demo purposes
  console.log("Saving product data:", fieldData);
  return await apiQueries.fieldQueries.saveField(
    Object.entries(fieldData).reduce<FieldBuilderData>((acc, [key, value]) => {
      return { ...acc, [key]: value };
    }, {} as FieldBuilderData)
  );
};

export const beforeSaveFormat = (data: Record<string, FieldValue>) => {
  let formattedData = { ...data };

  if (formattedData.price && typeof formattedData.price === "string") {
    const numericPrice = formattedData.price.replace(/[$,]/g, "");
    formattedData.price = numericPrice;
  }

  return formattedData;
};

export const requiredFieldValidation = (value: FieldValue) => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return "This field is required.";
  }
  return null;
};

export const nameValidation = (value: FieldValue) => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return "Product name is required.";
  }

  if (typeof value === "string" && value.length > 100) {
    return "Product name cannot exceed 100 characters.";
  }

  return null;
};

export const skuValidation = (value: FieldValue) => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return "SKU is required.";
  }

  if (typeof value === "string") {
    // SKU format validation - alphanumeric with hyphens
    const skuRegex = /^[A-Za-z0-9-]+$/;
    if (!skuRegex.test(value)) {
      return "SKU can only contain letters, numbers, and hyphens.";
    }

    if (value.length < 4 || value.length > 20) {
      return "SKU must be between 4 and 20 characters.";
    }
  }

  return null;
};

export const priceValidation = (value: FieldValue) => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return "Price is required.";
  }

  if (typeof value === "string") {
    // Remove currency symbols and commas for validation
    const numericValue = value.replace(/[$,]/g, "");
    const price = parseFloat(numericValue);

    if (isNaN(price)) {
      return "Price must be a valid number.";
    }

    if (price < 0) {
      return "Price cannot be negative.";
    }

    if (price > 1000000) {
      return "Price cannot exceed $1,000,000.";
    }
  }

  return null;
};

export const stockValidation = (value: FieldValue) => {
  if (value === "" || value === undefined || value === null) {
    return null; // Stock is optional
  }

  if (typeof value === "string") {
    const stock = parseInt(value, 10);

    if (isNaN(stock)) {
      return "Stock must be a valid number.";
    }

    if (stock < 0) {
      return "Stock cannot be negative.";
    }

    if (stock > 1000000) {
      return "Stock cannot exceed 1,000,000 units.";
    }
  }

  return null;
};

export const categoriesValidation = (value: FieldValue) => {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return "At least one category is required.";
  }

  if (Array.isArray(value) && value.length > 5) {
    return "Maximum 5 categories allowed.";
  }

  return null;
};
