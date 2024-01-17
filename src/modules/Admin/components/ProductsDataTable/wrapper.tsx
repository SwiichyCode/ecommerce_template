"use client";
import React, { useContext } from "react";
import { DataTable } from "./index";
import { productColumns } from "./columns";
import { productContext } from "@/modules/Admin/context/useProductContext";

export const ProductsDataTableWrapper = () => {
  const context = useContext(productContext);

  return (
    <DataTable
      columns={productColumns}
      data={context!.optimisticProduct}
      asRowLink
    />
  );
};
