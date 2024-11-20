"use client";

import Loading from "@/app/_components/common/Loading";
import { Product, SingleProduct } from "@/app/_constant/Product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { addToCartFunc, removeFromCartFunc } from "../../_api/productsApi";
import { useTranslations } from "next-intl";
import {
  CartItem,
  removeFromCart,
  updateCart,
  useCart,
} from "@/app/_hooks/cart-state";

const ChangeProductCount = ({
  product,
  cartItem,
  fromCart,
  bigger = false,
}: {
  product: Product | SingleProduct;
  cartItem: CartItem;
  fromCart?: boolean;
  bigger?: boolean;
}) => {
  const { cartData } = useCart();
  const t = useTranslations("Cart");
  const queryClient = useQueryClient();
  const [cartCount, setCartCount] = useState(cartItem?.quantity);
  const [hasChanged, setHasChanged] = useState(false);

  const { mutate: updateCartMutate, isPending } = useMutation({
    mutationKey: ["addToCartMutation"],
    mutationFn: addToCartFunc,
    onSuccess: (res: CartItem) => {
      setHasChanged(false);
      updateCart({
        queryClient,
        cartData: cartData,
        cartItem: res,
      });
      queryClient.invalidateQueries({ queryKey: ["getCartDataQuery"] });
    },
  });
  const { mutate: removeFromCartMutate, isPending: removePending } =
    useMutation({
      mutationKey: ["removeFromCartMutation"],
      mutationFn: removeFromCartFunc,
      onSuccess: () => {
        removeFromCart({ queryClient, cartItem, cartData });
        queryClient.invalidateQueries({ queryKey: ["getCartDataQuery"] });
      },
    });

  useEffect(() => {
    const delaySearchFn = setTimeout(() => {
      cartItem?.quantity !== cartCount &&
        hasChanged &&
        !removePending &&
        updateCartMutate({
          product: cartItem?.product?.identifier,
          quantity: cartCount.toString(),
        });
    }, 750);

    return () => clearTimeout(delaySearchFn);
  }, [
    cartCount,
    cartItem?.quantity,
    cartItem?.product?.identifier,
    hasChanged,
    removePending,
    updateCartMutate,
  ]);
  useEffect(() => {
    setCartCount(cartItem?.quantity);

    return () => {
      setCartCount(0);
    };
  }, [cartItem?.quantity]);

  return (
    <div
      data-testid="changeCountInput"
      className={`relative text-lg flex items-center justify-between !h-8 sm:!h-9 gap-5 p-2 border border-[#919eab3d] rounded-lg overflow-hidden ${
        bigger ? "min-w-[75%]" : null
      }`}
      dir="ltr"
    >
      {isPending || (!fromCart && removePending) ? (
        <div className="w-full flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30">
          <Loading bg="bg-white" />
        </div>
      ) : null}
      {1 >= cartCount ? (
        <button
          disabled={isPending || removePending || fromCart}
          onClick={() => removeFromCartMutate(cartItem?.identifier)}
        >
          {fromCart ? (
            <span className="text-xs text-[#8492a6] font-semibold">
              {t("minimum")}
            </span>
          ) : (
            <Trash2 size={18} className="text-red-500" />
          )}
        </button>
      ) : (
        <button
          // minus
          disabled={isPending || removePending}
          onClick={() => {
            setCartCount(cartCount - 1);
            setHasChanged(true);
          }}
        >
          <Minus size={16} />
        </button>
      )}
      <input
        disabled={isPending || removePending}
        className={`w-6 text-center font-medium`}
        type="number"
        value={cartCount}
        onChange={(e) => {
          setCartCount(+e.target?.value);
          setHasChanged(true);
        }}
        min={1}
      />
      <button
        // plus
        disabled={
          (product?.stock_amount &&
            cartCount >= Number(product?.stock_amount)) ||
          isPending ||
          removePending
        }
        onClick={() => {
          setCartCount(cartCount + 1);
          setHasChanged(true);
        }}
      >
        {product?.stock_amount && cartCount >= Number(product?.stock_amount) ? (
          <span className="text-xs text-[#8492a6] font-semibold">
            {t("maximum")}
          </span>
        ) : (
          <Plus size={16} />
        )}
      </button>
    </div>
  );
};

export default ChangeProductCount;
