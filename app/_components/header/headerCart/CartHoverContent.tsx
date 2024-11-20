"use client";

import priceComma from "@/app/_utils/priceComma";
import Image from "next/image";
import { Link } from "@/i18n.config";
import dynamic from "next/dynamic";
import { memo } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "@/app/_hooks/cart-state";

const ChangeProductCount = dynamic(() =>
  import(
    "@/app/[locale]/(headerAndFooter)/shop/_component/products/ChangeProductCount"
  ).then((module) => module.default)
);

const CartHoverContent = ({ hasBtn = true }: { hasBtn?: boolean }) => {
  const { cartData } = useCart();
  const t = useTranslations("Cart");

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-[#62666d] text-sm font-semibold">
          {cartData?.items?.length} {t("product")}
        </span>
        {!hasBtn ? (
          <span className="font-semibold">
            {priceComma(+cartData?.gross_total)}
          </span>
        ) : null}
      </div>
      <div className="max-h-96 overflow-y-auto w-full flex flex-col gap-3">
        {cartData?.items?.map((cartItem, cartItemIdx: number) => (
          <div
            className="relative p-3 border border-[#e9ecef] rounded flex items-center gap-3"
            key={`cartItemIdx${cartItemIdx}`}
          >
            <div className="flex flex-col gap-2">
              <div className="relative aspect-square max-w-[200px] w-full">
                <Image
                  src={cartItem?.product?.cover}
                  className="object-contain w-full h-full rounded-md overflow-hidden"
                  width={0}
                  height={0}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  alt={cartItem?.product?.title}
                />
              </div>
              <ChangeProductCount
                product={cartItem?.product as any}
                cartItem={cartItem}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1 self-stretch">
              <h5 className="text-base font-semibold mb-auto">
                {cartItem?.product?.title}
              </h5>
              <div className="flex items-center gap-1">
                <span className="text-[14.4px] text-[#8492a6]">
                  {t("unitPrice")} :
                </span>
                <span className="text-[14.4px] font-semibold">
                  {priceComma(+cartItem?.gross_price)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[14.4px] text-[#8492a6] whitespace-nowrap">
                  {t("unit")} :
                </span>
                <span className="text-[14.4px] font-semibold">
                  {cartItem?.product?.unit?.title}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-auto">
                <span className="text-[14.4px] text-[#8492a6] whitespace-nowrap">
                  {t("total")} :
                </span>
                <span className="text-[14.4px] font-semibold text-primary">
                  {priceComma(+cartItem?.gross_total)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {hasBtn ? (
        <div className="flex items-center justify-between mt-1">
          <span className="font-semibold">
            {priceComma(+cartData?.gross_total)}
          </span>
          <Link className="primary-btn px-5" href="/checkout/user-info">
            {t("proceedToCheckout")}
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default memo(CartHoverContent);
