"use client";

import priceComma from "@/app/_utils/priceComma";
import { LogIn } from "lucide-react";
import { Link } from "@/i18n.config";
import { useTranslations } from "next-intl";
import { useCart } from "@/app/_hooks/cart-state";
import { useUser } from "@/app/_hooks/user-state";

const CartDetail = () => {
  const { cartData } = useCart();
  const { user } = useUser();
  const t = useTranslations("Cart");

  if (cartData?.items?.length > 0)
    return (
      <div className="w-full sm:w-[calc(25%-8px)] flex flex-col gap-4">
        <div className="p-3 sm:p-5 border border-[#e9ecef] rounded-2xl flex items-center justify-between">
          <span className="font-semibold ">{t("total")}</span>
          <span className="font-semibold ">
            {priceComma(+cartData?.gross_total)}
          </span>
        </div>
        <Link className="primary-btn px-5 mr-auto" href="/checkout/user-info">
          {t("proceedToCheckout")}
        </Link>
      </div>
    );
  else if (!user?.phone_number)
    return (
      <Link
        href="/login"
        className="w-full sm:w-[calc(25%-8px)] p-5 border border-[#e9ecef] rounded-2xl flex flex-col items-center gap-4"
      >
        <div className="flex items-center justify-between w-full">
          <span className="font-semibold">{t("loginToYourAccount")}</span>
          <LogIn className="rtl:rotate-180 " color="#e1810a" />
        </div>
        <small className="text-[#7b7b7b] text-justify text-sm leading-7">
          {t("seePreviousCart")}
        </small>
      </Link>
    );
};

export default CartDetail;
