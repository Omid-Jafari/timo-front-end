import {
  apiCallDeleteMethod,
  getFetchData,
  postFetchData,
} from "@/app/_api/ApiServise";
import { getCookie } from "cookies-next";

export const getProductsData = ({
  search,
  category,
  page,
}: {
  search: string | null;
  category?: string | string[] | null;
  page: string | null;
}) => {
  let queryArray = [];
  if (search) {
    queryArray.push(`search=${search}`);
  }
  if (category) {
    queryArray.push(`categories__link_title=${category}`);
  }
  if (page) {
    queryArray.push(`page=${page}`);
  }
  let queryArrayString = queryArray.join("&");
  return getFetchData(
    `products/products/${queryArrayString ? `?${queryArrayString}` : ""}`
  );
};
export const getCategoriesData = () => {
  return getFetchData("products/categories/");
};
export const getCategoryData = ({
  category,
}: {
  category: string | string[];
}) => {
  return getFetchData(`products/categories/${category}/`);
};
export const getRelatedProducts = (link_title: string) => {
  return getFetchData(`products/related-products/${link_title}/`);
};
export const getCartData = (cartId: string | undefined) => {
  return getFetchData("carts/cart/", cartId);
};
export const addToCartFunc = (body: { product: string; quantity: string }) => {
  const cartId = getCookie("cartId");

  return postFetchData(`carts/cart-item-add/`, body, "POST", false, cartId);
};
export const removeFromCartFunc = (productId: string) => {
  const cartId = getCookie("cartId");

  return apiCallDeleteMethod(`carts/item-delete/${productId}/`, cartId);
};
