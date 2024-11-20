"use client";

import { Product, SingleProduct } from "@/app/_constant/Product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCartFunc } from "../../_api/productsApi";
import Loading from "@/app/_components/common/Loading";
import { getCookie, setCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { addToCart, CartItem, useCart } from "@/app/_hooks/cart-state";
import ChangeProductCount from "./ChangeProductCount";

const AddToCartBtn = ({
  product,
  className = "primary-btn shadow-inner !h-8 sm:!h-10 px-4 flex items-center gap-2 rounded-md sm:rounded-xl",
  btnText,
  bigger = false,
}: {
  product: Product | SingleProduct;
  btnText: any;
  className?: string;
  bigger?: boolean;
}) => {
  const queryClient = useQueryClient();
  const { cartData } = useCart();
  const t = useTranslations("Cart");
  const cartProductIdx = cartData?.items?.findIndex(
    (cartItem: CartItem) =>
      cartItem?.product?.identifier === product?.identifier
  );
  const { mutate, isPending } = useMutation({
    mutationKey: ["addToCartMutation"],
    mutationFn: addToCartFunc,
    onSuccess: (res: CartItem) => {
      const daysFromNow = new Date();
      daysFromNow.setDate(new Date().getDate() + 7);
      const token = getCookie("token");
      const cartId = getCookie("cartId");
      if (!token && !cartId) {
        setCookie("cartId", res?.cart?.identifier, {
          expires: daysFromNow,
        });
      }
      addToCart({
        queryClient,
        cartData: cartData,
        cartItem: res,
      });
      queryClient.invalidateQueries({ queryKey: ["getCartDataQuery"] });
    },
  });

  if (!product?.stock_status)
    return (
      <span
        data-testid="outOfStock"
        className="text-primary font-semibold text-sm"
      >
        {t("outOfStock")}
      </span>
    );
  else if (cartProductIdx === -1 || cartProductIdx === undefined)
    return (
      <button
        disabled={isPending}
        onClick={() =>
          mutate({
            product: product?.identifier,
            quantity: "1",
          })
        }
        className={className}
        data-testid="addToCartBtn"
      >
        {isPending ? <Loading /> : btnText}
      </button>
    );
  return (
    <ChangeProductCount
      product={product}
      cartItem={cartData?.items[cartProductIdx]}
      bigger
    />
  );
};

export default AddToCartBtn;
