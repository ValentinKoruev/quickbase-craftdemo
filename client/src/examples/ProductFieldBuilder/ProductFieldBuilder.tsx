import React from "react";
import FieldBuilder from "@components/FieldBuilder/FieldBuilder";
import type { FieldValue } from "@customTypes/fieldBuilder.types";
import {
  createTextField,
  createDropdownField,
  createCheckboxField,
  createListField,
  createReadonlyField,
} from "@utils/fieldBuilderUtils";
import { saveQuery, beforeSaveFormat, priceValidation } from "./config";

interface ProductFieldBuilderProps {
  productId?: string;
  initialData?: {
    name?: string;
    description?: string;
    sku?: string;
    price?: string;
    stock?: string;
    categories?: string[];
    status?: string;
    featured?: boolean;
  };
  onSuccess?: () => void;
}

const ProductFieldBuilder: React.FC<ProductFieldBuilderProps> = ({
  productId,
  initialData = {},
  onSuccess,
}) => {
  const productIdField = productId
    ? createReadonlyField("Product ID", "productId", productId)
    : null;

  const nameField = createTextField(
    "Product Name",
    "name",
    initialData.name || "",
    {
      placeholder: "Enter product name",
      maxLength: 100,
    }
  );

  const descriptionField = createTextField(
    "Description",
    "description",
    initialData.description || "",
    {
      placeholder: "Enter product description",
      maxLength: 500,
    }
  );

  const skuField = createTextField("SKU", "sku", initialData.sku || "", {
    placeholder: "Enter product SKU code",
    maxLength: 20,
  });

  const priceField = createTextField(
    "Price",
    "price",
    initialData.price || "",
    {
      placeholder: "Enter product price",
    },
    priceValidation
  );

  const stockField = createTextField(
    "Stock",
    "stock",
    initialData.stock || "",
    {
      placeholder: "Enter available stock (optional)",
    }
  );

  const categoriesField = createListField(
    "Categories",
    "categories",
    initialData.categories || [],
    {
      maxLength: 30,
      sort: "asc",
    }
  );

  const statusField = createDropdownField(
    "Status",
    "status",
    initialData.status || "draft",
    ["draft", "published", "archived"],
    {
      format: (value) => {
        const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
        return capitalized;
      },
    }
  );

  const featuredField = createCheckboxField(
    "Featured Product",
    "featured",
    initialData.featured || false,
    {
      tooltip: "Display this product in featured sections.",
    }
  );

  const fields = [
    ...(productIdField ? [productIdField] : []),
    nameField,
    descriptionField,
    skuField,
    priceField,
    stockField,
    categoriesField,
    statusField,
    featuredField,
  ];

  const customSaveQuery = async (data: Record<string, FieldValue>) => {
    const result = await saveQuery(data);
    if (onSuccess) {
      onSuccess();
    }
    return result;
  };

  return (
    <FieldBuilder
      title={"Product Showcase"}
      fields={fields}
      saveQuery={customSaveQuery}
      beforeSaveFormat={beforeSaveFormat}
    />
  );
};

export default ProductFieldBuilder;
