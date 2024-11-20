import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { getDataSsr, postDataSsr } from "../_api/FetchSSR";

const FetchDataProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const token = cookies()?.get("token")?.value;
  const cartId = cookies()?.get("cartId")?.value;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getShopQuery"],
    queryFn: () => getDataSsr(`settings/settings/`),
  });
  await queryClient.prefetchQuery({
    queryKey: ["getPhoneDataQuery"],
    queryFn: () => getDataSsr(`site-content/phone-numbers/`),
  });
  await queryClient.prefetchQuery({
    queryKey: ["getCategoriesDataQuery"],
    queryFn: () => getDataSsr(`products/categories/`),
  });
  if (token || cartId) {
    await queryClient.prefetchQuery({
      queryKey: ["getCartDataQuery"],
      queryFn: () => getDataSsr(`carts/cart/`, cartId),
    });
  }
  if (token) {
    await queryClient.prefetchQuery({
      queryKey: ["getUserDataQuery"],
      queryFn: () => getDataSsr(`accounts/user/`),
    });
  }
  if (token) {
    await queryClient.prefetchQuery({
      queryKey: ["countryOptionsDataQuery"],
      queryFn: () => postDataSsr(`accounts/addresses/`, {}, "OPTIONS"),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default FetchDataProvider;
