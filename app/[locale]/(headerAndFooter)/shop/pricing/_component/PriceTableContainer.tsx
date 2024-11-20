import { getDataSsr } from "@/app/_api/FetchSSR";
import PriceTable from "./PriceTable";

const PriceTableContainer = async ({
  category,
  search,
}: {
  category: string | undefined;
  search: string | undefined;
}) => {
  let queryArray = [];
  const page = "1";
  if (search) {
    queryArray.push(`search=${search}`);
  }
  if (category) {
    queryArray.push(`categories__link_title=${category}`);
  }
  queryArray.push(`page=${page}`);
  let queryArrayString = queryArray.join("&");

  // await queryClient.prefetchQuery({
  //   queryKey: ["getProductsDataQuery", search, category],
  //   queryFn: () =>
  //     getDataSsr(
  //       `products/products/${queryArrayString ? `?${queryArrayString}` : ""}`
  //     ),
  // });
  const iniProductData = await getDataSsr(
    `products/products/${queryArrayString ? `?${queryArrayString}` : ""}`
  );
  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <PriceTable iniProductData={iniProductData} />
    // </HydrationBoundary>
  );
};

export default PriceTableContainer;
