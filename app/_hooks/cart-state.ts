import { type QueryClient, useQuery } from "@tanstack/react-query";
import { getCartData } from "../[locale]/(headerAndFooter)/shop/_api/productsApi";
import { getCookie } from "cookies-next";

export type CartItem = {
  identifier: string;
  cart: {
    identifier: string;
    discount_amount: string;
    gross_total: string;
    net_total: string;
  };
  product: {
    identifier: string;
    title: string;
    link_title: string;
    cover: string;
    unit: {
      identifier: string;
      title: string;
      plural_title: string;
    };
  };
  quantity: number;
  gross_price: string;
  net_price: string;
  discount: string;
  discount_amount: string;
  gross_total: string;
  net_total: string;
};
export type Cart = {
  identifier: string;
  discount_amount: string;
  gross_total: string;
  net_total: string;
  items_count: number;
  items: CartItem[];
};
let cartId = getCookie("cartId");

export const addToCart = ({
  queryClient,
  cartData,
  cartItem,
}: {
  queryClient: QueryClient;
  cartData: Cart | undefined;
  cartItem: CartItem;
}) => {
  const newCartItems = cartData?.items || [];
  newCartItems.push({ ...cartItem });
  cartId = cartItem?.cart?.identifier;

  queryClient.setQueryData(["getCartDataQuery"], {
    ...(cartData ? cartData : null),
    items: newCartItems,
    ...cartItem?.cart,
  });
};

export const updateCart = ({
  queryClient,
  cartData,
  cartItem,
}: {
  queryClient: QueryClient;
  cartData: Cart | undefined;
  cartItem: CartItem;
}) => {
  const newCartItems = cartData?.items || [];
  const foundIndex = newCartItems.findIndex(
    (cItem) => cItem?.identifier === cartItem?.identifier
  );
  if (foundIndex !== -1) newCartItems[foundIndex] = cartItem;

  queryClient.setQueryData(["getCartDataQuery"], {
    ...(cartData ? cartData : null),
    items: newCartItems,
    ...cartItem?.cart,
  });
};
export const removeFromCart = ({
  queryClient,
  cartData,
  cartItem,
}: {
  queryClient: QueryClient;
  cartData: Cart;
  cartItem: CartItem;
}) => {
  const newCartItems = cartData?.items?.filter(
    (prevCartItem: CartItem) =>
      prevCartItem?.product?.identifier !== cartItem?.product?.identifier
  );

  queryClient.setQueryData(["getCartDataQuery"], {
    ...(cartData ? cartData : null),
    items: newCartItems,
    discount_amount: +cartData?.discount_amount - +cartItem?.discount_amount,
    gross_total: +cartData?.gross_total - +cartItem?.gross_total,
    net_total: +cartData?.net_total - +cartItem?.net_total,
    items_count: +cartData?.items_count - 1,
  });
};

export const useCart = () => {
  const { data: cartData } = useQuery({
    queryKey: ["getCartDataQuery"],
    queryFn: () => getCartData(cartId),
    enabled: !!getCookie("token") || !!cartId,
    // initialData: {
    //   identifier: "",
    //   discount_amount: "",
    //   gross_total: "",
    //   net_total: "",
    //   items_count: 0,
    //   items: [],
    // },
  });

  return { cartData: cartData as Cart };
};
