"use client";

import { CheckCircle, Circle, CreditCard, RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import priceComma from "@/app/_utils/priceComma";
import { SingleOrderData } from "../../_constant/orders";
import Image from "next/image";
import { Link } from "@/i18n.config";
import { useUser } from "@/app/_hooks/user-state";

const SingleOrderDetail = ({
  singleOrderData,
}: {
  singleOrderData: SingleOrderData;
}) => {
  const { user } = useUser();
  const t = useTranslations("User");

  return (
    <div className={`flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {singleOrderData?.status === "paid" ? (
            <CheckCircle size={18} className="text-secondary" />
          ) : (
            <RefreshCcw size={18} className="text-primary" />
          )}
          <span className="font-bold">{singleOrderData?.humanized_status}</span>
        </div>
        {/* <div className="bg-gray-100 p-1 rounded-md font-bold text-sm">
          {new Date(singleOrderData?.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </div> */}
        <div className="flex items-center gap-1">
          <Image
            src={singleOrderData?.delivery_method?.icon}
            width={25}
            height={25}
            alt="delivery icon"
          />
          <span className="font-bold">
            {singleOrderData?.delivery_method?.title}
          </span>
        </div>
      </div>
      {singleOrderData?.status === "unpaid" ? (
        <Link
          className="text-primary text-sm flex items-center font-bold gap-1"
          href={`/checkout/payment-info?identifier=${singleOrderData?.identifier}`}
          target="_blank"
        >
          {t("pay")}
          <CreditCard size={18} />
        </Link>
      ) : null}
      <div className="flex items-center gap-2 text-[13px]">
        <div className="flex items-center gap-1">
          <span className="text-gray-400">{t("orderNumber")}</span>
          <span>{singleOrderData?.ref_id}</span>
        </div>
        <Circle size={8} className="text-gray-400" />
        <div className="flex items-center gap-1">
          <span className="text-gray-400">{t("createdAt")}</span>
          <span>
            {new Date(singleOrderData?.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
        </div>
      </div>
      <hr />
      <div className="flex items-center gap-2 text-[13px] flex-wrap">
        <div className="flex items-center gap-1">
          <span className="text-gray-400">{t("deliverTo")}</span>
          <span>{`${user?.first_name} ${user?.last_name}`}</span>
        </div>
        <Circle size={8} className="text-gray-400" />
        <div className="flex items-center gap-1">
          <span className="text-gray-400">{t("phoneNumber")}</span>
          <span dir="ltr">{user?.phone_number}</span>
        </div>
        <Circle size={8} className="text-gray-400" />
        <div className="flex items-center gap-1">
          <span className="text-gray-400">{t("shipAddress")}</span>
          <span>
            {singleOrderData?.shipping_address?.country?.name}{" "}
            {singleOrderData?.shipping_address?.country_area}{" "}
            {singleOrderData?.shipping_address?.city}{" "}
            {singleOrderData?.shipping_address?.city_area}{" "}
            {singleOrderData?.shipping_address?.street_address}
          </span>
        </div>
        <Circle size={8} className="text-gray-400" />
        <div className="flex items-center gap-1">
          <span className="text-gray-400">{t("billAddress")}</span>
          {singleOrderData?.billing_address?.country?.name}{" "}
          {singleOrderData?.billing_address?.country_area}{" "}
          {singleOrderData?.billing_address?.city}{" "}
          {singleOrderData?.billing_address?.city_area}{" "}
          {singleOrderData?.billing_address?.street_address}
        </div>
      </div>
      <hr />
      <div className="flex items-center gap-2 text-[13px] flex-wrap">
        <div className="flex items-center gap-1">
          <span className="text-gray-400">{t("total")}</span>
          <span>{priceComma(+singleOrderData?.gross_total)}</span>
        </div>
        <Circle size={8} className="text-gray-400" />
        <div className="flex items-center gap-1">
          <span className="text-gray-400">{t("deliveryCost")}</span>
          <span>{priceComma(+singleOrderData?.delivery_cost)}</span>
        </div>
        <Circle size={8} className="text-gray-400" />
        <div className="flex items-center gap-1">
          <span className="text-gray-400">{t("paymentMethod")}</span>
          <span>{singleOrderData?.humanized_payment_method}</span>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-2 gap-4">
        {singleOrderData?.items?.map((orderItem, orderItemIdx: number) => (
          <div
            className="col-span-2 md:col-span-1 relative p-3 border border-[#e9ecef] rounded flex items-center gap-3"
            key={`orderItemIdx${orderItem?.identifier}${orderItemIdx}`}
          >
            <div className="relative aspect-square max-w-[200px] w-full">
              <Image
                src={orderItem?.product?.cover}
                className="object-cover w-full h-full"
                width={0}
                height={0}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                alt={orderItem?.product?.title}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1 self-stretch">
              <h5 className="text-base font-semibold mb-auto">
                {orderItem?.product?.title}
              </h5>
              <div className="flex items-center gap-1">
                <span className="text-[14.4px] text-[#8492a6]">
                  {t("unitPrice")} :
                </span>
                <span className="text-[14.4px] font-semibold">
                  {priceComma(+orderItem?.gross_price)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[14.4px] text-[#8492a6] whitespace-nowrap">
                  {t("unit")} :
                </span>
                <span className="text-[14.4px] font-semibold">
                  {orderItem?.product?.unit?.title}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-auto">
                <span className="text-[14.4px] text-[#8492a6] whitespace-nowrap">
                  {t("total")} :
                </span>
                <span className="text-[14.4px] font-semibold text-primary">
                  {priceComma(+orderItem?.gross_total)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleOrderDetail;
