"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import cancelImage from "@/public/callback/cancel.webp";
import successlImage from "@/public/callback/check.webp";

const PaymentGatewayStatus = ({
  paymentFormData,
}: {
  paymentFormData: {
    identifier: string;
    status: string;
    form: string;
    authority: string;
    created_at: string;
    modified_at: string;
  };
}) => {
  const t = useTranslations("Payment");

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5 my-auto">
      {paymentFormData?.status === "request_success" ? (
        <>
          <span className="font-semibold">{t("successForm")}</span>
        </>
      ) : (
        <>
          <Image
            src={cancelImage}
            alt={"cancel image"}
            className="object-contain rounded-md w-24 h-24"
          />
          <span className="font-semibold">{t("failedForm")}</span>
          <button
            className="primary-btn px-5"
            onClick={() => window.location.reload()}
          >
            {t("reloadPaymentForm")}
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentGatewayStatus;
