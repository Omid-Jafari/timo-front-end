"use client";

import { SingleProduct } from "@/app/_constant/Product";
import priceComma from "@/app/_utils/priceComma";
import Image from "next/image";
import ShareButton from "./ShareButton";
import HeaderPhone from "@/app/_components/header/HeaderPhone";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const AddToCartBtn = dynamic(() =>
  import(
    "@/app/[locale]/(headerAndFooter)/shop/_component/products/AddToCartBtn"
  ).then((module) => module.default)
);

const ProductDetail = ({ productData }: { productData: SingleProduct }) => {
  const t = useTranslations("Product");

  return (
    <div className="flex flex-col gap-4 sm:gap-6 justify-center flex-1">
      <h4 className="text-xl font-semibold ">{productData?.title}</h4>
      <strong className="text-xl font-semibold">
        {priceComma(productData?.gross_price)}
      </strong>
      <div className="flex items-center gap-1 text-sm text-[#7b7b7b] font-semibold">
        <Image
          src="/common/infoIcon.svg"
          className="object-contain w-[20px] h-[20px]"
          width={20}
          height={20}
          alt="info icon"
          style={{
            filter:
              "invert(61%) sepia(31%) saturate(216%) hue-rotate(176deg) brightness(88%) contrast(86%)",
          }}
        />
        <span>
          {t("productPriceUnit", { unit_title: productData?.unit?.title })}
        </span>
      </div>
      {productData?.features?.length > 0 ? (
        <div className="flex flex-col gap-2">
          {productData?.features?.map((feature: any, featureIdx) => (
            <div
              key={`featureIdx${featureIdx}`}
              className="flex items-center gap-1"
            >
              <Image
                src="/common/checkIcon.svg"
                className="object-contain w-[18px] h-[18px]"
                width={18}
                height={18}
                alt="check icon"
                style={{
                  filter:
                    "invert(64%) sepia(55%) saturate(516%) hue-rotate(104deg) brightness(92%) contrast(91%)",
                }}
              />
              <strong className="text-sm font-semibold ">
                {feature?.title}
              </strong>
            </div>
          ))}
        </div>
      ) : null}
      <div className=" ltr:mr-auto rtl:ml-auto">
        <AddToCartBtn
          product={productData}
          className="px-4 primary-btn !h-10 self-center flex justify-center items-center gap-2 text-base font-medium shadow-inner"
          btnText={
            <>
              {t("addToCart")}
              <Image
                src="/common/cart-plus-svgrepo-com.svg"
                className="object-contain w-[22px] h-[22px]"
                width={22}
                height={22}
                alt="shopping cart"
                style={{
                  filter:
                    "invert(99%) sepia(2%) saturate(847%) hue-rotate(260deg) brightness(115%) contrast(100%)",
                }}
              />
            </>
          }
        />
      </div>
      <ShareButton />
      <hr className="border-[#e9ecef] border-2 rounded-full opacity-25" />
      <div className="flex items-center justify-between font-semibold">
        <div className="flex items-center gap-1">
          <Image
            src="/common/phoneIcon.svg"
            className="object-contain w-[20px] h-[20px]"
            width={20}
            height={20}
            alt="phone icon"
            style={{
              filter:
                "invert(0%) sepia(0%) saturate(4545%) hue-rotate(46deg) brightness(83%) contrast(92%)",
            }}
          />
          <span>{t("supportCustomers")}</span>
        </div>
        <HeaderPhone noIcon mobileHide={false} />
      </div>
    </div>
  );
};

export default ProductDetail;
