import { getDataSsr } from "@/app/_api/FetchSSR";
import { ProductResponse } from "@/app/_constant/Product";
import React from "react";
import ProductsList from "./ProductsList";

const ProductListContainer = async ({
  page,
  search,
  catLink,
  cardShow,
}: {
  page: string;
  search: string | null;
  catLink: string | null;
  cardShow: string;
}) => {
  let queryArray = [];

  if (search) {
    queryArray.push(`search=${search}`);
  }
  if (catLink) {
    queryArray.push(`categories__link_title=${catLink}`);
  }
  if (page) {
    queryArray.push(`page=${page}`);
  }
  let queryArrayString = queryArray.join("&");
  const productsData: ProductResponse = await getDataSsr(
    `products/products/${queryArrayString ? `?${queryArrayString}` : ""}`
  );

  return <ProductsList productsData={productsData} cardShow={cardShow} />;
};

export default ProductListContainer;
