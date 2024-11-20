"use client";

import priceComma from "@/app/_utils/priceComma";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Link } from "@/i18n.config";
import { useTranslations } from "next-intl";
import emptyCart from "@/public/cart/empty-cart.png";
import { useCart } from "@/app/_hooks/cart-state";

const ChangeProductCount = dynamic(() =>
  import("../../shop/_component/products/ChangeProductCount").then(
    (module) => module.default
  )
);
const RemoveFromCart = dynamic(() =>
  import("./RemoveFromCart").then((module) => module.default)
);
const CartProductList = () => {
  const { cartData } = useCart();
  const t = useTranslations("Cart");

  if (cartData?.items?.length > 0)
    return (
      <div
        data-testid="cartListComp"
        className="w-full sm:w-[calc(75%-8px)] flex flex-col gap-3 sm:gap-4"
      >
        {cartData?.items?.map((cartItem, cartItemIdx: number) => (
          <div
            data-testid={cartItem?.identifier}
            className="relative p-3 sm:p-5 border border-[#e9ecef] rounded-2xl flex items-center gap-3 md:gap-4 lg:gap-6"
            key={`cartItemIdx${cartItemIdx}`}
          >
            <div className="relative flex-[0_0_calc(30%)] sm:flex-[0_0_calc(30%-20px)] aspect-square max-w-[200px]">
              <Image
                src={cartItem?.product?.cover}
                className="object-cover w-full h-full"
                width={0}
                height={0}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                alt={cartItem?.product?.title}
              />
            </div>
            <div className="flex flex-col gap-2 sm:gap-1 flex-1">
              <h5 className="text-base md:text-xl font-semibold">
                {cartItem?.product?.title}
              </h5>
              <div className="flex items-center gap-1">
                <span className="text-[14.4px] text-[#8492a6]">
                  {t("unitPrice")} :
                </span>
                <span className="font-semibold">
                  {priceComma(+cartItem?.gross_price)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[14.4px] text-[#8492a6]">
                  {t("quantity")} :
                </span>
                <ChangeProductCount
                  product={cartItem?.product as any}
                  cartItem={cartItem}
                  fromCart
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[14.4px] text-[#8492a6]">
                  {t("unit")} :
                </span>
                <span className="font-semibold">
                  {cartItem?.product?.unit?.title}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[14.4px] text-[#8492a6]">
                  {t("total")} :
                </span>
                <span className="font-semibold">
                  {priceComma(+cartItem?.net_total)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[14.4px] text-[#8492a6]">
                  {t("discount")} :
                </span>
                <span className="font-semibold">
                  {priceComma(+cartItem?.discount_amount)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[14.4px] text-[#8492a6]">
                  {t("finalTotal")} :
                </span>
                <span className="font-semibold text-secondary">
                  {priceComma(+cartItem?.gross_total)}
                </span>
              </div>
            </div>
            <RemoveFromCart cartItem={cartItem} />
          </div>
        ))}
      </div>
    );

  return (
    <div
      data-testid="emptyCartComp"
      className="flex-1 p-3 sm:p-5 border border-[#e9ecef] rounded-2xl flex flex-col gap-4 sm:min-h-[50vh]"
    >
      <div className="flex flex-col items-center gap-4 my-auto">
        <Image
          src={emptyCart}
          className="object-contain"
          width={180}
          height={180}
          alt={"empty cart image"}
        />
        <h5 className="font-semibold text-xl">{t("emptyCart")}</h5>
        <p className="text-[#7b7b7b] text-center">{t("useLinks")}</p>
        <Link href="/shop" className="primary-btn px-5 text-sm">
          {t("shop")}
        </Link>
      </div>
    </div>
  );
};

export default CartProductList;
