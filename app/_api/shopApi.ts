import { getFetchData } from "@/app/_api/ApiServise";

export const getBrandsData = () => {
  return getFetchData(`pages/brands/`);
};
export const getCommentsData = () => {
  return getFetchData(`pages/customer-reviews/`);
};
