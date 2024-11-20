import {
  apiCallDeleteMethod,
  getFetchData,
  postFetchData,
} from "@/app/_api/ApiServise";

export const changeUserInfoFunc = (body: {
  first_name: string;
  last_name: string;
  email: string;
}) => {
  return postFetchData(`accounts/user/`, body, "PATCH");
};
export const userAddressesFunc = () => {
  return getFetchData(`accounts/addresses/`);
};
export const deliveryMethodFunc = () => {
  return getFetchData(`shipping/delivery-methods/`);
};
export const addUserAddressFunc = (body: {
  title: string;
  country: string;
  country_area?: string;
  city: string;
  city_area?: string;
  street_address: string;
  postal_code?: string;
}) => {
  return postFetchData(`accounts/addresses/`, body);
};
export const updateUserAddressFunc = ({
  id,
  body,
}: {
  id: string;
  body: {
    title: string;
    country: string;
    country_area?: string;
    city: string;
    city_area?: string;
    street_address: string;
    postal_code?: string;
  };
}) => {
  return postFetchData(`accounts/addresses/${id}/`, body, "PUT");
};
export const deleteUserAddressFunc = (id: string) => {
  return apiCallDeleteMethod(`accounts/addresses/${id}/`);
};
export const addCeckoutFunc = (body: {
  delivery_method: string;
  shipping_address: string;
  billing_address: string;
}) => {
  return postFetchData(`orders/checkout/`, body);
};
export const contryOptionsFunc = () => {
  return postFetchData(`accounts/addresses/`, {}, "OPTIONS");
};
